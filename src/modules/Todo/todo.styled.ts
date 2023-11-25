import styled from "styled-components";

const Section = styled.section`
  max-width: 780px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 18px;
  padding-right: 18px;
  padding-bottom:40px;

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 22px;

  @media screen and (max-width: 600px) {
    display: block;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  text-align: center;
  color: #667b68;
  margin-bottom: 22px;
`;

const Input = styled.input`
  display: block;
  padding: 2px 4px;
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: none;
  border: 1px solid #667b68;
  background-color: #a3b899;
  box-shadow: -15px 0 10px 0 rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 600px) {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 12px;
    width: 240px;
  }

  &:focus {
    outline: 1.1px solid #667b68;
  }

  &:active {
    outline: 1.1px solid #667b68;
  }
`;

const Filter = styled.select`
  cursor: pointer;
  border-radius: 5px;
  border: none;
  border: 1px solid #667b68;
  background-color: #f8d3c5;
  color: #313932;
  font-size: 16px;
  height: 30px;
  width: fit-content;
  box-shadow: -5px 0 10px 0 rgba(0, 0, 0, 0.2);

  &:focus {
    outline: 1.1px solid #667b68;
  }

  &:active {
    outline: 1.1px solid #667b68;
  }

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

export { Section, Wrapper, Title, Input, Filter };
