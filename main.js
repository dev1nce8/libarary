const listElement = document.getElementById("book-list");
const toggleFormButton = document.getElementById("toggle-form-btn");
const formContainer = document.getElementById("form-cont");
const submitButton = document.getElementById("submit-btn");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const BOOKS = {};

toggleFormButton.addEventListener("click", () => {
  toggleFormDisplay(formContainer, toggleFormButton);
});

submitButton.addEventListener("click", () => {
  if (titleInput.value === "" || titleInput.value === "") {
    alert("Title and Author is required");
    return;
  }
  const title = titleInput.value;
  const author = authorInput.value;
  addBookToLibrary(BOOKS, { title, author });
  displayBooks(listElement, BOOKS);
  toggleFormDisplay(formContainer, toggleFormButton);
});

function toggleFormDisplay(element, controller) {
  const isHidden = element.classList.contains("hidden");
  if (isHidden) {
    controller.textContent = "Close Form";
  } else {
    controller.textContent = "Add Book";
  }
  element.classList.toggle("hidden");
}

function Book(title, author) {
  this.title = title;
  this.author = author;
  this.id = crypto.randomUUID();
  this.read = false;
}

function addBookToLibrary(library, { title, author }) {
  const book = new Book(title, author);
  library[book.id] = book;
}

function removeFromLibrary(library, bookId) {
  delete library[bookId];
}

function toggleReadBook(library, bookId) {
  library[bookId].read = !library[bookId].read;
}

function displayBooks(container, books) {
  container.innerHTML = "";
  for (const key in books) {
    const li = document.createElement("li");
    const buttonsCont = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const readBtn = document.createElement("button");
    const toggleIcon = document.createElement("img");
    li.className = "book";
    const book = books[key];
    li.innerHTML = `
      <h3 class="title">${book.title}</h3>
      <p class="author">by: <span class="author-name">${book.author}</span></p>
    `;
    li.append(buttonsCont);
    buttonsCont.append(readBtn, deleteBtn);

    toggleIcon.width = 24;
    toggleIcon.height = 24;
    toggleIcon.src = book.read
      ? "./asset/toggle-on.svg"
      : "./asset/toggle-off.svg";

    readBtn.innerText = "Read";
    readBtn.className = book.read ? "read-btn read" : "read-btn";
    readBtn.append(toggleIcon);
    readBtn.addEventListener("click", () => {
      toggleReadBook(BOOKS, book.id);
      displayBooks(listElement, BOOKS);
    });

    deleteBtn.textContent = "Remove";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      removeFromLibrary(BOOKS, book.id);
      displayBooks(listElement, BOOKS);
    });

    container.append(li);
  }
}
