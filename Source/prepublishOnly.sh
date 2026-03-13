#!/usr/bin/env bash

# Add node_modules/.bin to PATH to ensure Build command is found
export PATH="$(dirname "$0")/../../node_modules/.bin:$PATH"

if [ -z "$Dependency" ]; then
	Dependency="Microsoft/VSCode"
fi

# shellcheck disable=SC2154
case "$Dependency" in
"Microsoft/VSCode")
	# Compile directly from VSCode source using Rest compiler
	# This avoids test package.json conflicts from prebuilt out/
	VSCodeSourceDir="../../Dependency/Microsoft/Dependency/Editor/src"
	;;

"CodeEditorLand/Editor")
	VSCodeSourceDir="../../Dependency/CodeEditorLand/Editor/Source"
	;;

*)
	exit 1
	;;

esac

# Verify source directory exists
if [[ ! -d "$VSCodeSourceDir" ]]; then
    echo "[prepublishOnly] ERROR: VSCode source directory not found at: $VSCodeSourceDir"
    exit 1
fi

echo "[prepublishOnly] Compiling VSCode from source using Rest: $VSCodeSourceDir"

# Build Output package TypeScript sources
Build "Source/**/*.{ts,json}" \
	--ESBuild Source/ESBuild/Output.ts

# Compile VSCode TypeScript sources directly from src/ using Rest compiler
# Set Compiler=Rest to enable Rest compiler integration
# Set NODE_ENV=development to avoid console stripping and preserve sourcemaps
export Compiler="Rest"
export NODE_ENV="development"

# Build the entire VSCode source tree
Build "$VSCodeSourceDir/**/*.{ts,tsx,js,json}" \
	--ESBuild Configuration/ESBuild/"$Dependency".js \
	--outdir "Target/Microsoft/VSCode/vs" \
	--outbase "$VSCodeSourceDir/vs"

echo "[prepublishOnly] ✓ VSCode compilation complete"
