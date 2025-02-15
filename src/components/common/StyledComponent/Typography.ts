import styled from "styled-components";
interface TypographyProps {
  fontSize?: string;
  fontFamily?: string;
  color?: string;
  fontWeight?: string;
}
export const H1 = styled.h1<TypographyProps>`
  font-size: ${(props) => props.fontSize || "20px"};
  font-family: ${(props) => props.fontFamily || "Mulish, sans-serif"};
  color: ${(props) => props.color || "black"};
  margin: 0;
  font-weight: 700;
`;

export const H2 = styled.h2<TypographyProps>`
  font-size: ${(props) => props.fontSize || "20px"};
  font-family: ${(props) => props.fontFamily || "Mulish, sans-serif"};
  color: ${(props) => props.color || "black"};
  margin: 0;
  font-weight: ${(props) => props.fontWeight || "600"};
`;
