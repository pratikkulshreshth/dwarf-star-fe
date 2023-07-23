import client from "./axios";

export const getDoctors = () =>
  client.request({
    url: "/doctor",
    method: "GET",
  });
