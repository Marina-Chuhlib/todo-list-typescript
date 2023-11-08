import { ITodo } from "../../shared/interfaces";

import TodoItem from "../TodoItem/TodoItem";

import { Wrapper, List } from "./todoList.styled";

interface ITodoListProps {
  items: ITodo[];
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const TodoList: React.FC<ITodoListProps> = ({
  items,
  toggleTodo,
  removeTodo,
}) => {
  return (
    <Wrapper>
      <List>
        {items.map((item) => {
          return (
            <TodoItem
              key={item.id}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
              {...item}
            />
          );
        })}
      </List>
    </Wrapper>
  );
};

export default TodoList;
