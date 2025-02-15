import styled from "styled-components";

interface IconImageProps {
  size?: string;
}

export const Image = styled.img<IconImageProps>`
  width: ${(props) => props.size || "20px"};
  height: ${(props) => props.size || "20px"};
`;
