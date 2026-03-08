// Copyright (c) OGame MMORPG Project. All Rights Reserved.

using UnrealBuildTool;
using System.Collections.Generic;

[SupportedPlatforms(UnrealPlatformClass.Server)]
public class OGameMMORPGServerTarget : TargetRules
{
    public OGameMMORPGServerTarget(TargetInfo Target) : base(Target)
    {
        Type                        = TargetType.Server;
        DefaultBuildSettings        = BuildSettingsVersion.V4;
        IncludeOrderVersion         = EngineIncludeOrderVersion.Unreal5_3;
        ExtraModuleNames.Add("OGameMMORPG");

        // Server-specific settings
        bUseLoggingInShipping       = true;
        bWithServerCode             = true;
        GlobalDefinitions.Add("UE_SERVER=1");
    }
}
