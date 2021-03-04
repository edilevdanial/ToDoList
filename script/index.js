let btn = document.getElementById("btn");
let InputTitle = document.getElementById("title");
let InputDesc = document.getElementById("desc");
let myUL = document.getElementById("myUL");

let objectId = 0;

window.onkeyup = e => {
	if(e.keyCode === 13)
  enterProduct()
}

const saveDataToTemplate = (obj, id, title, desc) => {
  return `<div id="template-${obj.id || id}" class="template-app">
    <div class="title-${obj.id || id} template-header">
            <h2 id="title-${obj.id || id}">${obj.title || title}</h2>
            <button onclick="deleteList(${obj.id || id})">x</button>
    </div>
    <div class="desc-${obj.id || id}>
        <h2 id="desc-${obj.id || id}">${obj.desc || desc}</h2>
    </div>
    </div>`;
}

const saveToLocalStorage = (object = []) => {
  obj.push(object);
  localStorage.setItem("id", JSON.stringify(obj));
}

const enterProduct = (id, title, desc) => {
  if (InputDesc.value && InputTitle.value && InputDesc.value.trim() &&
  InputTitle.value.trim()) {
      objectId++;
      let todoObj = new TodoObject(objectId, InputTitle.value, InputDesc.value);
      InputTitle.value = InputDesc.value = "";
      saveToLocalStorage(todoObj);
      myUL.innerHTML += saveDataToTemplate(todoObj);
  } else if (id, title, desc) {
    objectId = id;
    myUL.innerHTML += saveDataToTemplate("", id, title, desc);
  }
}

btn.addEventListener("click", enterProduct);

class TodoObject {
  constructor(id, title, desc){
  this.id = id;
  this.title = title;
  this.desc = desc;
  }
}

obj = JSON.parse(localStorage.getItem("id"));
if (obj) {
  obj.forEach(element => {
    enterProduct(element.id, element.title, element.desc);
  });
} else {
  localStorage.setItem("id", JSON.stringify([]));
}

const deleteList = id => {
  obj = JSON.parse(localStorage.getItem("id"));
  for (let index = 0; index < obj.length; index++) {
    if (obj[index].id === id) {
      obj.splice(index, 1);
    }
  }
  localStorage.setItem("id", JSON.stringify(obj));
  let child = document.getElementById(`template-${id}`);
  myUL.removeChild(child);
}
