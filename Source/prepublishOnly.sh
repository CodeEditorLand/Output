#!/usr/bin/env bash

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

if [[ "$Dependency" = "Microsoft/VSCode" && "$NODE_ENV" = "development" ]]; then
	Build="out"
fi

Build "Source/**/*.{ts,json}" \
	--ESBuild Source/ESBuild/Output.ts

Build "../../Dependency/Microsoft/Dependency/Editor/$Build/**/*.{css,fish,html,js,json,jsx,cjs,mjs,md,mp3,png,ps1,psm1,scm,scpt,sh,svg,ts,tsx,ttf,zsh}" \
	--ESBuild Configuration/ESBuild/"$Dependency".js
