const { default: axios } = require("axios");
const url = "http://localhost:4000";

window.addEventListener("DOMContentLoaded", () => {
  axios.get(`${url}/report`);
});
