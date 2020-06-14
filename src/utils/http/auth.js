import http from "./http";
export function register(user) {
  return http.post("/auth/local/register", user);
}

export function edit_account(id, user) {
  return http.put("/users/" + id, user);
}

export function delete_account(id) {
  return http.delete("/users/" + id);
}
export function login(user) {
  return http.post("/auth/local", user);
}

export default {
  register,
  login,
};
