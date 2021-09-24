export const environment = {
  production: true,
  apiUrl: window["env"]["apiUrl"] || "http://localhost:5000/",
  apiUrlWebSocket: window["env"]["apiUrlWebSocket"] || "http://localhost:3000/"
};
