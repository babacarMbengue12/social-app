import http, { makeid } from "./http";

export async function list_user() {
  const { data } = await http.get("/users/");
  return data;
}
export async function list_posts() {
  const { data } = await http.get("/posts/");
  return data;
}

export async function new_post(data) {
  return await http.post("/posts/", data);
}

export async function edit_post(id, data) {
  return await http.put("/posts/" + id, data);
}
export async function delete_post(id) {
  return await http.delete("/posts/" + id);
}

export async function read_user(id) {
  return await http.get("/user/" + id);
}

export async function update_user(id, { avatar, ...data }) {
  let formdata = new FormData();
  if (avatar) {
    let parts = avatar.split("/");
    let filename = parts[parts.length - 1];
    parts = filename.split(".");
    formdata.append("avatar", {
      uri: avatar,
      name: `${makeid(60)}.${parts[parts.length - 1]}`,
      type: "multipart/form-data",
    });
  }

  Object.keys(data).map((k) => {
    formdata.append(k, data[k]);
    return k;
  });

  return http.upload(formdata, "/user/" + id + "/", () => null, "put");
}

export default {
  list_user,
};
