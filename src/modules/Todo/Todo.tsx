import React, {
  FC,
  useEffect,
  useState,
  ChangeEventHandler,
  KeyboardEventHandler,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  fetchData,
  postData,
  removeById,
  updateTodo,
} from "../../shared/services/api";

import { ITodo } from "../../shared/interfaces";

import TodoList from "../TodoList/TodoList";

import Button from "../../shared/components/Button.tsx/Button";

import { Section, Title, Input, Wrapper, Filter } from "./todo.styled";

import Loader from "../../shared/components/Loader/Loader";

const Todo: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [filteredTodo, setFilteredTodo] = useState(todo);
  const [filterTitle, setFilterTitle] = useState("Total tasks");
  const [filter, setFilter] = useState(false);

  let storedTodo: string | null = localStorage.getItem("filteredTodo");
  let filteredItems: ITodo[] = [];


  const navigate: (path: string, options?: { replace?: boolean }) => void =
    useNavigate();

  const getTodos = async () => {
    try {
      setIsLoading(true);
      const data = await fetchData();
      setTodo(data);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (storedTodo && filterTitle !== "Total tasks") {
      const parsedTodo:ITodo[] = JSON.parse(storedTodo);
      setFilteredTodo(parsedTodo);
    } else {
      setFilteredTodo(todo);
    }
  }, [todo, storedTodo, filterTitle]);

  const goBackBtn = (): void => {
    navigate("/");
  };

  const getFilteredItems = (items: ITodo[], inputValue: string): ITodo[] =>
    items.filter((item) => item.title.toLowerCase().includes(inputValue));

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue: string = e.target.value.toLowerCase();
    setValue(e.target.value);

    const filteredItems = getFilteredItems(todo, inputValue);

    if (filteredItems.length === 0 || inputValue === "") {
      setFilteredTodo(todo);
    } else {
      setFilteredTodo(filteredItems);
      setFilter(true);
    }

    if (filterTitle !== "Total tasks" && storedTodo) {
      const parsedTodo: ITodo[] = JSON.parse(storedTodo);
      const filteredItems = getFilteredItems(parsedTodo, inputValue);
      setFilteredTodo(filteredItems);
    }
  };

  const isDuplicate = (title: string): boolean => {
    const normalized = title.toLowerCase();
    const result = todo.find(({ title }) => {
      return normalized === title.toLowerCase();
    });

    return Boolean(result);
  };

  const postTodo = async (value: string): Promise<void> => {
    try {
      const data = await postData(value);
      if (data) {
        setTodo((prevTodo: ITodo[]) => [data, ...prevTodo]);

        if (filterTitle === "Total unmarked tasks" && storedTodo) {
          const parsedTodo:ITodo[] = JSON.parse(storedTodo);
          const updatedFilteredTodo = [data, ...parsedTodo];

          setFilteredTodo(updatedFilteredTodo);
          localStorage.setItem(
            "filteredTodo",
            JSON.stringify(updatedFilteredTodo)
          );
        }

        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = (): void => {
    if (value === "") {
      alert("Title can't be empty");
      return;
    }

    if (isDuplicate(value)) {
      alert(`${value} is already in the list`);
      return;
    }

    setValue("");
    postTodo(value);
  };

  const removeTodo = async (id: number): Promise<void> => {
    try {
      const isDeleted = await removeById(id);

      if (isDeleted) {
        setTodo((prevTodo: ITodo[]) =>
          prevTodo.filter((item: ITodo) => item.id !== id)
        );

        setFilteredTodo((prevFilteredTodo: ITodo[]) =>
          prevFilteredTodo.filter((item: ITodo) => item.id !== id)
        );

        setValue("");

        const updatedFilteredTodo = filteredTodo.filter(
          (item: ITodo) => item.id !== id
        );

        localStorage.setItem(
          "filteredTodo",
          JSON.stringify(updatedFilteredTodo)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTodo = async (id: number): Promise<void> => {
    try {
      const updatedTodo: ITodo[] = todo.map((item: ITodo) =>
        item.id === id ? { ...item, complete: !item.complete } : item
      );

      setTodo(updatedTodo);
      setValue("");
      setFilter(true);

      const todoItem: ITodo | undefined = todo.find(
        (item: ITodo) => item.id === id
      );

      const complete: boolean = todoItem ? !todoItem.complete : false;
      await updateTodo(id, complete);

      const filteredTodos: ITodo[] = updatedTodo.filter((item) => {
        if (filterTitle === "Total marked tasks") {
          return item.complete;
        } else if (filterTitle === "Total unmarked tasks") {
          return !item.complete;
        }
        return true;
      });

      localStorage.setItem("filteredTodo", JSON.stringify(filteredTodos));
      setFilteredTodo(filteredTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handelKeyboardChange: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectedOption: string = e.target.value;
    setValue("");
    setFilter(true);

    
    switch (selectedOption) {
      case "marked":
        filteredItems = todo.filter((item: ITodo) => item.complete === true);

        localStorage.setItem("filteredTodo", JSON.stringify(filteredItems));
        setFilteredTodo(filteredItems);
        setFilterTitle("Total marked tasks");

        break;
      case "not marked":
        filteredItems = todo.filter((item: ITodo) => item.complete === false);

        localStorage.setItem("filteredTodo", JSON.stringify(filteredItems));
        setFilteredTodo(filteredItems);
        setFilterTitle("Total unmarked tasks");

        break;

      default:
        setFilteredTodo(todo);
        setFilterTitle("Total tasks");
        localStorage.removeItem("filteredTodo");

        break;
    }
  };

  if (filter) {
    localStorage.setItem("filter", JSON.stringify(filterTitle));
  }

  return (
    <Section>
      <Button onClick={goBackBtn}> Go Back</Button>
      <Title>To-do List</Title>
      {isLoading && <Loader />}
      {!isLoading && (
        <Wrapper>
          <Input
            type="text"
            value={value}
            autoFocus
            onChange={handleChange}
            onKeyDown={handelKeyboardChange}
            placeholder="Search..."
          />
          <Button onClick={addTodo}>Add todo</Button>
          <Filter name="filter" id="filter" onChange={handleSelectChange}>
            <option value="default">Show all</option>
            <option value="marked">Marked</option>
            <option value="not marked">Not marked</option>
          </Filter>
        </Wrapper>
      )}

      {!isLoading && todo.length > 0 && (
        <>
          <TodoList
            items={filter ? filteredTodo : todo}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
          />
          <p style={{ textAlign: "right" }}>
            {filterTitle} - {filteredTodo.length}
          </p>
        </>
      )}
      {!isLoading && todo.length === 0 && (
        <p style={{ color: "black", fontSize: "18px", textAlign: "center" }}>
          List empty
        </p>
      )}
    </Section>
  );
};

export default Todo;
