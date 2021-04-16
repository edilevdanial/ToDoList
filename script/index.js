let btn = document.getElementById("btn");
let InputTitle = document.getElementById("title");
let InputDesc = document.getElementById("desc");
let myUL = document.getElementById("myUL");
let search = document.getElementById("search");
let searchBtn = document.getElementById("search-btn");

let objectId = 0;
let date = new Date();

window.onkeyup = (e) => {
  if (e.keyCode === 13) enterProduct();
};

const searchEl = () => {
  console.log(search.value)
  let data = JSON.parse(localStorage.getItem("id"));
  let check = false;
  if (search.value && search.value.trim()) {
    data.forEach( element => {
      let date = [...element.date]
      console.log(data);
      // не добавил правильного поиска с датой и надо сделать без кнопки
      if (
        search.value === element.title ||
        search.value === element.desc ||
        search.value === element.date
      ) {
        debugger
        check = true;
        myUL.innerHTML = "";
        myUL.innerHTML += saveDataToTemplate(element);
      }else if(!check){
        myUL.innerHTML = "";
      }
    });
  }else if(myUL.innerHTML === "") {

    debugger
    data.forEach((element) => {
      enterProduct(element.id, element.title, element.desc);
    });
  }
  
  search.value = "";
};

searchBtn.addEventListener("click", searchEl);

const saveDataToTemplate = (obj, id, title, desc) => {
  return `<div id="template-${obj.id || id}" class="template-app">
    <div class="title-${obj.id || id} template-header">
            <div style="display:flex;">
            <p>Title:</p>
            <h4 id="title-${obj.id || id}">${obj.title || title}</h4>
            </div>
            <div>
            <button class="template__btn" onclick="deleteList(${
              obj.id || id
            })">x</button>
              </div>
            </div>
    <div class="desc-${obj.id || id}" style="display:flex;">
        <p>Description:</p>
        <h4 id="desc-${obj.id || id}">${obj.desc || desc}</h4>
    </div>
    <div class="template__date">
    <h4>Дата Добавления:${date.toDateString()}</h4> 
    </div>
    </div>`;
};

const saveToLocalStorage = (object = []) => {
  obj.push(object);
  localStorage.setItem("id", JSON.stringify(obj));
};

const enterProduct = (id, title, desc) => {
  if (
    InputDesc.value &&
    InputTitle.value &&
    InputDesc.value.trim() &&
    InputTitle.value.trim()
  ) {
    objectId++;
    let todoObj = new TodoObject(
      objectId,
      InputTitle.value,
      InputDesc.value,
      date.toDateString()
    );
    InputTitle.value = InputDesc.value = "";

    saveToLocalStorage(todoObj);
    
    let htmlTemplate = saveDataToTemplate(todoObj); 
    myUL.insertAdjacentHTML("afterbegin",htmlTemplate)
  } else if ((id, title, desc)) {
    objectId = id;
    let htmlTemplate = saveDataToTemplate("", id, title, desc); 
    myUL.insertAdjacentHTML("afterbegin",htmlTemplate)
  }
};

btn.addEventListener("click", enterProduct);

class TodoObject {
  constructor(id, title, desc, date) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.date = date;
  }
}

obj = JSON.parse(localStorage.getItem("id"));
if (obj) {
  obj.forEach((element) => {
    enterProduct(element.id, element.title, element.desc);
  });
} else {
  localStorage.setItem("id", JSON.stringify([]));
}

const deleteList = (id) => {
  obj = JSON.parse(localStorage.getItem("id"));
  for (let index = 0; index < obj.length; index++) {
    if (obj[index].id === id) {
      obj.splice(index, 1);
    }
  }
  localStorage.setItem("id", JSON.stringify(obj));
  let child = document.getElementById(`template-${id}`);
  myUL.removeChild(child);
};

let ford = {
  model: "Ford X244",
  year: 2018,
};
console.log(ford);

let arr = [12, 24, 24].map((elemetn) => {
  if (elemetn % 2 === 0) {
    return Math.sqrt(elemetn).toFixed(0);
  }
});
console.log(arr);
