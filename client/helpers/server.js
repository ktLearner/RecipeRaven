import axios from "axios";

export function getServer(...path) {
  return "http://localhost:3000/" + path.join("/");
}

export const server = axios.create({
  baseURL: getServer(),
  withCredentials: true,
  timeout: 3e3
});