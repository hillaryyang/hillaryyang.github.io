// Goodreads RSS Feed Integration
// Fetches and displays books from Goodreads shelf

class GoodreadsWidget {
  constructor(config) {
    this.userId = config.userId;
    this.shelf = config.shelf || 'read';
    this.containerId = config.containerId;
    this.limit = config.limit || 20;
    this.manualCovers = config.manualCovers || {};
    this.manualRatings = config.manualRatings || {};
    this.showRatings = config.showRatings !== false; // Default to true
    this.filterTitles = config.filterTitles || null; // Array of titles to filter by
    this.recentDays = config.recentDays || null; // Only show books from last N days
    this.combinedShelves = config.combinedShelves || null; // Array of shelves to combine
    this.rssUrl = `https://www.goodreads.com/review/list_rss/${this.userId}?shelf=${this.shelf}`;
    
    // Use a CORS proxy for RSS feed
    this.corsProxy = 'https://api.allorigins.win/raw?url=';
  }

  async fetchBooks() {
    try {
      // If combining shelves, fetch from multiple sources
      if (this.combinedShelves) {
        return await this.fetchCombinedShelves();
      }
      
      const response = await fetch(this.corsProxy + encodeURIComponent(this.rssUrl));
      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, 'text/xml');
      
      const items = xml.querySelectorAll('item');
      const books = [];
      const now = new Date();
      const cutoffDate = this.recentDays ? new Date(now.getTime() - (this.recentDays * 24 * 60 * 60 * 1000)) : null;
      
      items.forEach((item, index) => {
        if (!this.filterTitles && !this.recentDays && index >= this.limit) return;
        
        const book = this.parseBookItem(item);
        if (book) {
          // If filtering by recent days, check the date
          if (this.recentDays && cutoffDate) {
            if (book.date && book.date >= cutoffDate) {
              books.push(book);
            }
          }
          // If filtering by titles, only include matching books
          else if (this.filterTitles) {
            if (this.filterTitles.includes(book.title)) {
              books.push(book);
            }
          } 
          // Otherwise, just add the book
          else {
            books.push(book);
          }
        }
      });
      
      // If filtering by recent days, sort by date (most recent first)
      if (this.recentDays) {
        books.sort((a, b) => b.date - a.date);
      }
      // If filtering by titles, sort by the order of filterTitles
      else if (this.filterTitles) {
        books.sort((a, b) => {
          return this.filterTitles.indexOf(a.title) - this.filterTitles.indexOf(b.title);
        });
      }
      
      // Limit the results if needed
      return books.slice(0, this.limit);
    } catch (error) {
      console.error('Error fetching Goodreads data:', error);
      return [];
    }
  }

  async fetchCombinedShelves() {
    try {
      const allBooks = [];
      const now = new Date();
      const cutoffDate = this.recentDays ? new Date(now.getTime() - (this.recentDays * 24 * 60 * 60 * 1000)) : null;
      
      console.log('Fetching combined shelves:', this.combinedShelves);
      console.log('Cutoff date:', cutoffDate);
      
      // Fetch from each shelf
      for (const shelf of this.combinedShelves) {
        const rssUrl = `https://www.goodreads.com/review/list_rss/${this.userId}?shelf=${shelf}`;
        console.log('Fetching from shelf:', shelf, rssUrl);
        
        const response = await fetch(this.corsProxy + encodeURIComponent(rssUrl));
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        
        const items = xml.querySelectorAll('item');
        console.log(`Found ${items.length} items in ${shelf} shelf`);
        
        items.forEach((item) => {
          const book = this.parseBookItem(item);
          if (book) {
            console.log('Parsed book:', book.title, 'Date:', book.date, 'Shelf:', shelf);
            
            // For 'currently-reading' shelf, always include all books
            if (shelf === 'currently-reading') {
              allBooks.push(book);
              console.log('Added currently reading book:', book.title);
            }
            // For 'read' shelf, apply date filter
            else if (shelf === 'read') {
              if (!cutoffDate) {
                // No date filter, include all
                allBooks.push(book);
                console.log('Added read book (no filter):', book.title);
              } else if (book.date) {
                // Check if within date range
                const daysDiff = (now - book.date) / (1000 * 60 * 60 * 24);
                console.log('Days diff:', daysDiff, 'Cutoff:', this.recentDays);
                if (daysDiff <= this.recentDays) {
                  allBooks.push(book);
                  console.log('Added recent read book:', book.title);
                }
              } else {
                // No date found, include it anyway (might be recently added)
                allBooks.push(book);
                console.log('Added read book (no date):', book.title);
              }
            }
          }
        });
      }
      
      console.log('Total combined books found:', allBooks.length, allBooks);
      
      // Sort by date (most recent first), but currently reading books without dates go first
      allBooks.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return -1; // Books without dates (currently reading) go first
        if (!b.date) return 1;
        return b.date - a.date;
      });
      
      return allBooks.slice(0, this.limit);
    } catch (error) {
      console.error('Error fetching combined shelves:', error);
      return [];
    }
  }

  parseBookItem(item) {
    try {
      const title = item.querySelector('title')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      
      // Parse book info from title (format: "Book Title")
      const bookTitle = title;
      
      // Extract book cover from description HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = description;
      const img = tempDiv.querySelector('img');
      let coverUrl = img ? img.src : '';
      
      // Upgrade to higher resolution Goodreads cover
      // Convert small covers (._SX50_, ._SY75_, etc.) to larger ones (._SX318_)
      if (coverUrl && coverUrl.includes('goodreads.com')) {
        coverUrl = coverUrl.replace(/\._S[XY]\d+_\./, '._SX318_.');
        // Also handle cases without size specification
        if (!coverUrl.includes('._SX')) {
          coverUrl = coverUrl.replace(/(\.\w+)$/, '._SX318_$1');
        }
      }
      
      // Extract author (usually in description text)
      const authorMatch = description.match(/author:\s*([^<\n]+)/i) || 
                         description.match(/by\s+([^<\n]+)/i);
      const author = authorMatch ? authorMatch[1].trim() : '';
      
      // Extract rating - try multiple methods
      let userRating = 0;
      
      // Method 1: Try to find user_rating element in item (Goodreads namespace)
      const userRatingEl = item.querySelector('user_rating');
      if (userRatingEl) {
        userRating = parseInt(userRatingEl.textContent) || 0;
      }
      
      // Method 2: Look for rating in description text
      if (!userRating) {
        const bookInfoText = tempDiv.textContent;
        const starMatch = bookInfoText.match(/rated it (\d+) stars?/i) ||
                         bookInfoText.match(/rating:\s*(\d+)/i) ||
                         bookInfoText.match(/user rated it (\d+) stars/i);
        if (starMatch) {
          userRating = parseInt(starMatch[1]) || 0;
        }
      }
      
      // Method 3: Check description for user_rating
      if (!userRating) {
        const ratingMatch = description.match(/user_rating:\s*(\d+)/i);
        if (ratingMatch) {
          userRating = parseInt(ratingMatch[1]) || 0;
        }
      }
      
      // Extract date read from description
      let dateRead = null;
      const dateReadMatch = description.match(/date_read:\s*([^<\n]+)/i);
      if (dateReadMatch) {
        dateRead = new Date(dateReadMatch[1].trim());
      }
      
      // Fallback to pubDate for currently reading books (will be null for filtering)
      if (!dateRead && pubDate) {
        // For books without a date_read, use pubDate from RSS (which is when added/updated)
        dateRead = new Date(pubDate);
      }
      
      return {
        title: bookTitle,
        author: author,
        link: link,
        cover: coverUrl,
        rating: userRating,
        date: dateRead
      };
    } catch (error) {
      console.error('Error parsing book item:', error);
      return null;
    }
  }

  renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<span class="star-full">★</span>';
      } else {
        stars += '<span class="star-empty">☆</span>';
      }
    }
    return stars;
  }

  renderBooks(books) {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error('Container not found:', this.containerId);
      return;
    }

    if (books.length === 0) {
      container.innerHTML = '<p>No books found in this shelf.</p>';
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'goodreads-grid';
    
    books.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.className = 'goodreads-book-card';
      
      // Check for manual overrides
      const coverUrl = this.manualCovers[book.title] || book.cover;
      const rating = this.manualRatings[book.title] || book.rating;
      
      bookCard.innerHTML = `
        <a href="${book.link}" target="_blank" rel="noopener noreferrer" class="goodreads-book-link">
          ${coverUrl 
            ? `<img src="${coverUrl}" alt="${book.title} cover" class="goodreads-book-cover">` 
            : `<div class="goodreads-book-cover--placeholder"></div>`
          }
          <div class="goodreads-book-info">
            <h3 class="goodreads-book-title">${book.title}</h3>
            ${book.author ? `<p class="goodreads-book-author">by ${book.author}</p>` : ''}
            ${this.showRatings && rating > 0 
              ? `<div class="goodreads-book-rating">${this.renderStars(rating)}</div>` 
              : ''
            }
          </div>
        </a>
      `;
      
      grid.appendChild(bookCard);
    });
    
    container.innerHTML = '';
    container.appendChild(grid);
  }

  async init() {
    const container = document.getElementById(this.containerId);
    if (container) {
      container.innerHTML = '<p class="goodreads-loading">Loading books from Goodreads...</p>';
    }
    
    const books = await this.fetchBooks();
    this.renderBooks(books);
  }
}

// Make it available globally
window.GoodreadsWidget = GoodreadsWidget;

