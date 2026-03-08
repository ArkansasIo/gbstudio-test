// Copyright (c) OGame MMORPG Project. All Rights Reserved.

#include "Core/OGamePlayerState.h"
#include "Net/UnrealNetwork.h"

AOGamePlayerState::AOGamePlayerState()
{
    // Initialize all research levels to 0
    for (uint8 i = 0; i < static_cast<uint8>(EResearchType::GravitonTechnology); ++i)
    {
        ResearchLevels.Add(static_cast<EResearchType>(i), 0);
    }
}

int32 AOGamePlayerState::GetResearchLevel(EResearchType Type) const
{
    const int32* Level = ResearchLevels.Find(Type);
    return Level ? *Level : 0;
}

void AOGamePlayerState::SetResearchLevel(EResearchType Type, int32 Level)
{
    ResearchLevels.Add(Type, FMath::Max(0, Level));
}

bool AOGamePlayerState::StartResearch(EResearchType Type, FResources Cost, FTimespan Duration)
{
    if (bResearchInProgress)
    {
        return false;
    }

    bResearchInProgress = true;
    CurrentResearch     = Type;
    ResearchFinishTime  = FDateTime::UtcNow() + Duration;

    UE_LOG(LogTemp, Log, TEXT("Player %s started researching %d, finishes at %s"),
           *PlayerDisplayName,
           static_cast<int32>(Type),
           *ResearchFinishTime.ToString());
    return true;
}

bool AOGamePlayerState::IsResearchComplete() const
{
    return bResearchInProgress && FDateTime::UtcNow() >= ResearchFinishTime;
}

void AOGamePlayerState::CompleteResearch()
{
    if (!bResearchInProgress)
    {
        return;
    }

    int32 CurrentLevel = GetResearchLevel(CurrentResearch);
    SetResearchLevel(CurrentResearch, CurrentLevel + 1);
    bResearchInProgress = false;

    OnResearchCompleted.Broadcast(CurrentResearch);

    UE_LOG(LogTemp, Log, TEXT("Player %s completed research %d -> level %d"),
           *PlayerDisplayName,
           static_cast<int32>(CurrentResearch),
           CurrentLevel + 1);
}

void AOGamePlayerState::ReceiveMessage(const FGameMessage& Message)
{
    Inbox.Add(Message);
    OnMessageReceived.Broadcast(Message);
}

void AOGamePlayerState::MarkMessageRead(const FString& MessageId)
{
    for (FGameMessage& Msg : Inbox)
    {
        if (Msg.MessageId == MessageId)
        {
            Msg.bIsRead = true;
            break;
        }
    }
}

void AOGamePlayerState::AddPoints(int64 Building, int64 Research, int64 Fleet, int64 Defense)
{
    Score.BuildingPoints  += Building;
    Score.ResearchPoints  += Research;
    Score.FleetPoints     += Fleet;
    Score.DefensePoints   += Defense;
    Score.TotalPoints      = Score.BuildingPoints + Score.ResearchPoints +
                             Score.FleetPoints + Score.DefensePoints;
}

void AOGamePlayerState::GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const
{
    Super::GetLifetimeReplicatedProps(OutLifetimeProps);

    DOREPLIFETIME(AOGamePlayerState, PlayerUniqueId);
    DOREPLIFETIME(AOGamePlayerState, PlayerDisplayName);
    DOREPLIFETIME(AOGamePlayerState, Status);
    DOREPLIFETIME(AOGamePlayerState, RegisterDate);
    DOREPLIFETIME(AOGamePlayerState, AllianceId);
    DOREPLIFETIME(AOGamePlayerState, AllianceRole);
    DOREPLIFETIME(AOGamePlayerState, ResearchLevels);
    DOREPLIFETIME(AOGamePlayerState, bResearchInProgress);
    DOREPLIFETIME(AOGamePlayerState, CurrentResearch);
    DOREPLIFETIME(AOGamePlayerState, ResearchFinishTime);
    DOREPLIFETIME(AOGamePlayerState, Score);
    DOREPLIFETIME(AOGamePlayerState, OwnedPlanetIds);
    DOREPLIFETIME(AOGamePlayerState, HomePlanetId);
    DOREPLIFETIME(AOGamePlayerState, DarkMatter);
}
