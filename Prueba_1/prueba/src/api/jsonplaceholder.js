const BASE = "https://jsonplaceholder.typicode.com";

const request = async (url, options) => {
  const res = await fetch(`${BASE}${url}`, options);
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
};

export const api = {
  getUsers: () => request("/users"),
  getPostsByUser: (userId) => request(`/users/${userId}/posts`),
  getCommentsByPost: (postId) => request(`/posts/${postId}/comments`),
  getTodosByUser: (userId) => request(`/users/${userId}/todos`),
  createTodo: (todo) =>
    request("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(todo),
    }),
};
