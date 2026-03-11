#!/usr/bin/env bash

# Add node_modules/.bin to PATH to ensure Build command is found
export PATH="$(dirname "$0")/../../node_modules/.bin:$PATH"

if [ -z "$Dependency" ]; then
	Dependency="Microsoft/VSCode"
fi

# shellcheck disable=SC2154
case "$Dependency" in
"Microsoft/VSCode")
	BuildDir="out-build"
	;;

"CodeEditorLand/Editor")
	BuildDir="Source"
	;;

*)
	exit 1
	;;

esac

if [[ "$Dependency" = "Microsoft/VSCode" && "$NODE_ENV" = "development" ]]; then
    BuildDir="out"
fi

# Always use standard VSCode build output (esbuild/tsc compiled)
# Rest compiler is disabled due to OXC segmentation fault issues
VSCodeSourceDir="../../Dependency/Microsoft/Dependency/Editor/$BuildDir"
if [[ -d "$VSCodeSourceDir" ]]; then
    echo "[prepublishOnly] Using standard VSCode build output from: $VSCodeSourceDir"
else
    echo "[prepublishOnly] ERROR: VSCode build output not found at: $VSCodeSourceDir"
    echo "[prepublishOnly] Please build VSCode first: cd Dependency/Microsoft/Dependency/Editor && npm run compile"
    exit 1
fi

# Build Output package TypeScript sources
Build "Source/**/*.{ts,json}" \
	--ESBuild Source/ESBuild/Output.ts

# Copy VSCode artifacts (from Rest output or standard build)
Build "$VSCodeSourceDir/**/*.{css,fish,html,js,json,jsx,cjs,mjs,md,mp3,png,ps1,psm1,scm,scpt,sh,svg,ts,tsx,ttf,zsh}" \
	--ESBuild Configuration/ESBuild/"$Dependency".js
