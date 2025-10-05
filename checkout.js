
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('cartList');
  const totalEl = document.getElementById('total');
  const form = document.getElementById('checkoutForm');

  const priceMap = new Map([
    ['arcana-rose', 7.00],
    ['citrus-oracle', 7.00],
    ['midnight-sage', 7.00],
    ['ember-spice', 7.00],
    ['forest-muse', 7.00],
    ['violet-veil', 7.00]
  ]);

  function render(){
    const cart = JSON.parse(localStorage.getItem('saga-cart') || '[]');
    list.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const price = priceMap.get(item.id) || 7.00;
      const li = document.createElement('li');
      li.className = 'card';
      li.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:1rem">
          <div><strong>${item.name}</strong> × 
            <input type="number" min="1" value="${item.qty}" data-id="${item.id}" style="width:64px">
          </div>
          <div class="price">$${(price * item.qty).toFixed(2)}</div>
        </div>`;
      list.appendChild(li);
      total += price * item.qty;
    });
    totalEl.textContent = `$${total.toFixed(2)}`;
  }

  list.addEventListener('change', e=>{
    const input = e.target.closest('input[type="number"][data-id]');
    if(!input) return;
    const id = input.getAttribute('data-id');
    const qty = Math.max(1, parseInt(input.value || '1', 10));
    const cart = JSON.parse(localStorage.getItem('saga-cart') || '[]');
    const row = cart.find(c => c.id === id);
    if(row){ row.qty = qty; localStorage.setItem('saga-cart', JSON.stringify(cart)); render(); }
  });

  form.addEventListener('submit', e=>{
    e.preventDefault();
    alert('Order placed! (Demo)');
    localStorage.removeItem('saga-cart');
    window.location.href = 'index.html';
  });

  render();
});
