import client from "./axios";

export const getPatients = () =>
  client.request({
    url: "/patient",
    method: "GET",
  });
