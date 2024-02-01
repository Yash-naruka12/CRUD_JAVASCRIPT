function setData(userData) {
  let existingData = JSON.parse(localStorage.getItem("userData")) || [];
  existingData.push(userData);
  localStorage.setItem("userData", JSON.stringify(existingData));
}

function displayData() {
  let displayUserData = JSON.parse(localStorage.getItem("userData")) || [];
  const table = document.getElementById("tbl");
  let tbody = table.querySelector("tbody");

  if (tbody) {
    table.removeChild(tbody);
  }

  tbody = document.createElement("tbody");
  table.appendChild(tbody);

  displayUserData.forEach((item) => {
    const createRow = document.createElement("tr");
    tbody.appendChild(createRow);
    createRow.innerText = "";
    const id = item.generateId;

    createRow.innerHTML = `
    <td>${item.name}</td>
    <td>${item.email}</td>
    <td>${item.address}</td>
    <td>${item.mobile}</td>
    <td><button onclick="(editItems(${id}))">Edit</button></td>
    <td><button onclick="(deleteItems(${id}))">Delete</button></td>
    `;
  });
}

function deleteItems(generateId) {
  let userData = JSON.parse(localStorage.getItem("userData")) || [];

  let index = userData.findIndex((item) => item.generateId === generateId);

  if (index !== -1) {
    userData.splice(index, 1);
    localStorage.setItem("userData", JSON.stringify(userData));
    displayData();
  }
}

function editItems(dataId) {
  let userData = JSON.parse(localStorage.getItem("userData")) || [];
  let index = userData.findIndex((item) => item.generateId === dataId);

  if (index !== -1) {
    let updateName = prompt("Enter updated name", userData[index].name);
    let updateEmail = prompt("Enter updated email", userData[index].email);
    let updateAddress = prompt(
      "Enter updated address",
      userData[index].address
    );
    let updateMobile = prompt("Enter updated mobile", userData[index].mobile);

    let updatedValue = {
      ...userData[index],
      name: updateName,
      email: updateEmail,
      address: updateAddress,
      mobile: updateMobile,
    };

    userData.splice(index, 1, updatedValue);
    localStorage.setItem("userData", JSON.stringify(userData));
    displayData();
  }
}

document.getElementById("onSubmit").addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let mobile = document.querySelector(".mobile").value;
  let address = document.querySelector(".address").value;
  let generateId = new Date().getTime();

  let userData = {
    generateId,
    name: name,
    email: email,
    address: address,
    mobile: mobile,
  };

  setData(userData);
  displayData();
  e.target.reset();
});

// Note: You might want to call displayData() after the page is fully loaded, or use an event listener for the 'DOMContentLoaded' event.
displayData();
