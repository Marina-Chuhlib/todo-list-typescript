import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./modules/Layout/Layout";
import HomePage from "./pages/HomePages/HomePage";
import TodoListPage from "./pages/TodoListPage/TodoListPage";

import { Container } from "./App.styled";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/todos" element={<TodoListPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
