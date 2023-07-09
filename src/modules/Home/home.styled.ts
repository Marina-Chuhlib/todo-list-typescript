import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const Title = styled.h2`
  color: #667b68;
`;

const Img = styled.img`
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 24px;
  box-shadow: -15px 0 10px 0 rgba(0, 0, 0, 0.2);

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

export { Wrapper, Title, Img, TodoLink };
