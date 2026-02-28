import styled, { css } from "styled-components";
import { StyledButton } from "ui/buttons/style";

interface StyledToolbarProps {
  readonly $focus?: boolean;
}

export const StyledToolbar = styled.div<StyledToolbarProps>`
  display: flex;
  box-sizing: border-box;
  height: 38px;
  font-size: ${(props) => props.theme.typography.toolbarFontSize};
  flex-shrink: 0;
  background:
    linear-gradient(
      180deg,
      rgba(34, 46, 60, 0.96) 0%,
      rgba(24, 32, 44, 0.96) 64%,
      rgba(17, 23, 31, 0.96) 100%
    ),
    ${(props) => props.theme.colors.toolbar.background};
  color: ${(props) => props.theme.colors.text};
  border-bottom: 1px solid rgba(160, 181, 199, 0.24);
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  user-select: none;
  z-index: 1;
  -webkit-app-region: drag;
  position: relative;
  z-index: 1000;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 10px 20px rgba(0, 0, 0, 0.28);

  .Platform__darwin & {
    padding-left: 80px;
  }

  .full-screen & {
    padding-left: 10px;
  }

  & > *:not(:last-child) {
    margin-right: 5px;
  }

  input {
    -webkit-app-region: no-drag;
  }

  ${StyledButton} {
    -webkit-app-region: no-drag;
    border: 1px solid rgba(154, 177, 196, 0.26);
    height: 26px;
    padding: 0px 10px;
    flex-shrink: 0;
    font-size: 13px;
    border-radius: 6px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.06) 0%,
      rgba(255, 255, 255, 0.01) 100%
    );

    svg {
      width: 17px;
      height: 17px;
    }
  }

  ${(props) => (props.$focus === false ? blurStyles : "")}
`;

const blurStyles = css`
  background:
    linear-gradient(
      180deg,
      rgba(73, 79, 87, 0.9) 0%,
      rgba(57, 62, 70, 0.9) 100%
    ),
    ${(props) => props.theme.colors.toolbar.inactiveBackground};
`;

export const StyledToolbarTitle = styled.div`
  text-shadow: ${(props) => props.theme.colors.toolbar.textShadow};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
