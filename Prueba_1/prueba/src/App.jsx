import { useSelector } from "react-redux";
import { Container, Grid, Typography, CssBaseline } from "@mui/material";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";

export default function App() {
  const selectedId = useSelector((s) => s.users.selectedId);

  return (
    <>
      <CssBaseline />
      <Container sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Prueba JSONPlaceholder
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <UserList />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <UserDetail key={selectedId} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
