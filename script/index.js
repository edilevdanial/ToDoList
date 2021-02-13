let btn = document.getElementById("btn");
let InputTitle = document.getElementById("title");
let InputDesc = document.getElementById("desc");
let myUL = document.getElementById("myUL");
let deleteLets = document.getElementById("delete");
let objectId = 0;
obj = JSON.parse(localStorage.getItem("id"));
if (obj) {
  for (let index = 0; index < obj.length; index++) {
    enterProduct(obj[index].id, obj[index].title, obj[index].desc);
    console.log(obj[index]);
  }
} else {
  localStorage.setItem("id", JSON.stringify([]));
}
btn.addEventListener("click", enterProduct);

function enterProduct(id, title, desc) {
  if (InputDesc.value && InputTitle.value) {
    let todo = {
      id: 0,
      title: title,
      desc: desc,
    };
    if (
      InputTitle.value &&
      InputTitle.value.trim() &&
      InputDesc.value &&
      InputDesc.value.trim()
    ) {
      objectId++;
      todo.id = objectId;
      todo.title = InputTitle.value;
      todo.desc = InputDesc.value;
      InputTitle.value = "";
      InputDesc.value = "";
      saveToArr(todo);
      myUL.innerHTML += saveDatatoTemplate(todo);
    }
  } else {
    objectId = id;
    myUL.innerHTML += `<div id="template-${id}" class="template-app">
        <div class="title-${id} template-header">
                <h2 id="title-${id}">${title}</h2>
                <button onclick="deleteList(${id})">x</button>
        </div>
        <div class="desc-${id}>
            <h2 id="desc-${id}">${desc}</h2>
        </div>
        </div>`;
  }
}

function deleteList(id) {
  obj = JSON.parse(localStorage.getItem("id"));
  for (let index = 0; index < obj.length; index++) {
    if (obj[index].id == id) {
      obj.splice(index, 1);
    }
  }
  localStorage.setItem("id", JSON.stringify(obj));
  let child = document.getElementById("template-" + id);
  myUL.removeChild(child);
}

function saveToArr(object) {
  obj = obj || [];
  obj.push(object);
  localStorage.setItem("id", JSON.stringify(obj));
}
function saveDatatoTemplate(obj) {
  return `<div id="template-${obj.id}" class="template-app">
    <div class="title-${obj.id} template-header">
            <h2 id="title-${obj.id}">${obj.title}</h2>
            <button onclick="deleteList(${obj.id})">x</button>
    </div>
    <div class="desc-${obj.id}>
        <h2 id="desc-${obj.id}">${obj.desc}</h2>
    </div>
    </div>`;
}
