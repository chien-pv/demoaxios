import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import axios from "axios";

const axios_ins = axios.create({
  baseURL: "https://demoes62-default-rtdb.firebaseio.com",
});

async function handleEditClick() {
  // console.log(this.id);
  let id = this.id;

  let respone = await axios_ins.get(`/users/${id}.json`);
  console.log(respone.data);
  let { name, email } = respone.data;

  document.getElementById("ipname").value = name;
  document.getElementById("ipemail").value = email;
  document.getElementById("ipid").value = id;
}

function buildTR(user, key) {
  return `<tr>
  <th scope="row">${key}</th>
  <td>${user.name}</td>
  <td>${user.email}</td>
  <td><button  id="${key}" type="button" class="btn btn-outline-warning btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
  </td>
</tr>`;
}
async function getallUser() {
  let respone = await axios_ins.get("/users.json");
  let data = respone.data;
  let trstring = "";
  console.log(data);

  // for (const { item } of data) {
  //   console.log(key);
  //   if (Object.hasOwnProperty.call(data, key)) {
  //     // const element = data[key];
  //     console.log(key);

  //     // trstring += buildTR(element, key);
  //   }
  // }
  data.forEach((element, key) => {
    console.log(key);
    if (element) {
      trstring += buildTR(element, key);
    }
  });

  document.getElementById("tbodyuser").innerHTML = trstring;
  handlebtnEdit();
}
getallUser();

function handlebtnEdit() {
  let arr = document.getElementsByClassName("btn-edit");
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    element.onclick = handleEditClick;
  }
}

document.getElementById("btn-save").onclick = async function () {
  let name = document.getElementById("ipname").value;
  let email = document.getElementById("ipemail").value;
  let id = document.getElementById("ipid").value;
  let user = { name, email };
  console.log(id);

  let respone = await axios_ins.patch(`/users/${id}.json`, user);
  let data = respone.data;
  console.log(data);
};
