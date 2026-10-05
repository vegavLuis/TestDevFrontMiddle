import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Typography,
} from "@mui/material";
import { fetchUsers, selectUser } from "../store/usersSlice";
import { clearPosts } from "../store/postsSlice";
import { clearTodos } from "../store/todosSlice";

export default function UserList() {
  const dispatch = useDispatch();
  const { list, selectedId, loading } = useSelector((s) => s.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSelect = (id) => {
    dispatch(selectUser(id));
    dispatch(clearPosts());
    dispatch(clearTodos());
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <Typography variant="h6">Usuarios</Typography>
      <List>
        {list.map((u) => (
          <ListItemButton
            key={u.id}
            selected={u.id === selectedId}
            onClick={() => handleSelect(u.id)}
          >
            <ListItemText primary={u.name} secondary={`@${u.username}`} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
