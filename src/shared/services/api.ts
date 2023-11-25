import { ITodo } from "../interfaces";
const BASE_URL = "https://647874fa362560649a2dceb2.mockapi.io/app";

export const fetchData = async (): Promise<ITodo[]> => {
  try {
    const response = await fetch(`${BASE_URL}/todos`);
    const data: ITodo[] = await response.json();

    const sortedData = data
      .map((item) => ({ ...item, createdAt: new Date(item.createdAt) }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return sortedData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postData = async (title: string): Promise<ITodo | null> => {
  try {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        complete: false,
        createdAt: new Date(),
      }),
    };

    const response = await fetch(`${BASE_URL}/todos`, requestOptions);

    if (response.ok) {
      const data: ITodo = await response.json();
      return data;
    } else {
      console.error(`Failed to create todo. Status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("An error occurred while creating todo:", error);
    return null;
  }
};

export const removeById = async (id: number): Promise<boolean> => {
  try {
    const requestOptions: RequestInit = {
      method: "DELETE",
    };

    const response = await fetch(`${BASE_URL}/todos/${id}`, requestOptions);

    if (response.ok) {
      return true;
    } else {
      console.error(`Failed to delete todo. Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error("An error occurred while deleting todo:", error);
    return false;
  }
};

export const updateTodo = async (
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
    return;
  } catch (error) {
    console.log(error);
  }
};
