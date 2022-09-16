const token = localStorage.getItem("token");

const url = "http://localhost:4000";

// window.addEventListener("DOMContentLoaded", async () => {
//   await axios
//     .get(`${url}/report`, {
//       headers: { authorization: token },
//     })
//     .then((result) => {
//       console.log(result.data);
//     });
// });

async function downloadbtn() {
  const done = await axios
    .get(`${url}/download`, {
      headers: { authorization: token },
    })
    .then((response) => {
      console.log(response, "response");
      if (response.status === 200) {
        const link = document.getElementById("link");

        var anchorTag = document.createElement("a");
        anchorTag.href = response.data.fileUrl;
        anchorTag.innerHTML = "Click on link to download the file";
        link.appendChild(anchorTag);
      } else {
        console.log("response.data.message");
      }
    })
    .catch((err) => {
      console.log("errrr:", err.status);
    });
}
