import React from "react";
import { Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  StyledAvatar,
  StyledDropdown,
  MenuItemContent,
  UserInfo,
  AvatarContainer,
} from "./AvatarMenu.styles";

interface AvatarMenuProps {
  name: string;
  email: string;
  avatarUrl?: string | null;
  size?: "small" | "default" | "large";
  onLogout?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({
  name,
  email,
  avatarUrl,
  size = "default",
  onLogout,
}) => {
  const getFirstLetter = (name: string): string => {
    return name.charAt(0).toUpperCase();
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "user-info",
      label: (
        <UserInfo>
          <div className="user-name">{name}</div>
          <div className="user-email">{email}</div>
        </UserInfo>
      ),
    },
    {
      type: "divider",
    },

    {
      key: "logout",
      label: (
        <MenuItemContent>
          <LogoutOutlined />
          Logout
        </MenuItemContent>
      ),
      onClick: onLogout,
    },
  ];

  const menu = <Menu items={menuItems} />;

  return (
    <StyledDropdown
      overlay={menu}
      trigger={["click"]}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
    >
      <AvatarContainer>
        <StyledAvatar $size={size} src={avatarUrl}>
          {!avatarUrl && getFirstLetter(name)}
        </StyledAvatar>
        <p>{name}</p>
      </AvatarContainer>
    </StyledDropdown>
  );
};

export default AvatarMenu;
