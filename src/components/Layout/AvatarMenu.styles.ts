import styled from "styled-components";
import { Avatar, Dropdown } from "antd";

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  p {
    margin: 0;
    color: #000;
    font-weight: 600;
    font-family: "Mulish", sans-serif;
  }
`;

export const StyledAvatar = styled(Avatar)<{
  $size?: "small" | "default" | "large";
}>`
  cursor: pointer;
  background: ${({ theme }) => theme.colors?.primary || "#1890ff"};

  ${({ $size }) => {
    switch ($size) {
      case "small":
        return "width: 32px; height: 32px;";
      case "large":
        return "width: 48px; height: 48px;";
      default:
        return "width: 40px; height: 40px;";
    }
  }}

  &:hover {
    opacity: 0.85;
  }
`;

export const StyledDropdown = styled(Dropdown)`
  .ant-dropdown-menu {
    padding: 4px 0;
  }
`;

export const MenuItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UserInfo = styled.div`
  padding: 12px 16px;

  .user-name {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 4px;
  }

  .user-email {
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
  }
`;
