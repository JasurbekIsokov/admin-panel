import axios from "axios";
import { getToken } from "../utilits";

export const host = "http://213.230.99.101:2027";
export function httpRequest(config) {
  return axios({
    ...config,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "Application/json",
      Authorization: getToken() ? `Bearer ` + getToken() : "",
    },
  });
}
