const PRODUCTS_PER_PAGE = 10;
let currentPage = 1;
let products = [];

function loadProducts() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "products.json", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      products = JSON.parse(xhr.responseText);
      renderPage();
    }
  };
  xhr.send();
}

function renderPage() {
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  const pageItems = products.slice(start, end);

  const tbody = document.getElementById("productBody");
  tbody.innerHTML = "";

  pageItems.forEach(product => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${product.img}" alt="${product.name}"></td>
      <td>${product.name}</td>
      <td>₹${product.price}</td>
      <td>${product.desc}</td>
    `;
    tbody.appendChild(row);
  });

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage === totalPages;
}

document.getElementById("prevBtn").onclick = function () {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
};

document.getElementById("nextBtn").onclick = function () {
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage();
  }
};

loadProducts();
