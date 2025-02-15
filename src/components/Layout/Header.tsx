import React from "react";
import { Container } from "../common/StyledComponent/Common";
import styled from "styled-components";
import Logo from "../Logo";
import AvatarMenu from "./AvatarMenu";
import useAuth from "../../hooks/useAuth";
import { useSettings } from "../../hooks/useSettings";
import { Button } from "antd";
import { Image } from "../common/StyledComponent/IconImage";
import { Outlet } from "react-router";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DividerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ViewButton = styled.button<{ $isActive: boolean }>`
  background: none;
  border: none;
  // padding: 0.5rem 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.$isActive ? "#000" : "#666")};
  border-bottom: 2px solid
    ${(props) => (props.$isActive ? "#000" : "transparent")};
  transition: all 0.2s ease;

  &:hover {
    color: #000;
  }

  img {
    color: ${(props) => (props.$isActive ? "#000" : "#666")};
  }
`;

const LogoutButton = styled(Button)`
  width: 108px;
  color: black;
  font-weight: 600;
  background-color: #fff9f9;
  border: 2px solid rgba(123, 25, 132, 0.1);
  padding: 1.2rem 2rem;
  border-radius: 10px;

  img {
    width: 15px;
    height: 15px;
  }

  &:hover {
    background-color: #fff9f9;
    border: 2px solid rgba(123, 25, 132, 0.1) !important;
    color: black !important;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const Header = () => {
  const { user, signOut } = useAuth();
  console.log({ user });
  const { viewInfo } = useSettings();
  const { view, toggleView } = viewInfo;
  return (
    <>
      <Container>
        <HeaderWrapper>
          <DividerSection>
            <Logo />
            <ViewToggle>
              <ViewButton
                $isActive={view === "list"}
                onClick={() => toggleView("list")}
              >
                <Image src="/assets/img/svg/list.svg" alt="list-icon" />
                List
              </ViewButton>
              <ViewButton
                $isActive={view === "board"}
                onClick={() => toggleView("board")}
              >
                <Image src="/assets/img/svg/board.svg" alt="list-icon" />
                Board
              </ViewButton>
            </ViewToggle>
          </DividerSection>
          <DividerSection>
            <AvatarMenu
              name={user?.displayName || ""}
              email={user?.email || ""}
              avatarUrl={user?.photoURL ?? null}
              onLogout={signOut}
            />
            <LogoutButton>
              <Image src="/assets/img/svg/logout.svg" alt="list-icon" />
              Logout
            </LogoutButton>
          </DividerSection>
        </HeaderWrapper>
      </Container>
      <Outlet />
    </>
  );
};

export default Header;
