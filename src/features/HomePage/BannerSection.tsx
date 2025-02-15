import { Col } from "antd";
import styled from "styled-components";
import { Image } from "../../components/common/StyledComponent/IconImage";

const Card = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (max-width: 999px) {
    display: none;
  }
`;

const CircleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
`;

const Circle = styled.div`
  position: absolute;
  border: 1px solid #7b1984;
  border-radius: 50%;
  top: 60%;
  left: 70%;
  transform: translate(-50%, -50%);

  @media (max-width: 1200px) {
    left: 65%;
  }

  @media (max-width: 768px) {
    left: 60%;
  }
`;

const LargeCircle = styled(Circle)`
  width: 750px;
  height: 750px;

  @media (max-width: 1200px) {
    width: 650px;
    height: 650px;
  }

  @media (max-width: 768px) {
    width: 550px;
    height: 550px;
  }
`;

const MediumCircle = styled(Circle)`
  width: 650px;
  height: 650px;

  @media (max-width: 1200px) {
    width: 550px;
    height: 550px;
  }

  @media (max-width: 768px) {
    width: 450px;
    height: 450px;
  }
`;

const SmallCircle = styled(Circle)`
  width: 500px;
  height: 500px;

  @media (max-width: 1200px) {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 768px) {
    width: 350px;
    height: 350px;
  }
`;

const MainContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
`;

const StyledImage = styled(Image)`
  position: absolute;
  top: 13%;
  left: 55%;
  width: 520px;
  border-radius: 10px;
  max-width: 90%;
  height: auto;

  @media (max-width: 1200px) {
    width: 450px;
    left: 50%;
  }

  @media (max-width: 999px) {
    width: 400px;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const BannerSection = () => {
  return (
    <Card span={16}>
      <MainContainer>
        <CircleContainer>
          <LargeCircle />
          <MediumCircle />
          <SmallCircle />
        </CircleContainer>
        <ImageContainer>
          <StyledImage
            src="/assets/img/task-list-view.jpg"
            alt="logo"
            size="100%"
          />
        </ImageContainer>
      </MainContainer>
    </Card>
  );
};

export default BannerSection;
