import { Button, Col } from "antd";
import styled from "styled-components";
import { Image } from "../../components/common/StyledComponent/IconImage";
import { H1 } from "../../components/common/StyledComponent/Typography";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router";

const Card = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;

  @media (max-width: 999px) {
    justify-content: center;
    align-items: center;
    display: flex;
    width: 100% !important;
  }
`;

const LoginCard = styled.div`
  max-width: 370px;
  width: 100%;
  padding: 16px;
  text-align: left;

  @media (max-width: 999px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const LoginButton = styled(Button)`
  background-color: #292929;
  color: #fff;
  width: 100%;
  padding: 30px 45px;
  font-size: 20px;
  font-weight: 700;
  font-family: "Urbanist", sans-serif;
  border-radius: 18px;
  border: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #292929 !important;
    color: #fff !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
`;

const TitleBox = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 999px) {
    justify-content: center;
    text-align: center;
  }
`;

const LoginContent = styled.span`
  font-size: 13px;
  font-weight: 500;
  font-family: "Urbanist", sans-serif;
  color: #000;
`;

const ContentWrapper = styled.div`
  width: 300px;
  margin-bottom: 20px;

  @media (max-width: 999px) {
    width: 100%;
    text-align: center;
  }
`;

const LoginSection = () => {
  const { signIn, user, error, loading } = useAuth();

  const onHandleGoogleLogin = async () => {
    try {
      await signIn();
    } catch (error) {
      console.error(error);
    }
  };
  if (user?.isAuthenticated) {
    return <Navigate replace to="/task-list" />;
  }
  return (
    <Card xs={24} sm={24} md={24} lg={8}>
      <LoginCard>
        <ContentWrapper>
          <TitleBox>
            <Image size="32px" src="/assets/img/svg/task.svg" alt="logo" />
            <H1
              color="#7B1984"
              fontSize="26px"
              fontFamily="Urbanist, sans-serif"
            >
              TaskBuddy
            </H1>
          </TitleBox>
          <LoginContent>
            Streamline your workflow and track progress effortlessly with our
            all-in-one task management app.
          </LoginContent>
        </ContentWrapper>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <LoginButton onClick={onHandleGoogleLogin}>
          {loading ? (
            "Loading..."
          ) : (
            <>
              <Image
                size="20px"
                src="/assets/img/svg/icons8-google.svg"
                alt="icon"
                style={{ marginRight: 8 }}
              />
              Continue with Google
            </>
          )}
        </LoginButton>
      </LoginCard>
    </Card>
  );
};

export default LoginSection;
