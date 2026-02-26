import React from "react";
import styled, { keyframes } from "styled-components";
import l10n from "shared/lib/lang/l10n";
import logoFile from "ui/icons/app_icon_256.png";

const fadeIn = keyframes`
from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: ${fadeIn} 1s normal forwards;
  animation-delay: 0.5s;
`;

const Card = styled.div`
  width: min(420px, 88vw);
  padding: 20px 24px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.sidebar.border};
  background: rgba(15, 23, 42, 0.72);
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.42);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  width: 108px;
  height: 108px;
  object-fit: contain;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #e2e8f0;
`;

const Message = styled.div`
  font-size: 12px;
  color: #93a3b8;
`;

const LoadingPane = () => (
  <Wrapper>
    <Card>
      <Logo src={logoFile} alt="Enchantment Game Engine" draggable={false} />
      <Title>Enchantment Game Engine</Title>
      <Message>{l10n("FIELD_LOADING")}</Message>
    </Card>
  </Wrapper>
);

export default LoadingPane;
