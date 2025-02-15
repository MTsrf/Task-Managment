import { Row } from "antd";
import styled from "styled-components";
import LoginSection from "../features/HomePage/LoginSection";
import BannerSection from "../features/HomePage/BannerSection";

const Container = styled(Row)`
  background-color: #fff9f9;
  height: 100vh;
`;

const HomePage = () => {
  return (
    <>
      <Container>
        <LoginSection />
        <BannerSection />
      </Container>
    </>
  );
};

export default HomePage;
