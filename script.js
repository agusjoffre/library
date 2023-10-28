const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = isRead;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      isRead ? "finished" : "not read yet!"
    }`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBook();
}

function newBookForm(event) {
  event.preventDefault();
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const pages = document.getElementById("book-pages").value;
  const read = document.getElementById("book-read").checked;
  addBookToLibrary(title, author, pages, read);
}
const submitBtn = document.getElementById("add-book-form");
submitBtn.addEventListener("submit", newBookForm);

function displayBook() {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    let bookTitle = myLibrary[i].title;
    let bookAuthor = myLibrary[i].author;
    let bookPages = myLibrary[i].pages;
    let bookStatus = myLibrary[i].read;
    createBook(bookTitle, bookAuthor, bookPages, bookStatus, i);
  }
}

function createBook(bookTitle, bookAuthor, bookPages, bookStatus, i) {
  const cardAuthor = document.createElement("p");
  const cardPages = document.createElement("p");
  const cardStatus = document.createElement("input");
  const cardTitle = document.createElement("h2");
  const card = document.createElement("div");
  const cardContainer = document.querySelector(".card-container");
  card.classList.add("card");
  cardContainer.appendChild(card);
  card.appendChild(cardTitle);
  card.appendChild(cardAuthor);
  card.appendChild(cardPages);
  cardTitle.innerHTML = bookTitle;
  cardAuthor.innerHTML = `by ${bookAuthor}`;
  cardPages.innerHTML = `${bookPages} pages`;
  cardStatus.type = "checkbox";
  cardStatus.classList.add("card-checkbox")
  cardStatus.checked = bookStatus;
  card.appendChild(cardStatus);

  let removeBtn = document.createElement("button");
  removeBtn.innerHTML = "Remove";
  card.appendChild(removeBtn);
  removeBtn.addEventListener("click", () => {
    myLibrary.splice(i, 1);
    card.remove();
    console.log(
      `${JSON.stringify(myLibrary, null, 2)} MYLIBRARY REMOVED STATUS`
    );
  });

  cardStatus.addEventListener("change", () => {
    if (cardStatus.checked === true) {
      myLibrary[i].read = true;
    } else {
      myLibrary[i].read = false;
    }
    console.log(`${JSON.stringify(myLibrary, null, 2)} MYLIBRARY READ STATUS`);
  });
}
