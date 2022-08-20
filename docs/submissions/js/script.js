const books = [];
const searchArray = [];
const SAVE_BOOK = "save-book";
const RENDER_BOOK = "render-book";
const RENDER_SEARCH = "render-search";
const BOOK_DATA = "book-data";

const isWebStorageExist = () => {
  if (typeof Storage === undefined) {
    console.log("Your Browser didn't support Web Storage");
    return false;
  }
  return true;
};

document.addEventListener(SAVE_BOOK, () => {
  console.log("Data already saved in Local Storage");
});

document.addEventListener(RENDER_BOOK, () => {
  const unreadBooks = document.querySelector("#book-unread-boxes");
  unreadBooks.innerHTML = "";

  const readBooks = document.querySelector("#book-read-boxes");
  readBooks.innerHTML = "";

  const deleteBooks = document.querySelector("#book-deleted-boxes");
  deleteBooks.innerHTML = "";

  for (book of books) {
    const bookElement = makeBook(book);
    if (book.isComplete === true) {
      readBooks.append(bookElement);
    } else if (book.isComplete === false) {
      unreadBooks.append(bookElement);
    } else if (book.isComplete === "deleted") {
      deleteBooks.append(bookElement);
    }
  }
});

document.addEventListener(RENDER_SEARCH, () => {
  const unreadBooks = document.querySelector("#book-unread-boxes");
  unreadBooks.innerHTML = "";

  const readBooks = document.querySelector("#book-read-boxes");
  readBooks.innerHTML = "";

  const deleteBooks = document.querySelector("#book-deleted-boxes");
  deleteBooks.innerHTML = "";

  for (searchData of searchArray) {
    const bookElement = makeBook(searchData);
    if (searchData.isComplete === true) {
      readBooks.append(bookElement);
    } else if (searchData.isComplete === false) {
      unreadBooks.append(bookElement);
    } else if (searchData.isComplete === "deleted") {
      deleteBooks.append(bookElement);
    }
  }
});

const generateID = () => {
  return +new Date();
};

const generateBookObject = (id, title, author, year, isComplete) => {
  return { id, title, author, year, isComplete };
};

const addBook = () => {
  const generatedID = generateID();
  const bookTitle = document.querySelector("#book-input-title").value;
  const bookWriter = document.querySelector("#book-input-writer").value;
  const bookYear = document.querySelector("#book-input-year").value;
  const bookRead = document.querySelector("#read-checked").checked
    ? true
    : false;

  const bookObject = generateBookObject(
    generatedID,
    bookTitle,
    bookWriter,
    bookYear,
    bookRead
  );

  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_BOOK));
  saveToWebStorage();
};

document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.querySelector("#book-input-form");
  const submitSearch = document.querySelector("#book-search-form");
  submitForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    addBook();
    document.querySelector("#book-input-title").value = "";
    document.querySelector("#book-input-writer").value = "";
    document.querySelector("#book-input-year").value = "";
  });
  submitSearch.addEventListener("submit", (ev) => {
    const searchValue = document.querySelector("#search-type").value;
    const searchQuery = document.querySelector("#search-input").value;
    ev.preventDefault();
    searchBooks(searchValue, searchQuery);
  });

  if (isWebStorageExist()) {
    loadDataFromWebStorage();
  }
});

const findBooks = (booksID) => {
  for (const bookItem of books) {
    if (bookItem.id === booksID) {
      return bookItem;
    }
  }
  return null;
};

const findBooksIndex = (booksID) => {
  for (const index in books) {
    if (books[index].id === booksID) {
      return index;
    }
  }
  return -1;
};

const searchBooks = (type, query) => {
  searchArray.splice(0, searchArray.length);
  let searchFilter = null;
  if (type === "title") {
    searchFilter = books.filter((book) => book.title.includes(query));
  } else if (type === "author") {
    searchFilter = books.filter((book) => book.author.includes(query));
  } else if (type === "year") {
    searchFilter = books.filter((book) => book.year.includes(query));
  } else {
    console.log("Please Select Type of Data Search First");
  }

  if (searchFilter !== null) {
    for (i = 0; i < searchFilter.length; i++) {
      searchArray.push(searchFilter[i]);
    }
  } else {
    console.log("Data Null");
  }

  document.dispatchEvent(new Event(RENDER_SEARCH));
};

const addBooksToRead = (booksID) => {
  const bookTarget = findBooks(booksID);
  if (bookTarget === null) return;
  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_BOOK));
  saveToWebStorage();
};

const removeBooksFromRead = (booksID) => {
  const bookTarget = findBooks(booksID);
  if (bookTarget === null) return;
  bookTarget.isComplete = "deleted";
  document.dispatchEvent(new Event(RENDER_BOOK));
  saveToWebStorage();
};

const destroyBooksFromDeleted = (booksID) => {
  const dialogModal = document.querySelector("#dialog");
  const dialogTitle = document.querySelector("#book-delete-title");
  const confirmModal = document.querySelector("#success");
  const bookTarget = findBooksIndex(booksID);
  const bookTitle = findBooks(booksID);

  const btnYes = document.querySelector("#btn-delete-yes");
  const btnNo = document.querySelector("#btn-delete-no");
  const btnConfirm = document.querySelector("#btn-confirm");

  dialogTitle.innerText = `Do You Want to Delete Book "${bookTitle.title}" ?`;
  dialogModal.style.display = "block";

  btnNo.addEventListener("click", () => {
    dialogModal.style.display = "none";
    document.dispatchEvent(new Event(RENDER_BOOK));
    saveToWebStorage();
  });

  btnYes.addEventListener("click", () => {
    if (bookTarget === -1) return;
    books.splice(bookTarget, 1);
    dialogModal.style.display = "none";
    confirmModal.style.display = "block";
  });

  btnConfirm.addEventListener("click", () => {
    confirmModal.style.display = "none";
    document.dispatchEvent(new Event(RENDER_BOOK));
    saveToWebStorage();
  });

  document.dispatchEvent(new Event(RENDER_BOOK));
  saveToWebStorage();
};

const returnBooksToUnread = (booksID) => {
  const bookTarget = findBooks(booksID);
  if (bookTarget === null) return;
  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_BOOK));
  saveToWebStorage();
};

const undoReadBooks = (booksID) => {
  const bookTarget = findBooks(booksID);
  if (bookTarget === null) return;
  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_BOOK));
  saveToWebStorage();
};

const makeBook = (bookObject) => {
  const bookTitle = document.createElement("h2");
  bookTitle.classList.add("book-title");
  bookTitle.innerText = bookObject.title;

  const bookWriter = document.createElement("p");
  bookWriter.classList.add("book-details");
  bookWriter.innerText = `Book Author : ${bookObject.author}`;

  const bookYear = document.createElement("p");
  bookYear.classList.add("book-details");
  bookYear.innerText = `Book Year : ${bookObject.year}`;

  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book-container");
  bookContainer.append(bookTitle, bookWriter, bookYear);
  bookContainer.setAttribute("id", `book-${bookObject.id}`);

  if (bookObject.isComplete === true) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("action");
    const undoIcon = document.createElement("iconify-icon");
    undoIcon.setAttribute("icon", "ant-design:undo-outlined");
    const undoText = document.createElement("p");
    undoText.innerText = "Undo";
    undoButton.append(undoIcon, undoText);

    undoButton.addEventListener("click", () => {
      undoReadBooks(bookObject.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("action");
    const deleteIcon = document.createElement("iconify-icon");
    deleteIcon.setAttribute("icon", "ant-design:delete-outlined");
    const deleteText = document.createElement("p");
    deleteText.innerText = "Send to Bin";
    deleteButton.append(deleteIcon, deleteText);

    deleteButton.addEventListener("click", () => {
      removeBooksFromRead(bookObject.id);
    });

    const destroyButton = document.createElement("button");
    destroyButton.classList.add("action");
    const destroyIcon = document.createElement("iconify-icon");
    destroyIcon.setAttribute("icon", "ant-design:delete-outlined");
    const destroyText = document.createElement("p");
    destroyText.innerText = "Destroy Book";
    destroyButton.append(destroyIcon, destroyText);

    destroyButton.addEventListener("click", () => {
      destroyBooksFromDeleted(bookObject.id);
    });

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("form-input-flat");
    buttonDiv.classList.add("flex-center");
    buttonDiv.append(undoButton, deleteButton, destroyButton);

    bookContainer.append(buttonDiv);
  } else if (bookObject.isComplete === false) {
    const checkButton = document.createElement("button");
    checkButton.classList.add("action");
    const checkIcon = document.createElement("iconify-icon");
    checkIcon.setAttribute("icon", "ant-design:check-outlined");
    const checkText = document.createElement("p");
    checkText.innerText = "Read";
    checkButton.append(checkIcon, checkText);

    checkButton.addEventListener("click", () => {
      addBooksToRead(bookObject.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("action");
    const deleteIcon = document.createElement("iconify-icon");
    deleteIcon.setAttribute("icon", "ant-design:delete-outlined");
    const deleteText = document.createElement("p");
    deleteText.innerText = "Send to Bin";
    deleteButton.append(deleteIcon, deleteText);

    deleteButton.addEventListener("click", () => {
      removeBooksFromRead(bookObject.id);
    });

    const destroyButton = document.createElement("button");
    destroyButton.classList.add("action");
    const destroyIcon = document.createElement("iconify-icon");
    destroyIcon.setAttribute("icon", "ant-design:delete-outlined");
    const destroyText = document.createElement("p");
    destroyText.innerText = "Destroy Book";
    destroyButton.append(destroyIcon, destroyText);

    destroyButton.addEventListener("click", () => {
      destroyBooksFromDeleted(bookObject.id);
    });

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("form-input-flat");
    buttonDiv.classList.add("flex-center");
    buttonDiv.append(checkButton, deleteButton, destroyButton);

    bookContainer.append(buttonDiv);
  } else if (bookObject.isComplete === "deleted") {
    const returnButton = document.createElement("button");
    returnButton.classList.add("action");
    const returnIcon = document.createElement("iconify-icon");
    returnIcon.setAttribute("icon", "ant-design:rollback-outlined");
    const returnText = document.createElement("p");
    returnText.innerText = "Return Book";
    returnButton.append(returnIcon, returnText);

    returnButton.addEventListener("click", () => {
      returnBooksToUnread(bookObject.id);
    });

    const destroyButton = document.createElement("button");
    destroyButton.classList.add("action");
    const destroyIcon = document.createElement("iconify-icon");
    destroyIcon.setAttribute("icon", "ant-design:delete-outlined");
    const destroyText = document.createElement("p");
    destroyText.innerText = "Destroy Book";
    destroyButton.append(destroyIcon, destroyText);

    destroyButton.addEventListener("click", () => {
      destroyBooksFromDeleted(bookObject.id);
    });

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("form-input-flat");
    buttonDiv.classList.add("flex-center");
    buttonDiv.append(returnButton, destroyButton);

    bookContainer.append(buttonDiv);
  }

  return bookContainer;
};

const saveToWebStorage = () => {
  if (isWebStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(BOOK_DATA, parsed);
    document.dispatchEvent(new Event(SAVE_BOOK));
  }
};

const loadDataFromWebStorage = () => {
  const fetchData = localStorage.getItem(BOOK_DATA);
  let data = JSON.parse(fetchData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_BOOK));
};
