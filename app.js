// reading DOM elements
const getTextButton = document.querySelector("#getTextBtn");
const getLocalJsonBtn = document.querySelector("#getLocalJsonBtn");
const getJsonApiBtn = document.querySelector("#getJsonApiBtn");
const output = document.querySelector("#output");
const addTodo = document.querySelector("#addTodo");
const titleInput = document.querySelector("#titleInput");
const doneInput = document.querySelector("#doneInput");

// functions
// FETCH A TEXT FILE ASYNCRONOUSLY
const getText = () => {
  fetch("sample.txt")
    .then((response) => response.text())
    .then((data) => {
      //   console.log(data);
      output.innerHTML = `<p class='lead'> ${data} </p>`;
    })
    .catch((error) => console.log(error));
};

// FETCH A JSON FILE ASYNCRONOUSLY
const getLocalJson = () => {
  fetch("users.json")
    .then((response) => response.json())
    .then((data) => {
      let jsonOutput = `
        <h2 class='mb-4'>Users:</h2> 
        <p class='lead'> This is a sample users list from a local json database.</p>`;
      //   console.log(data);
      data.forEach((user) => {
        jsonOutput += `
            <ul class="list-group list-group-flush mb-3">
                <li class="list-group-item">ID: ${user.id} </li>
                <li class="list-group-item">name: ${user.name} </li>
                <li class="list-group-item">email: ${user.email} </li>
            </ul>
        `;
      });
      // .catch((error) => console.log(error));
      output.innerHTML = jsonOutput;
    });
};

// FETCH A FILE FROM AN OUTSIDE API
const getJsonApi = () => {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data)
      let jsonOutput = `
      <h2 class='mb-4'>To Dos:</h2>
      <p class='lead'> This is a sample todo list from a outside json API.</p>`;
      data.forEach((todo) => {
        jsonOutput += `
                <div class="card card-body mb-3">
                    <h3>Title: ${todo.title}</h3>
                    <h4>${todo.completed === false ? "Pending" : "Done"}<h4>
                </div>
            `;
      });
      // .catch((error) => console.log(error));
      output.innerHTML = jsonOutput;
    })
    .catch((error) => console.log(error));
};

// ADD TO DO TO THE LIST
const addToto = (e) => {
  e.preventDefault();
  let todoTitle = titleInput.value;
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title: todoTitle,
      completed: doneInput.checked ? "done" : "pending",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

// events
getTextButton.onclick = getText;
getLocalJsonBtn.onclick = getLocalJson;
getJsonApiBtn.onclick = getJsonApi;
addTodo.onsubmit = addToto;
