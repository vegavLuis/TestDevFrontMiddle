import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { fetchPosts } from "../store/postsSlice";
import { fetchTodos } from "../store/todosSlice";
import PostList from "./PostList";
import TodoSection from "./TodoSection";

export default function UserDetail() {
  const dispatch = useDispatch();
  const [view, setView] = useState(null);
  const user = useSelector((s) =>
    s.users.list.find((u) => u.id === s.users.selectedId),
  );

  if (!user) return <Typography>Selecciona un usuario</Typography>;

  const showPosts = () => {
    setView("posts");
    dispatch(fetchPosts(user.id));
  };
  const showTodos = () => {
    setView("todos");
    dispatch(fetchTodos(user.id));
  };

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h5">{user.name}</Typography>
          <Typography>Username: {user.username}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Teléfono: {user.phone}</Typography>
          <Typography>Sitio web: {user.website}</Typography>
          <Typography>Empresa: {user.company.name}</Typography>
          <Typography>Ciudad: {user.address.city}</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="contained" onClick={showPosts}>
              Posts
            </Button>
            <Button variant="contained" color="secondary" onClick={showTodos}>
              Todos
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {view === "posts" && <PostList />}
      {view === "todos" && <TodoSection userId={user.id} />}
    </>
  );
}
