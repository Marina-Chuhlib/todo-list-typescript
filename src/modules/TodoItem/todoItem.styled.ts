import styled from "styled-components";

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  height: auto;
  min-height: 48px;
  background-color: #dde6d5;

  border: 1px solid #a3b899;
  border-radius: 5px;
  margin-bottom: 15px;

  box-shadow: -15px 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Title = styled.h3`
  padding-right: 4px;
  margin: 0;
  
  &::first-letter {
    text-transform: uppercase;
  }
`;

const CreatedDate = styled.p`
  margin: 0;
  color: #31393263;
  font-size: 12px;
`;

export { Item, Wrapper, Title, CreatedDate };
