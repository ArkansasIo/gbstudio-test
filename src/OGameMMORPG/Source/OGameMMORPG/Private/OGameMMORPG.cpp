// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "OGameMMORPG.h"
#include "Modules/ModuleManager.h"

IMPLEMENT_PRIMARY_GAME_MODULE(FOGameMMORPGModule, OGameMMORPG, "OGameMMORPG");

void FOGameMMORPGModule::StartupModule()
{
    UE_LOG(LogTemp, Log, TEXT("OGameMMORPG module started."));
}

void FOGameMMORPGModule::ShutdownModule()
{
    UE_LOG(LogTemp, Log, TEXT("OGameMMORPG module shut down."));
}
