import React from "react";
import { Image } from "../common/StyledComponent/IconImage";
import styled from "styled-components";
import { H1 } from "../common/StyledComponent/Typography";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Logo = () => {
  return (
    <LogoContainer>
      <Image size="32px" src="/assets/img/svg/notepad.svg" alt="logo" />
      <H1>TaskBuddy</H1>
    </LogoContainer>
  );
};

export default Logo;
