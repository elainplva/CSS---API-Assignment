const API_URL1 = 'https://goodreads12.p.rapidapi.com/searchBooks';
const API_URL2 = 'https://goodreads12.p.rapidapi.com/getAuthorBooks';
const API_KEY = 'ae60e05b07msh51f63d5c59ad3b2p1de530jsna746a4a535b3';

async function fetchBooksByKeyword(keyword) {
    const bookInfo = document.getElementById('book-info');
    bookInfo.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch(`${API_URL1}?page=1&keyword=${encodeURIComponent(keyword)}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'goodreads12.p.rapidapi.com',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch book data: ${response.status}`);
        }

        const data = await response.json();
        console.log('Keyword Search Data:', data); // Debugging

        if (data.books && data.books.length > 0) {
            bookInfo.innerHTML = '';
            renderBookCards(data.books, bookInfo);
        } else {
            bookInfo.innerHTML = '<p>No books found for the given keyword. Please try another search.</p>';
        }
    } catch (error) {
        bookInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

async function fetchBooksByAuthor(authorId) {
    const bookInfo = document.getElementById('book-info');
    bookInfo.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch(`${API_URL2}?authorId=${encodeURIComponent(authorId)}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'goodreads12.p.rapidapi.com',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch author books: ${response.status}`);
        }

        const data = await response.json();
        console.log('Author Books Data:', data); // Debugging

        if (data.author && data.author.books && data.author.books.length > 0) {
            bookInfo.innerHTML = '';
            renderBookCards(data.author.books, bookInfo);
        } else {
            bookInfo.innerHTML = '<p>No books found for the given author ID. Please try another search.</p>';
        }
    } catch (error) {
        bookInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function renderBookCards(books, container) {
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.marginBottom = '20px';

        const h2 = document.createElement('h2');
        h2.textContent = book.title || 'No Title Available';

        const bookImg = document.createElement('img');
        bookImg.src = book.image_url || 'https://via.placeholder.com/150?text=No+Image';
        bookImg.style.width = '200px';
        bookImg.style.height = '350px';

        const authorN = document.createElement('h4');
        authorN.textContent = 'Author Name: ' + (book.author?.name || 'N/A');

        const bookYear = document.createElement('h5');
        bookYear.textContent = 'Published Year: ' + (book.published_year || 'N/A');

        const bookRating = document.createElement('h5');
        bookRating.textContent = 'Rating: ' + (book.rating || 'N/A');

        card.appendChild(h2);
        card.appendChild(bookImg);
        card.appendChild(authorN);
        card.appendChild(bookYear);
        card.appendChild(bookRating);

        container.appendChild(card);
    });
}

(function () {
    const getKeyword = document.getElementById('searchForBookInfo');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', () => {
        const keyword = getKeyword.value.trim();
        if (!keyword) {
            const bookInfo = document.getElementById('book-info');
            bookInfo.innerHTML = '<p>Please enter a keyword.</p>';
            return;
        }
        fetchBooksByKeyword(keyword); // Adjust this to call the correct function
    });
})();
