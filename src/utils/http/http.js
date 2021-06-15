import axios from "axios";
import { getUser } from "../userStorage";

export const ApiUrl = "http://185.169.94.130:1337";
const apiEndPoint = ApiUrl;
export const resetPasswordUrl = apiEndPoint + "/password_reset/";

function getUrl(url) {
  return apiEndPoint + url;
}

async function get(url, options = {}) {
  options = getOptions(options);
  return axios.get(getUrl(url), options).then((res) => res);
}
async function deleteItem(url, options = {}) {
  options = getOptions(options);
  return axios.delete(getUrl(url), options).then((res) => res);
}

async function post(url, data, options = {}) {
  options = getOptions(options);
  return axios.post(getUrl(url), data, options).then((res) => res);
}
async function put(url, data, options = {}) {
  options = getOptions(options);
  return axios.put(getUrl(url), data, options).then((res) => res);
}
function getOptions(options) {
  const data = getUser();
  if (data?.jwt) {
    if (!options.headers) options.headers = {};
    options.headers["Authorization"] = `Bearer ${data.jwt}`;
  }
  return options;
}
function upload(data, route, method = "post") {
  FormData = new FormData();
  Object.keys(data).map();
  const config = getOptions({
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (method === "post") return post(route, data, config);

  return put(route, data, config);
}

export function makeid(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default {
  get,
  put,
  post,
  delete: deleteItem,
  upload,
};
