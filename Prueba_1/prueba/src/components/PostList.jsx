import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  CircularProgress,
} from "@mui/material";

export default function PostList() {
  const { list, loading } = useSelector((s) => s.posts);

  if (loading) return <CircularProgress />;

  return (
    <>
      {list.map((post) => (
        <Card key={post.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography sx={{ mb: 1 }}>{post.body}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2">
              Comentarios ({post.comments.length})
            </Typography>
            {post.comments.map((c) => (
              <Box
                key={c.id}
                sx={{ ml: 2, mt: 1, pl: 1, borderLeft: "3px solid #ccc" }}
              >
                <Typography variant="body2">
                  <b>{c.name}</b> ({c.email})
                </Typography>
                <Typography variant="body2">{c.body}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
