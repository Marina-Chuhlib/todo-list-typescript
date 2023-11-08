import React from "react";

import Checkbox from "@mui/material/Checkbox";
import Button from "../../shared/components/Button.tsx/Button";

import { ITodo } from "../../shared/interfaces";

import { Item, Wrapper, Title, CreatedDate } from "./todoItem.styled";

interface ITodoItemProps extends ITodo {
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const TodoItem: React.FC<ITodoItemProps> = (item) => {
  const { title, complete, id, createdAt, removeTodo, toggleTodo } = item;

  const moment = require("moment");

  const formattedDate = moment(createdAt).format("DD MMMM YYYY / HH:mm");
  
  return (
    <Item>
      <div>
        <Title>{title}</Title>
        <CreatedDate>Creation date: {formattedDate}</CreatedDate>
      </div>

      <Wrapper>
        <Checkbox
          checked={complete}
          onChange={() => toggleTodo(id)}
          sx={{
            color: "#667b68",
            width: "20px",
            height: "20px",
            "&.Mui-checked": {
              color: "#667b68",
            },
          }}
        />
        <Button onClick={() => removeTodo(id)}>Delate</Button>
      </Wrapper>
    </Item>
  );
};

export default TodoItem;
