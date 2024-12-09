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
        console.log('Fetched Data:', data);


        if (data.books && data.books.length > 0) {
            bookInfo.innerHTML = '';
            renderBookCards(data.books , bookInfo);
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
        console.log('Fetched Data:', data);


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

function renderBookCards(books) {
    const container = document.getElementById('book-info')

    container.innerHTML += '<hr><h2>Formatted Book Results</h2>';

    books.forEach(book => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.style.marginBottom = '20px';

        const h2 = document.createElement('h2');
        h2.textContent = book.title || 'No Title Available';

        const bookImg = document.createElement('img');
        bookImg.setAttribute('src', book.imageUrl || 'https://via.placeholder.com/150?text=No+Image');
        bookImg.setAttribute('width', '200px');
        bookImg.setAttribute('height', '350px');

        const authorId = document.createElement('h4');
        authorId.textContent = 'Author ID: ' + book.author.id ;

        const authorN = document.createElement('h4');
        authorN.textContent = 'Author Name: ' + book.author.name ;

        const bookId = document.createElement('h5');
        bookId.textContent = 'Book ID: ' + book.id ;

        const bookYear = document.createElement('h5');
        bookYear.textContent = 'Book Published Year: ' + book.publishedYear ;

        const bookRank = document.createElement('h5');
        bookRank.textContent = 'Book Rank: ' + book.rank ;

        const bookRating = document.createElement('h5');
        bookRating.textContent = 'Book Rating: ' + book.rating ;

        const bookTotalRatings = document.createElement('h5');
        bookTotalRatings.textContent = 'Book Total Ratings: ' + book.totalRatings ;

        card.appendChild(h2);
        card.appendChild(bookImg);
        card.appendChild(authorId);
        card.appendChild(authorN);
        card.appendChild(bookId);
        card.appendChild(bookYear);
        card.appendChild(bookRank);
        card.appendChild(bookRating);
        card.appendChild(bookTotalRatings);
        
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
        fetchBooksByKeyword(keyword); 
    });
})();
