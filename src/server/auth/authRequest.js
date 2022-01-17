import { host, httpRequest } from "../host";
import { deleteLocalStorage } from "../../utilits";
import React from "react";
import { Link, Redirect } from "react-router-dom";

export let signin = (data) => {
  let config = {
    url: `${host}/api/auth/signin`,
    method: "post",
    data: data,
  };
  return httpRequest(config);
};

export let signOut = () => {
  deleteLocalStorage("token");
  window.location.reload();
};

export let authMe = () => {
  let config = {
    url: `${host}/api/auth/me`,
    method: "get",
  };
  return httpRequest(config);
};
