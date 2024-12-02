const API_URL = 'https://goodreads12.p.rapidapi.com/getAuthorBooks';
const API_KEY = '7555630d42msh804276e0c7075c8p185182jsn37aecac82d15';

async function fetchBookInfo(authorID) {
    const bookInfo = document.getElementById('book-info');
    bookInfo.innerHTML = '<p>Loading...</p>';

     const startTime = performance.now();

     try {
          const response = await fetch(`${API_URL}?authorId=${encodeURIComponent(authorID)}`, {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': API_KEY,
                        'x-rapidapi-host': 'goodreads12.p.rapidapi.com',
                    },
         });

                const endTime = performance.now();
                const fetchDuration = (endTime - startTime).toFixed(2);

                if (!response.ok) {
                    throw new Error(`Failed to fetch author data: ${response.status}`);
                }

                const data = await response.json();
                if (!data.books || data.books.length === 0) {
                    throw new Error('No books found for the given author ID.');
                }

                displayBooks(data.books, fetchDuration);
            } catch (error) {
                bookInfo.innerHTML = `<p>Error: ${error.message}</p>`;
            }
        }

        function displayBooks(books, fetchDuration) {
            const bookInfo = document.getElementById('book-info');
            bookInfo.innerHTML = `<p><strong>Fetch Time:</strong> ${fetchDuration} ms</p>`;

            books.forEach(book => {
                const imageUrl = book.image_url || 'https://via.placeholder.com/150?text=No+Image';
                const bookContainer = document.createElement('div');
                bookContainer.style.marginBottom = '20px';
                bookContainer.innerHTML = `
                    <h2>${book.title || 'No Title Available'}</h2>
                    <img src="${imageUrl}" alt="${book.title || 'No Title'}" style="max-width: 100%; height: auto; border-radius: 10px;" />
                    <p><strong>Publication Year:</strong> ${book.publication_year || 'N/A'}</p>
                `;
                bookInfo.appendChild(bookContainer);
            });
        }

        (function () {
            const getAuthorID = document.getElementById('searchForBookInfo');
            const searchButton = document.getElementById('search-button');

            searchButton.addEventListener('click', () => {
                const authorID = getAuthorID.value.trim();
                if (!authorID) {
                    const bookInfo = document.getElementById('book-info');
                    bookInfo.innerHTML = '<p>Please enter an author ID.</p>';
                    return;
                }
                fetchBookInfo(authorID);
            });
        })();