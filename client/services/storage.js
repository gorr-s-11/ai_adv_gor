const STORAGE_KEY = "books";
export function getBooks() {
    const stored =localStorage.getItem(STORAGE_KEY);
    const books = stored ? JSON.parse(stored): [];
    return Array.isArray(books) ?  books : [];
}
export function saveBook(book) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([book, ...getBooks()]));

}

