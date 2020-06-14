const APP_STORAGE_KEY = "123456544GGGFGGFFFGFGFGFG";
const USER_STORAGE_KEY = "12345654DBGFHRGGSGSG";
const SCAN_STORAGE_KEY = "DHDGGVS";

export function getUser() {
  return getData(USER_STORAGE_KEY, { token: null, user: {} });
}
export function setUser(user) {
  setData(USER_STORAGE_KEY, user);
}
export function unsetUser() {
  deleteData(USER_STORAGE_KEY);
}
export function getData(key, defaultValue = null) {
  try {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
  } catch (e) {
    return defaultValue;
  }

  return defaultValue;
}
export function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function deleteData(key) {
  localStorage.removeItem(key);
}

export function add_scan_to_storage(scan) {
  const data = list_scan_from_storage();
  data.push(scan);
  setData(SCAN_STORAGE_KEY, data);
}
export function edit_scan_to_storage(scan) {
  const data = list_scan_from_storage();
  const index = data.findIndex((d) => d.id === scan.id);
  data[index] = { ...data[index], ...scan };

  setData(SCAN_STORAGE_KEY, data);
}
export function list_scan_from_storage() {
  return getData(SCAN_STORAGE_KEY, []);
}
export function clear_scan_from_storage() {
  deleteData(SCAN_STORAGE_KEY);
}
const storage = {
  setUser,
  getUser,
};

function getAll() {
  return getData(APP_STORAGE_KEY, {});
}
function add(key, value) {
  const data = getAll();
  data[key] = value;
  setData(APP_STORAGE_KEY, data);
}
function get(key, defaultValue = null) {
  const data = getAll();
  return data[key] !== undefined ? data[key] : defaultValue;
}
function unset(key) {
  const data = getAll();
  delete data[key];
  setData(APP_STORAGE_KEY, data);
}
export const app = {
  getAll,
  add,
  unset,
  get,
  keys: {
    FirstLunch: "first_lunch",
    sort: "sort",
  },
};

export default storage;
