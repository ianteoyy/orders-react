import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { fadeIn, enlarge } from "../keyframes";

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
`;

const Title = styled.p`
  font-size: 48px;
  opacity: 1;
  animation: ${fadeIn} 0.5s, ${enlarge} 0.5s;
`;

const SubTitle = styled(Link)`
  font-size: 32px;
`;

const Home = () => {
  return (
    <StyledHome>
      <Title>Welcome to the Jacob's Cream Crackers subscription page!</Title>
      <SubTitle to="/order">Please click here to continue</SubTitle>
    </StyledHome>
  );
};

export default Home;
