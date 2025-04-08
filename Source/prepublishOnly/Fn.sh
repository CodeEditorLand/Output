#!/usr/bin/env bash

if [ -z "$Dependency" ]; then
	Dependency="CodeEditorLand/Editor"
fi

# shellcheck disable=SC2154
case "$Dependency" in
"Microsoft/VSCode")
	Build="src"
	;;
"CodeEditorLand/Editor")
	Build="Source"
	;;
*)
	exit 1
	;;
esac

Build "Source/**/*.{ts,json,sh}" --ESBuild Source/ESBuild/Output.ts

Build "../../Dependency/Microsoft/Dependency/Editor/$Build/**/*.{css,map,fish,html,js,json,jsx,cjs,mjs,md,mp3,png,ps1,psm1,scm,scpt,sh,svg,ts,tsx,ttf,zsh}" \
	--ESBuild Target/ESBuild/"$Dependency".js
