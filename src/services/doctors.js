import client from "./axios";

export const getDoctors = () =>
  client.request({
    url: "/doctor",
    method: "GET",
  });

export const postDoctor = (data) =>
  client.request({
    url: "/doctor",
    method: "POST",
    data,
  });
