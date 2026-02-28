import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import WorldView from "components/world/WorldView";
import ToolPicker from "components/world/ToolPicker";
import BrushToolbar from "components/world/BrushToolbar";
import EditorSidebar from "components/editors/EditorSidebar";
import WorldStatusBar from "components/world/WorldStatusBar";
import useResizable from "ui/hooks/use-resizable";
import useWindowSize from "ui/hooks/use-window-size";
import {
  SplitPaneHorizontalDivider,
  SplitPaneVerticalDivider,
} from "ui/splitpane/SplitPaneDivider";
import { Navigator } from "components/world/Navigator";
import editorActions from "store/features/editor/editorActions";
import settingsActions from "store/features/settings/settingsActions";
import debounce from "lodash/debounce";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { SplitPaneHeader } from "ui/splitpane/SplitPaneHeader";
import l10n from "shared/lib/lang/l10n";
import DebuggerPanes from "components/debugger/DebuggerPanes";
import DebuggerControls from "components/debugger/DebuggerControls";
import { NAVIGATOR_MIN_WIDTH } from "consts";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const NavigatorPane = styled.div<{ $width: number; $faded: boolean }>`
  width: ${(props) => props.$width}px;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  position: relative;
  opacity: ${(props) => (props.$faded ? 0.24 : 1)};
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.018) 0%, rgba(0, 0, 0, 0.08) 100%),
    ${(props) => props.theme.colors.sidebar.background};
  border-right: 1px solid rgba(176, 198, 217, 0.16);
  transition: opacity 0.24s ease;
`;

const NavigatorPaneInner = styled.div`
  min-width: ${NAVIGATOR_MIN_WIDTH}px;
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.02);
`;

const EditorMainPane = styled.div<{ $height: number }>`
  flex-grow: 1;
  min-width: 0;
  flex-shrink: 0;
  overflow: hidden;
  color: ${(props) => props.theme.colors.text};
  height: ${(props) => props.$height}px;
  position: relative;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(circle at 20% 0%, rgba(62, 168, 158, 0.09) 0%, transparent 34%),
    radial-gradient(circle at 100% 100%, rgba(222, 151, 76, 0.08) 0%, transparent 36%),
    ${(props) => props.theme.colors.background};
`;

const EditorViewport = styled.div`
  overflow: hidden;
  flex-grow: 1;
  position: relative;
  border-bottom: 1px solid rgba(168, 190, 208, 0.16);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.03),
    inset 0 -20px 40px rgba(0, 0, 0, 0.1);
`;

const DebuggerPane = styled.div<{ $height: number; $maxWidth: number }>`
  position: relative;
  height: ${(props) => props.$height}px;
  max-width: ${(props) => props.$maxWidth}px;
  background:
    linear-gradient(180deg, rgba(10, 16, 23, 0.74) 0%, rgba(11, 17, 24, 0.9) 100%),
    ${(props) => props.theme.colors.sidebar.background};
`;

const DebuggerBody = styled.div<{ $height: number }>`
  height: ${(props) => props.$height - 30}px;
`;

const InspectorPane = styled.div<{ $width: number }>`
  width: ${(props) => props.$width}px;
  min-width: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.018) 0%, rgba(0, 0, 0, 0.1) 100%),
    ${(props) => props.theme.colors.sidebar.background};
  height: 100%;
  overflow: hidden;
  position: relative;
  border-left: 1px solid rgba(176, 198, 217, 0.16);
  box-shadow: inset 1px 0 0 rgba(255, 255, 255, 0.02);
`;

const WorldPage = () => {
  const documentContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const worldSidebarWidth = useAppSelector(
    (state) => state.editor.worldSidebarWidth,
  );
  const navigatorSidebarWidth = useAppSelector(
    (state) => state.editor.navigatorSidebarWidth,
  );
  const windowSize = useWindowSize();
  const prevWindowWidthRef = useRef<number>(0);
  const windowWidth = windowSize.width || 0;
  const windowHeight = windowSize.height || 0;
  const minCenterPaneWidth = 0;
  const showNavigator = useAppSelector(
    (state) => state.project.present.settings.showNavigator,
  );
  const debuggerEnabled = useAppSelector(
    (state) => state.project.present.settings.debuggerEnabled,
  );

  const [leftPaneWidth, setLeftPaneSize, startLeftPaneResize] = useResizable({
    initialSize: navigatorSidebarWidth,
    direction: "right",
    minSize: 50,
    maxSize: Math.max(
      101,
      windowWidth - minCenterPaneWidth - NAVIGATOR_MIN_WIDTH,
    ),
    onResize: (_v) => {
      recalculateRightColumn();
    },
    onResizeComplete: (v) => {
      if (v < 100) {
        hideNavigator();
      }
      if (v < NAVIGATOR_MIN_WIDTH) {
        setLeftPaneSize(NAVIGATOR_MIN_WIDTH);
      }
      recalculateRightColumn();
    },
  });
  const [rightPaneWidth, setRightPaneSize, onResizeRight] = useResizable({
    initialSize: worldSidebarWidth,
    direction: "left",
    minSize: 280,
    maxSize: Math.max(281, windowWidth - minCenterPaneWidth - 100),
    onResize: (_v) => {
      recalculateLeftColumn();
    },
    onResizeComplete: (width) => {
      if (width > windowWidth - NAVIGATOR_MIN_WIDTH) {
        setLeftPaneSize(NAVIGATOR_MIN_WIDTH);
        setRightPaneSize(windowWidth - NAVIGATOR_MIN_WIDTH);
      } else {
        recalculateLeftColumn();
      }
    },
  });
  const centerWidth =
    windowWidth - (showNavigator ? leftPaneWidth : 0) - rightPaneWidth;
  const [debuggerPaneHeight, setDebuggerPaneSize, onResizeDebugger] =
    useResizable({
      initialSize: debuggerEnabled ? 400 : 30,
      direction: "top",
      minSize: 30,
      maxSize: windowHeight - 100,
      onResizeComplete: (height) => {
        if (height === 30 && debuggerEnabled) {
          dispatch(
            settingsActions.editSettings({
              debuggerEnabled: false,
            }),
          );
        } else if (height > 30 && !debuggerEnabled) {
          dispatch(
            settingsActions.editSettings({
              debuggerEnabled: true,
            }),
          );
        }
      },
    });

  const toggleDebuggerPane = useCallback(() => {
    if (debuggerPaneHeight === 30) {
      setDebuggerPaneSize(windowHeight * 0.5);
      dispatch(
        settingsActions.editSettings({
          debuggerEnabled: true,
        }),
      );
    } else {
      setDebuggerPaneSize(30);
      dispatch(
        settingsActions.editSettings({
          debuggerEnabled: false,
        }),
      );
    }
  }, [debuggerPaneHeight, dispatch, setDebuggerPaneSize, windowHeight]);

  // Keep track of if debugger is visible
  // If not and it has become visible open to default height
  const debugOpenRef = useRef(debuggerEnabled);
  useEffect(() => {
    if (
      debuggerEnabled &&
      debugOpenRef.current !== debuggerEnabled &&
      debuggerPaneHeight <= 30
    ) {
      setDebuggerPaneSize(windowHeight * 0.5);
    }
    debugOpenRef.current = debuggerEnabled;
  }, [debuggerEnabled, debuggerPaneHeight, setDebuggerPaneSize, windowHeight]);

  useEffect(() => {
    prevWindowWidthRef.current = windowWidth;
  });
  const prevWidth = prevWindowWidthRef.current;

  useEffect(() => {
    if (windowWidth !== prevWidth) {
      const panelsTotalWidth =
        leftPaneWidth + rightPaneWidth + minCenterPaneWidth;
      const widthOverflow = panelsTotalWidth - windowWidth;
      if (widthOverflow > 0) {
        setLeftPaneSize(leftPaneWidth - 0.5 * widthOverflow);
        setRightPaneSize(rightPaneWidth - 0.5 * widthOverflow);
      }
    }
  }, [
    windowWidth,
    prevWidth,
    leftPaneWidth,
    setLeftPaneSize,
    rightPaneWidth,
    setRightPaneSize,
  ]);

  const debouncedStoreWidths = useRef(
    debounce((leftPaneWidth: number, rightPaneWidth: number) => {
      dispatch(editorActions.resizeWorldSidebar(rightPaneWidth));
      dispatch(editorActions.resizeNavigatorSidebar(leftPaneWidth));
    }, 100),
  );

  useEffect(
    () => debouncedStoreWidths.current(leftPaneWidth, rightPaneWidth),
    [leftPaneWidth, rightPaneWidth],
  );

  const recalculateLeftColumn = () => {
    const newWidth = Math.min(
      leftPaneWidth,
      windowWidth - rightPaneWidth - minCenterPaneWidth,
    );
    if (newWidth !== leftPaneWidth) {
      setLeftPaneSize(newWidth);
    }
  };

  const recalculateRightColumn = () => {
    const newWidth = Math.min(
      rightPaneWidth,
      windowWidth - leftPaneWidth - minCenterPaneWidth,
    );
    if (newWidth !== rightPaneWidth) {
      setRightPaneSize(newWidth);
    }
  };

  const hideNavigator = () => {
    dispatch(settingsActions.setShowNavigator(false));
  };

  const hasFocusForKeyboardShortcuts = useCallback(() => {
    return (
      (document.activeElement === document.body ||
        (documentContainerRef.current &&
          documentContainerRef.current.contains(document.activeElement))) ??
      false
    );
  }, []);

  return (
    <Wrapper>
      <NavigatorPane $width={showNavigator ? leftPaneWidth : 0} $faded={leftPaneWidth < 100}>
        <NavigatorPaneInner>
          <Navigator />
        </NavigatorPaneInner>
      </NavigatorPane>
      {showNavigator && (
        <SplitPaneHorizontalDivider onMouseDown={startLeftPaneResize} />
      )}
      <EditorMainPane $height={windowHeight - 38}>
        <EditorViewport ref={documentContainerRef}>
          <WorldView />
          <ToolPicker
            hasFocusForKeyboardShortcuts={hasFocusForKeyboardShortcuts}
          />
          <BrushToolbar
            hasFocusForKeyboardShortcuts={hasFocusForKeyboardShortcuts}
          />
          <WorldStatusBar />
        </EditorViewport>
        <SplitPaneVerticalDivider onMouseDown={onResizeDebugger} />
        <DebuggerPane $height={debuggerPaneHeight} $maxWidth={centerWidth}>
          <SplitPaneHeader
            onToggle={toggleDebuggerPane}
            collapsed={debuggerPaneHeight <= 30}
            buttons={<DebuggerControls />}
          >
            {l10n("FIELD_DEBUGGER")}
          </SplitPaneHeader>
          {debuggerPaneHeight > 30 && (
            <DebuggerBody $height={debuggerPaneHeight}>
              <DebuggerPanes />
            </DebuggerBody>
          )}
        </DebuggerPane>
      </EditorMainPane>
      <SplitPaneHorizontalDivider onMouseDown={onResizeRight} />
      <InspectorPane $width={rightPaneWidth}>
        <EditorSidebar />
      </InspectorPane>
    </Wrapper>
  );
};

export default WorldPage;
