import styled from "styled-components";

export const ButtonEl = styled.button`
  border: none;
  border: 1px solid #667b68;
  padding: 3px 6px;
  border-radius: 5px;
  background-color: #f8d3c5;
  color: #313932;
  height: 30px;
  width: fit-content;
  box-shadow: -5px 0 10px 0 rgba(0, 0, 0, 0.2);

  &:hover {
    color: #fff;
    background-color: #a3b899;
  }

  @media screen and (max-width: 600px) {
    margin-right: 6px;
    font-size: 12px;
  }
`;
