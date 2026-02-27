import React, { useCallback, useEffect, useRef, useState } from "react";
import GlobalError from "components/error/GlobalError";
import AppToolbar from "./AppToolbar";
import BackgroundsPage from "components/pages/BackgroundsPage";
import SpritesPage from "components/pages/SpritesPage";
import DialoguePage from "components/pages/DialoguePage";
import WorldPage from "components/pages/WorldPage";
import MusicPage from "components/pages/MusicPage";
import PalettePage from "components/pages/PalettePage";
import SettingsPage from "components/pages/SettingsPage";
import RPGGameMakerUI from "components/RPGGameMakerUI";
import { DropZone } from "ui/upload/DropZone";
import projectActions from "store/features/project/projectActions";
import SoundsPage from "components/pages/SoundsPage";
import LoadingPane from "ui/loading/LoadingPane";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "store/hooks";
import AIChatBox from "components/ai/AIChatBox";

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 12% 10%,
      rgba(45, 160, 152, 0.16) 0%,
      rgba(45, 160, 152, 0) 32%
    ),
    radial-gradient(
      circle at 88% 0%,
      rgba(210, 137, 58, 0.14) 0%,
      rgba(210, 137, 58, 0) 28%
    ),
    linear-gradient(180deg, rgba(18, 25, 34, 0.95) 0%, rgba(10, 14, 20, 0.98) 100%);

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    border: 1px solid rgba(171, 192, 210, 0.17);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      inset 0 -1px 0 rgba(0, 0, 0, 0.32);
    z-index: 1;
  }

  &:after {
    content: "";
    position: absolute;
    inset: 38px 0 0;
    pointer-events: none;
    background: repeating-linear-gradient(
      -30deg,
      rgba(255, 255, 255, 0.012) 0,
      rgba(255, 255, 255, 0.012) 1px,
      transparent 1px,
      transparent 28px
    );
    z-index: 1;
  }
`;

const AppContent = styled.div`
  width: 100%;
  height: calc(100% - 38px);
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 2;
  background: ${(props) => props.theme.colors.document.background};
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
`;

const App = () => {
  const dispatch = useAppDispatch();
  const [draggingOver, setDraggingOver] = useState(false);
  const dragLeaveTimer = useRef<ReturnType<typeof setTimeout>>();
  const section = useAppSelector((state) => state.navigation.section);
  const error = useAppSelector((state) => state.error);
  const loaded = useAppSelector((state) => state.document.loaded);

  const onDragOver = useCallback(
    (e: DragEvent) => {
      // Don't activate dropzone unless dragging a file
      const types = e.dataTransfer?.types;
      if (!types || types.indexOf("Files") === -1) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      if (dragLeaveTimer.current) {
        clearTimeout(dragLeaveTimer.current);
      }
      if (!draggingOver) {
        setDraggingOver(true);
      }
    },
    [draggingOver],
  );

  const onDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragLeaveTimer.current) {
      clearTimeout(dragLeaveTimer.current);
    }
    dragLeaveTimer.current = setTimeout(() => {
      setDraggingOver(false);
    }, 100);
  }, []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      setDraggingOver(false);
      if (!e.dataTransfer?.files) {
        return;
      }
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        const file = e.dataTransfer.files[i];
        dispatch(projectActions.addFileToProject(file.path));
      }
    },
    [dispatch],
  );

  useEffect(() => {
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, [onDragLeave, onDragOver, onDrop]);

  if (error.visible) {
    return <GlobalError />;
  }

  return (
    <AppWrapper>
      <AppToolbar />
      {!loaded ? (
        <LoadingPane />
      ) : (
        <AppContent>
          {section === "world" && <WorldPage />}
          {section === "backgrounds" && <BackgroundsPage />}
          {section === "sprites" && <SpritesPage />}
          {section === "music" && <MusicPage />}
          {section === "sounds" && <SoundsPage />}
          {section === "palettes" && <PalettePage />}
          {section === "dialogue" && <DialoguePage />}
          {section === "settings" && <SettingsPage />}
          {section === "rpg5e" && <RPGGameMakerUI />}
          {draggingOver && <DropZone />}
          <AIChatBox />
        </AppContent>
      )}
    </AppWrapper>
  );
};

export default App;
