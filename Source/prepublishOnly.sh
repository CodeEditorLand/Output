#!/usr/bin/env sh

if [ -z "$Dependency" ]; then
	Dependency="Microsoft/VSCode"
fi

# shellcheck disable=SC2154
case "$Dependency" in
"Microsoft/VSCode")
	Build="out-build"
	;;

"CodeEditorLand/Editor")
	Build="Source"
	;;

*)
	exit 1
	;;
esac

# Debug profiles pull from VS Code's `out/` (unminified, unmangled) so
# the Output transform pipeline operates on readable identifiers
# instead of the property-mangled `out-build/` (`$ZXb`, `$Q9b`, `$4e`,
# ...) which forced the entire mangling-truth class of fixes
# (RewriteStaticBlockSelfRef, RewriteNestedWorkerBootstrap,
# RewritePerfBaselineWorker, ...). Release profiles keep `out-build/`
# so shipped builds carry the upstream-minified bytes.
#
# Gate is `Debug=true` (Land-introduced PascalCase flag set by every
# debug profile in `Maintain/Debug/Build.sh`) NOT `NODE_ENV` - the
# repo's `.env` historically pinned `NODE_ENV=production` and was
# loaded by Tauri's CLI AFTER Build.sh's `export NODE_ENV=development`,
# silently overriding the gate and forcing `out-build` even for debug
# profiles. `.env` is deleted; build-mode flags now flow only via
# profile exports + `Element/Maintain`.
if [ "$Dependency" = "Microsoft/VSCode" ] && [ "$Debug" = "true" ]; then
	Build="out"
fi

Build "Source/**/*.{ts,json}" \
	--ESBuild Source/ESBuild/Output.ts

Build "../../Dependency/Microsoft/Dependency/Editor/$Build/**/*.{css,fish,html,js,json,jsx,cjs,mjs,md,mp3,png,ps1,psm1,scm,scpt,sh,svg,ts,tsx,ttf,zsh}" \
	--ESBuild Configuration/ESBuild/"$Dependency".js

# Apply transform plugins to Output's own Target so every consumer
# (Sky's /Static/Application copy AND Sky's bundled Vite walk) sees
# pre-shimmed VS Code files. Compiled `Configuration/ApplyPipeline.js`
# is emitted by the first Build step above (Source/**/*.ts pass).
node Configuration/ApplyPipeline.js
