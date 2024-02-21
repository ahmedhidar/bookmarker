var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var addBtn = document.getElementById("addBtn");
var tableBody = document.getElementById("tableBody");
var theIndex = 0;
var bookMarks;
if(localStorage.getItem("bookMarks")==null){
    bookMarks= [];
}else{
    bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
    displayBookMark(bookMarks);
}

var nameRegex = /^[A-Za-z_]{1,}$/;
function nameValidation(){
    if(nameRegex.test(nameInput.value)){
        return true;
    }else{
        return false;
    }
}
var urlRegex = /^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/;
function urlValidation(){
    if(urlRegex.test(urlInput.value)){
        return true;
    }else{
        return false;
    }
}

nameInput.onkeyup = function(){
    if(urlValidation() &&nameValidation()){
        addBtn.removeAttribute("disabled")
    }else{
        addBtn.disabled = true;
    }
}
urlInput.onkeyup = function(){
    if(urlValidation() &&nameValidation() ){
        addBtn.removeAttribute("disabled")
    }else{
        addBtn.disabled = true;
    }
}


addBtn.onclick = function(){
    if(addBtn.innerHTML=="update"){
    addBtn.innerHTML = "submit";
    addBtn.classList.replace("btn-warning","btn-primary");
    var bookMark = {
        name : nameInput.value,
        url : urlInput.value
    };
    bookMarks.splice(theIndex,1,bookMark);
    }else {
    var bookMark = {
        name : nameInput.value,
        url : urlInput.value
    }
    bookMarks.push(bookMark);
    console.log(bookMarks);
}
    localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
    displayBookMark(bookMarks);
    clearData();
}

function displayBookMark(displayArray){
    var cartoona = ``
    for(var i = 0;i<displayArray.length; i++){
        cartoona += `
        <tr>
        <td>${displayArray[i].name}</td>
        <td><a href="${displayArray[i].url}"><button class="btn btn-primary">visit</button></a></td>
        <td><button onclick="updateBookMark(${i})" class="btn btn-warning">update</button></></td>
        <td><button onclick="deleteBookMark(${i})" class="btn btn-danger">delete</button></></td>
        </tr>
        `
    }
    tableBody.innerHTML = cartoona;
}
function deleteBookMark(index){
bookMarks.splice(index,1);
localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
displayBookMark(bookMarks);
}
function clearData (){
    nameInput.value=""
    urlInput.value=""
}
function updateBookMark(index){
nameInput.value =bookMarks[index].name;
urlInput.value =bookMarks[index].url;
addBtn.innerHTML = "update";
addBtn.classList.replace("btn-primary","btn-warning");
theIndex = index;
}

function search(term){
    var searched = [];
    for(var i = 0 ; i < bookMarks.length;i++){
        if(bookMarks[i].name.toLowerCase().includes(term)){
            searched.push(bookMarks[i])
        }
    }
    displayBookMark(searched)
}