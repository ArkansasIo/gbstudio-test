// Copyright (c) OGame MMORPG Project. All Rights Reserved.

using UnrealBuildTool;

public class OGameMMORPG : ModuleRules
{
    public OGameMMORPG(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;

        PublicDependencyModuleNames.AddRange(new string[]
        {
            "Core",
            "CoreUObject",
            "Engine",
            "InputCore",
            "EnhancedInput",
            "OnlineSubsystem",
            "OnlineSubsystemUtils",
            "Networking",
            "Sockets",
            "HTTP",
            "Json",
            "JsonUtilities",
            "WebSockets",
            "GameplayAbilities",
            "GameplayTags",
            "GameplayTasks",
            "UMG",
            "Slate",
            "SlateCore",
        });

        PrivateDependencyModuleNames.AddRange(new string[]
        {
            "RenderCore",
            "RHI",
        });

        // Enable RTTI for online features
        bEnableExceptions = true;

        // Server-side modules only
        if (Target.Type == TargetType.Server || Target.Type == TargetType.Game)
        {
            PublicDependencyModuleNames.Add("OnlineSubsystem");
        }
    }
}
