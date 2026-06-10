#!/usr/bin/env sh

if [ -z "$Dependency" ]; then
	Dependency="Microsoft/VSCode"
fi

# shellcheck disable=SC2154
case "$Dependency" in
	"Microsoft/VSCode")
		# Always use `out/` (dev tsc) as the input tree, NOT `out-build/`
		# (gulp release tree).
		#
		# `out-build/` carries the upstream-mangled bytes (`$Hp`, `$ZXb`,
		# `$4e`, ...) but is missing every gulp-only artefact: the
		# workbench bundler entries (`workbench.web.main.js`,
		# `workbench.web.main.internal.js`, `workbench.desktop.main.js`)
		# never reach `out-build/` because gulp emits them through a
		# separate AMD-optimiser step Output does not run. Mixing the
		# two trees produces an incoherent shipped artefact: Output's
		# release `Target/Microsoft/VSCode/vs/code/electron-browser/
		# workbench/workbench.js` is mangled, but the supplement-copied
		# siblings from `out/` are unmangled, and every cross-tree
		# `import { $Hp } from './telemetry.js'` blows up at runtime
		# because the unmangled file does not export `$Hp`.
		#
		# `out/` is unmangled but COMPLETE - every file VS Code's source
		# tree references is present. Output's transforms operate on
		# readable identifiers; consumers (Sky's Static/Application copy
		# AND Sky's bundled Vite walk) see a single self-consistent
		# universe of bytes; Vite/Rollup re-mangles for the bundled
		# profile, browsers gzip the unbundled profile. The shipped
		# artefact is a few hundred KB larger but works in every profile
		# without the mangling-truth class of patches the previous
		# `out-build/` path required.
		Build="out"
		;;

	"CodeEditorLand/Editor")
		Build="Source"
		;;

	*)
		exit 1
		;;
esac

Build "Source/**/*.{ts,json}" \
	--ESBuild Source/ESBuild/Output.ts

Build "../../Dependency/Microsoft/Dependency/Editor/$Build/**/*.{css,fish,html,js,json,jsx,cjs,mjs,md,mp3,png,ps1,psm1,scm,scpt,sh,svg,ts,tsx,ttf,zsh}" \
	--ESBuild Configuration/ESBuild/"$Dependency".js

# Apply transform plugins to Output's own Target so every consumer
# (Sky's /Static/Application copy AND Sky's bundled Vite walk) sees
# pre-shimmed VS Code files. Compiled `Configuration/Apply/Pipeline.js`
# is emitted by the first Build step above (Source/**/*.ts pass).
node Configuration/Apply/Pipeline.js
