import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  margin-top: 15px;
  height: 100vh;
  padding: 15px;
  text-align: center;
  max-width: 700px;

  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h2`
  margin: 0;
  color: #667b68;
`;

const Text = styled.p`
  color: #667b68;
  font-size: 18px;
  line-height: 1.5;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const ImgWrapper = styled.div`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);

  animation: ${fadeIn} 0.5s ease-in-out;

  @media screen and (min-width: 430px) {
    top: 70%;
  }

  @media screen and (min-width: 768px) {
    top: 72%;
  }
`;

const Img = styled.img`
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 24px;
  box-shadow: -15px 0 10px 0 rgba(0, 0, 0, 0.2);

  object-fit: cover;

  height: 120px;
  width: 240px;

  @media screen and (min-width: 768px) {
    height: 320px;
    width: 540px;
  }
  @media screen and (min-width: 1199px) {
    height: 400px;
    width: 900px;
  }
`;

const TodoLink = styled(Link)`
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  &:hover {
    color: #667b68;
    font-weight: bold;
  }
`;

export { Wrapper, Title, Text, ImgWrapper, Img, TodoLink };
