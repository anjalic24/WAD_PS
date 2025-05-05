document.addEventListener('DOMContentLoaded', async () => {
  const productsContainer = document.getElementById('products');
  const loadingElement = document.getElementById('loading');

  try {
      const response = await fetch('/api/products');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const products = await response.json();
      loadingElement.style.display = 'none';
      
      products.forEach(product => {
          productsContainer.innerHTML += `
              <div class="product-card">
                  <img src="${product.image}" alt="${product.name}" class="product-image">
                  <div class="product-info">
                      <h3>${product.name}</h3>
                      <p class="product-price">$${product.price.toFixed(2)}</p>
                      <p>${product.description}</p>
                  </div>
              </div>
          `;
      });
  } catch (error) {
      console.error('Fetch error:', error);
      loadingElement.textContent = 'Failed to load products. Please refresh.';
  }
});