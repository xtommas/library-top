let mylibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector("#newButton");
const closeModalBtn = document.querySelector(".closeModal");

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};  

openModalBtn.addEventListener("click", openModal);

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

overlay.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);