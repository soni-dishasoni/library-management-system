// Store books in an array
let books = JSON.parse(localStorage.getItem("books")) || [];

// Add a new book
function addBook() {
    let title = document.getElementById("bookTitle").value.trim();
    let author = document.getElementById("bookAuthor").value.trim();

    if (title === "" || author === "") {
        alert("Please enter both book title and author!");
        return;
    }

    let book = {
        id: Date.now(),
        title: title,
        author: author,
        issued: false
    };

    books.push(book);

    saveBooks();

    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";

    displayBooks();
}

// Save books in browser storage
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

// Display all books
function displayBooks() {
    let bookList = document.getElementById("bookList");
    let search = document.getElementById("searchInput").value.toLowerCase();

    bookList.innerHTML = "";

    let filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search)
    );

    if (filteredBooks.length === 0) {
        bookList.innerHTML = "<p>No books found.</p>";
        return;
    }

    filteredBooks.forEach(book => {
        bookList.innerHTML += `
            <div class="book-item">
                <div>
                    <h3>${book.title}</h3>
                    <p>Author: ${book.author}</p>
                    <p>Status: ${book.issued ? "Issued" : "Available"}</p>
                </div>

                <div>
                    <button class="status-btn"
                        onclick="toggleStatus(${book.id})">
                        ${book.issued ? "Return" : "Issue"}
                    </button>

                    <button class="delete-btn"
                        onclick="deleteBook(${book.id})">
                        Delete
                    </button>
                </div>
            </div>
        `;
    });
}

// Issue or return a book
function toggleStatus(id) {
    books = books.map(book => {
        if (book.id === id) {
            book.issued = !book.issued;
        }
        return book;
    });

    saveBooks();
    displayBooks();
}

// Delete a book
function deleteBook(id) {
    books = books.filter(book => book.id !== id);

    saveBooks();
    displayBooks();
}

// Display saved books when page loads
displayBooks();
