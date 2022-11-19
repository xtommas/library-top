let myLibrary = [];


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function seeBooks() {
     for (let i = 0; i < myLibrary.length; i++){
        console.log(myLibrary[i].read);
     }
}

function fooBooks(){
    let newBook = new Book('A Study in Scarlet', 'Arthur Conan Doyle', 114, true);
    let newBook2 = new Book('The Art of War', 'Sun Tzu', 288, false);
    myLibrary.push(newBook);
    myLibrary.push(newBook2);
}

function addBookToLibrary() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.querySelector('.readCheckbox').checked;

    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    title.value = '';
    author.value = '';
    pages.value = '';
    document.querySelector('.readCheckbox').checked = false;

    seeBooks();
    displayBooks();
}

function displayBooks() {
    const container = document.getElementsByClassName('container');
    container[0].innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++){
        // Create a card div
        let card = document.createElement('div');
        card.className = 'card';

        let close = document.createElement('button');
        close.className = 'deleteButton';
        close.textContent = 'x';

        let title = document.createElement('p');
        title.className = 'bookTitle';

        let author = document.createElement('p');
        author.className = 'bookAuthor';

        let pages = document.createElement('p');
        pages.className = 'bookPages';

        let readArea = document.createElement('div')
        readArea.className = 'readArea';

        let readLabel = document.createElement('p');
        readLabel.className = 'bookRead';
        readLabel.innerHTML = "Read:";

        let toggle = document.createElement('label');
        toggle.className = 'switch';

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        let span = document.createElement('span');
        span.className = 'slider round';

        // Create the content of the card by getting it from the current object in the array
        title.innerHTML = myLibrary[i].title;
        author.innerHTML = 'By: ' + myLibrary[i].author;
        pages.innerHTML = myLibrary[i].pages + ' pages';
        checkbox.checked = myLibrary[i].read;

        // append the newly ceated card div to the .container div in the html
        card.appendChild(close);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);

        readArea.appendChild(readLabel);
        toggle.appendChild(checkbox);
        toggle.appendChild(span);
        readArea.appendChild(toggle);
        card.appendChild(readArea);
        
        //const container = document.getElementsByClassName('container');
        container[0].appendChild(card);
    }

    const closeButtons = document.getElementsByClassName('deleteButton');
    for (let i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', function() {
            const title = closeButtons[i].nextElementSibling.textContent;
            deleteBook(title);
        });
    }

    const readButtons = document.querySelectorAll('input[type=checkbox]');
    for (let i = 0; i < readButtons.length; i++){
        readButtons[i].addEventListener('click', function() {
            let title = readButtons[i].parentNode.parentNode.previousSibling.previousSibling.previousSibling.textContent;
            changeReadStatus(title);
        });
    }

}

function changeReadStatus(title){
    for(let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].title === title){
            myLibrary[i].read = !myLibrary[i].read;
            break;
        }
    }
    displayBooks();
}

function deleteBook(title){
    for(let i = 0; i < myLibrary.length; i++){
        if (myLibrary[i].title === title){
            myLibrary.splice(i, 1);
            break;
        }
    }
    displayBooks();
}

// Main

fooBooks();
displayBooks();
const form = document.getElementById("newBookForm");
form.addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary();
    closeModal();
});

// Modal window stuff

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