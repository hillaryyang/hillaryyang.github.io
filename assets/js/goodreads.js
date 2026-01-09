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

    // Cache settings (1 hour cache)
    this.cacheKey = `goodreads_${this.userId}_${this.shelf}`;
    this.cacheDuration = 60 * 60 * 1000; // 1 hour in milliseconds

    // Request settings
    this.timeout = 10000; // 10 second timeout
    this.maxRetries = 2;
  }

  // Fetch with timeout
  async fetchWithTimeout(url, timeout = this.timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  // Get cached data if available and not expired
  getCachedData() {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is still valid
      if (now - timestamp < this.cacheDuration) {
        return data;
      }

      // Cache expired, remove it
      localStorage.removeItem(this.cacheKey);
      return null;
    } catch (error) {
      return null;
    }
  }

  // Save data to cache
  setCachedData(data) {
    try {
      const cacheObject = {
        data: data,
        timestamp: Date.now()
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(cacheObject));
    } catch (error) {
      // Silently fail if localStorage is unavailable
    }
  }

  async fetchBooks() {
    // Check cache first
    const cachedBooks = this.getCachedData();
    if (cachedBooks) {
      return cachedBooks;
    }

    // If no cache, fetch fresh data with retry logic
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        // If combining shelves, fetch from multiple sources
        if (this.combinedShelves) {
          const books = await this.fetchCombinedShelves();
          this.setCachedData(books);
          return books;
        }

        const response = await this.fetchWithTimeout(this.corsProxy + encodeURIComponent(this.rssUrl));

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');

        // Check for XML parsing errors
        const parserError = xml.querySelector('parsererror');
        if (parserError) {
          throw new Error('Failed to parse XML response');
        }

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
        const limitedBooks = books.slice(0, this.limit);

        // Cache the results
        this.setCachedData(limitedBooks);

        return limitedBooks;
      } catch (error) {
        // If this was the last attempt, throw the error
        if (attempt === this.maxRetries) {
          throw error;
        }

        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }

    return [];
  }

  async fetchCombinedShelves() {
    try {
      const allBooks = [];
      const now = new Date();
      const cutoffDate = this.recentDays ? new Date(now.getTime() - (this.recentDays * 24 * 60 * 60 * 1000)) : null;

      // Fetch from each shelf
      for (const shelf of this.combinedShelves) {
        const rssUrl = `https://www.goodreads.com/review/list_rss/${this.userId}?shelf=${shelf}`;

        const response = await this.fetchWithTimeout(this.corsProxy + encodeURIComponent(rssUrl));

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');

        // Check for XML parsing errors
        const parserError = xml.querySelector('parsererror');
        if (parserError) {
          throw new Error('Failed to parse XML response');
        }

        const items = xml.querySelectorAll('item');

        items.forEach((item) => {
          const book = this.parseBookItem(item);
          if (book) {
            // For 'currently-reading' shelf, always include all books
            if (shelf === 'currently-reading') {
              allBooks.push(book);
            }
            // For 'read' shelf, apply date filter
            else if (shelf === 'read') {
              if (!cutoffDate) {
                // No date filter, include all
                allBooks.push(book);
              } else if (book.date) {
                // Check if within date range
                const daysDiff = (now - book.date) / (1000 * 60 * 60 * 24);
                if (daysDiff <= this.recentDays) {
                  allBooks.push(book);
                }
              } else {
                // No date found, include it anyway (might be recently added)
                allBooks.push(book);
              }
            }
          }
        });
      }

      // Sort by date (most recent first), but currently reading books without dates go first
      allBooks.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return -1; // Books without dates (currently reading) go first
        if (!b.date) return 1;
        return b.date - a.date;
      });

      return allBooks.slice(0, this.limit);
    } catch (error) {
      throw error;
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

  renderBooks(books, error = null) {
    const container = document.getElementById(this.containerId);
    if (!container) {
      return;
    }

    if (error) {
      container.innerHTML = `
        <div class="goodreads-error">
          <p>Unable to load books from Goodreads.</p>
          <p class="goodreads-error-detail">${error.message}</p>
          <button class="goodreads-retry" onclick="window.location.reload()">Retry</button>
        </div>
      `;
      return;
    }

    if (books.length === 0) {
      container.innerHTML = '<p class="goodreads-empty">No books found in this shelf.</p>';
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

    try {
      const books = await this.fetchBooks();
      this.renderBooks(books);
    } catch (error) {
      this.renderBooks([], error);
    }
  }
}

// Make it available globally
window.GoodreadsWidget = GoodreadsWidget;

