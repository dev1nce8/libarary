const listElement = document.getElementById("book-list");
const BOOKS = {};

//addBookToLibrary(BOOKS, { title: "first book", author: "me" });
//addBookToLibrary(BOOKS, { title: "second book", author: "me" });
//addBookToLibrary(BOOKS, { title: "third book", author: "me" });
//displayBooks(listElement, BOOKS);

function Book(title, author) {
  this.title = title;
  this.author = author;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(library, { title, author }) {
  const book = new Book(title, author);
  library[book.id] = book;
}

function displayBooks(container, books) {
  for (const key in books) {
    const li = document.createElement("li");
    li.setAttribute("class", "book");
    const book = books[key];
    li.innerHTML = `
									<p>${book.title}</p>
									<small>${book.author}</small>
									`;
    container.append(li);
  }
}
