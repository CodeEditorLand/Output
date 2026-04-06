#!/usr/bin/env sh

if [ -z "$Dependency" ]; then
	Dependency="Microsoft/VSCode"
fi

# shellcheck disable=SC2154
case "$Dependency" in
	"Microsoft/VSCode")
		VSCodeSourceDir="../../../Dependency/Microsoft/Dependency/Editor/src"
		;;

	"CodeEditorLand/Editor")
		VSCodeSourceDir="../../Dependency/CodeEditorLand/Editor/Source"
		;;

	*)
		exit 1
		;;
esac

if [ "$Dependency" = "Microsoft/VSCode" ] && [ "$NODE_ENV" = "development" ]; then
	Build="out"
fi

Build "Source/**/*.{ts,tsx,js,json,css}" \
	--ESBuild Source/ESBuild/Output.ts

Build "$VSCodeSourceDir/**/*.{ts,tsx,js,json,css}" \
	--ESBuild Configuration/ESBuild/"$Dependency".js
