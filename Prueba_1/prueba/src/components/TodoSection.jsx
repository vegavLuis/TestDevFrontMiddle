import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
  Paper,
} from "@mui/material";
import { addTodo } from "../store/todosSlice";

export default function TodoSection({ userId }) {
  const dispatch = useDispatch();
  const { list, loading, saving } = useSelector((s) => s.todos);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await dispatch(addTodo({ userId, title: title.trim(), completed }));
    setTitle("");
    setCompleted(false);
  };

  return (
    <>
      <Paper component="form" onSubmit={handleSubmit} sx={{ p: 2, mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <TextField
            label="Título"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
            }
            label="Completada"
          />
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </Box>
      </Paper>

      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {list.map((t, i) => (
            <ListItem key={`${t.id}-${i}`} divider>
              <ListItemText primary={`#${t.id} - ${t.title}`} />
              <Chip
                label={t.completed ? "Completada" : "Pendiente"}
                color={t.completed ? "success" : "default"}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
