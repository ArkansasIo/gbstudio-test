import styled, { css } from "styled-components";

// #region SplashWindow

interface StyledSplashWindowProps {
  $focus: boolean;
}

export const StyledSplashWindow = styled.div<StyledSplashWindowProps>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 85% 8%,
      rgba(59, 130, 246, 0.14) 0%,
      rgba(15, 23, 42, 0) 38%
    ),
    radial-gradient(
      circle at 0% 100%,
      rgba(20, 184, 166, 0.1) 0%,
      rgba(15, 23, 42, 0) 42%
    ),
    #0b1220;
  overflow: hidden;
  ${(props) =>
    props.$focus === false
      ? css`
          opacity: 0.75;
          -webkit-filter: grayscale(100%);
        `
      : ""}
`;

// #endregion SplashWindow

// #region SplashTab

interface StyledSplashTabProps {
  $selected?: boolean;
}

export const StyledSplashTab = styled.button<StyledSplashTabProps>`
  font-size: 13px;
  padding: 9px 14px;
  margin: 2px 10px;
  border-radius: 8px;
  text-align: left;
  color: ${(props) => props.theme.colors.text};
  background: transparent;
  border: 0;
  -webkit-app-region: no-drag;
  transition: background 0.16s ease, transform 0.12s ease;

  &:hover {
    background: rgba(148, 163, 184, 0.16);
    transform: translateX(2px);
  }

  &:active {
    background: rgba(148, 163, 184, 0.22);
  }

  ${(props) => (props.$selected ? styledSplashTabSelectedStyles : "")}
`;

const styledSplashTabSelectedStyles = css`
  background: linear-gradient(90deg, rgba(37, 99, 235, 0.95), #2563eb);
  color: #eff6ff;

  &:hover {
    background: linear-gradient(90deg, rgba(37, 99, 235, 0.95), #2563eb);
    color: #eff6ff;
    transform: none;
  }
  &:active {
    background: linear-gradient(90deg, rgba(37, 99, 235, 0.95), #2563eb);
    color: #eff6ff;
  }
`;

// #endregion SplashTab
