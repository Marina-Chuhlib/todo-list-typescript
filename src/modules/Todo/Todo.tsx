import React, {
  FC,
  useEffect,
  useRef,
  useState,
  ChangeEventHandler,
  KeyboardEventHandler,
} from "react";
import { useNavigate } from "react-router-dom";

import { ITodo } from "../../shared/interfaces";

import TodoList from "../TodoList/TodoList";

import Button from "../../shared/components/Button.tsx/Button";

import { Section, Title, Input, Wrapper, Filter } from "./todo.styled";

import Loader from "../../shared/components/Loader/Loader";

const BASE_URL = "https://647874fa362560649a2dceb2.mockapi.io/app";

const Todo: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [filteredTodo, setFilteredTodo] = useState(todo);
  const [filterTitle, setFilterTitle] = useState("Total tasks");
  const [filter, setFilter] = useState(false);

  const navigate: (path: string, options?: { replace?: boolean }) => void =
    useNavigate();

  // const inputRef = useRef<HTMLInputElement>(null);

  const fetchData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/todos`);
      const data: ITodo[] = await response.json();

      const sortedData = data
        .map((item) => ({ ...item, createdAt: new Date(item.createdAt) }))
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

      setTodo(sortedData);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredTodo(todo);
  }, [todo]);

  const goBackBtn = (): void => {
    navigate("/");
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    const filteredItems = todo.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    if (filteredItems.length === 0 || e.target.value === "") {
      setFilteredTodo(todo);
    } else {
      setFilteredTodo(filteredItems);
      setFilter(true);
    }
  };

  const isDuplicate = (title: string): boolean => {
    const normalized = title.toLowerCase();
    const result = todo.find(({ title }) => {
      return normalized === title.toLowerCase();
    });

    return Boolean(result);
  };

  const postData = async (): Promise<void> => {
    try {
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: value,
          complete: false,
          createdAt: new Date(),
        }),
      };

      const response = await fetch(`${BASE_URL}/todos`, requestOptions);

      const data: ITodo = await response.json();
      setTodo((prevTodo: ITodo[]) => [data, ...prevTodo]);
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
    postData();
  };

  const removeTodo = async (id: number): Promise<void> => {
    try {
      const requestOptions: RequestInit = {
        method: "DELETE",
      };

      if (filter) {
        setFilterTitle("Total Tasks");
      }

      const response = await fetch(`${BASE_URL}/todos/${id}`, requestOptions);

      if (response.ok) {
        setTodo((prevTodo: ITodo[]) =>
          prevTodo.filter((item: ITodo) => item.id !== id)
        );
        setValue("");
      } else {
        alert("Failed to remove todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTodoData = async (
    id: number,
    complete: boolean
  ): Promise<void> => {
    try {
      const requestOptions: RequestInit = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          complete: complete,
        }),
      };

      await fetch(`${BASE_URL}/todos/${id}`, requestOptions);
    } catch (error) {
      console.log(error);
    }
  };

  // const toggleTodo = (id: number): void => {
  //   const updatedTodo: ITodo[] = todo.map((item: ITodo) =>
  //     item.id === id ? { ...item, complete: !item.complete } : item
  //   );

  // let filteredItems: ITodo[] = updatedTodo;
  // if (filterTitle === "Total marked tasks") {
  //   filteredItems = updatedTodo.filter(
  //     (item: ITodo) => item.complete === true
  //   );
  // } else if (filterTitle === "Total unmarked tasks") {
  //   filteredItems = updatedTodo.filter(
  //     (item: ITodo) => item.complete === false
  //   );
  // }

  // setFilteredTodo(filteredItems);
  //   setTodo(updatedTodo);
  //   setValue("");
  //   setFilter(true);

  //   const todoItem: ITodo | undefined = updatedTodo.find(
  //     (item: ITodo) => item.id === id
  //   );

  //   const complete: boolean = todoItem ? todoItem.complete : false;
  //   toggleTodoData(id, complete);
  // };

  const toggleTodo = (id: number): void => {
    const updatedTodo: ITodo[] = todo.map((item: ITodo) =>
      item.id === id ? { ...item, complete: !item.complete } : item
    );

    // setFilteredTodo((prevFilteredTodo: ITodo[]) =>
    //   prevFilteredTodo.map((filteredItem: ITodo) =>
    //     filteredItem.id === id
    //       ? { ...filteredItem, complete: !filteredItem.complete }
    //       : filteredItem
    //   )
    // );

    setTodo(updatedTodo);
    setValue("");
    setFilter(true);

    const todoItem: ITodo | undefined = todo.find(
      (item: ITodo) => item.id === id
    );

    const complete: boolean = todoItem ? !todoItem.complete : false;
    toggleTodoData(id, complete);

    // let filteredItems: ITodo[] = updatedTodo;
    // if (filterTitle === "Total marked tasks") {
    //   filteredItems = updatedTodo.filter(
    //     (item: ITodo) => item.complete === true
    //   );
    // } else if (filterTitle === "Total unmarked tasks") {
    //   filteredItems = updatedTodo.filter(
    //     (item: ITodo) => item.complete === false
    //   );
    // }
    // console.log(filteredItems, "filteredItems");
    
    setFilterTitle("Total tasks");
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
        const filteredItems: ITodo[] = todo.filter(
          (item: ITodo) => item.complete === true
        );

        setFilteredTodo(filteredItems);
        setFilterTitle("Total marked tasks");

        break;
      case "not marked":
        const filtered: ITodo[] = todo.filter(
          (item: ITodo) => item.complete === false
        );
        setFilteredTodo(filtered);
        setFilterTitle("Total unmarked tasks");

        break;

      default:
        setFilteredTodo(todo);
        setFilterTitle("Total tasks");

        break;
    }
  };

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
            // ref={inputRef}
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
          {/* {filterTitle && filteredTodo.length > 0 ? (
       
          ) : (
            <p
              style={{ color: "black", fontSize: "18px", textAlign: "center" }}
            >
              List empty
            </p>
          )} */}
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
