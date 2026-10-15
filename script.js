const books = [
  { title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", price: 299, color: "#b45309" },
  { title: "Wings of Fire", author: "A. P. J. Abdul Kalam", category: "History", price: 349, color: "#9a3412" },
  { title: "Clean Code", author: "Robert C. Martin", category: "Technology", price: 899, color: "#0f766e" },
  { title: "Atomic Habits", author: "James Clear", category: "Self-Help", price: 499, color: "#1d4ed8" },
  { title: "The Pragmatic Programmer", author: "Hunt and Thomas", category: "Technology", price: 799, color: "#334155" },
  { title: "Sapiens", author: "Yuval Noah Harari", category: "History", price: 549, color: "#7c3aed" },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Self-Help", price: 329, color: "#15803d" },
  { title: "The Guide", author: "R. K. Narayan", category: "Fiction", price: 275, color: "#be123c" },
  { title: "Let Us C", author: "Yashavant Kanetkar", category: "Technology", price: 399, color: "#0369a1" },
  { title: "Discovery of India", author: "Jawaharlal Nehru", category: "History", price: 450, color: "#a16207" },
  { title: "Deep Work", author: "Cal Newport", category: "Self-Help", price: 479, color: "#0e7490" },
  { title: "The White Tiger", author: "Aravind Adiga", category: "Fiction", price: 359, color: "#4d7c0f" }
];

const grid = document.getElementById("bookGrid");
const emptyMsg = document.getElementById("emptyMsg");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("filters");
const cartCount = document.getElementById("cartCount");

let activeCategory = "All";
let cart = 0;

function render() {
  const query = searchInput.value.trim().toLowerCase();

  const visible = books.filter(book => {
    const matchesCategory = activeCategory === "All" || book.category === activeCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = visible.map(book => `
    <article class="book">
      <div class="cover" style="background:${book.color}">${book.title}</div>
      <div class="book-info">
        <h3>${book.title}</h3>
        <span class="author">${book.author}</span>
        <span class="tag">${book.category}</span>
        <div class="book-bottom">
          <span class="price">&#8377;${book.price}</span>
          <button class="add-btn" data-title="${book.title}">Add to cart</button>
        </div>
      </div>
    </article>
  `).join("");

  emptyMsg.hidden = visible.length > 0;
}

filters.addEventListener("click", event => {
  const chip = event.target.closest(".chip");
  if (!chip) return;
  activeCategory = chip.dataset.category;
  filters.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === chip));
  render();
});

searchInput.addEventListener("input", render);

grid.addEventListener("click", event => {
  const btn = event.target.closest(".add-btn");
  if (!btn) return;
  cart += 1;
  cartCount.textContent = cart;
  btn.textContent = "Added";
  setTimeout(() => { btn.textContent = "Add to cart"; }, 1000);
});

render();
