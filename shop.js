// shop.js — clean render for Saga V shop

const PRODUCTS = [
  {
    name: "The Sun",
    slug: "the-sun",
    price: 7,
    notes: "Golden peach, honey, vanilla",
    image: "assets/the_drink_pictures/Bottle-Render_09_Sun.jpg",
    ingredients: ["Golden peach", "Citrus zest", "Honey syrup", "Sparkling tonic"],
    vibe: "Radiant and uplifting — bright clarity in a glass."
  },
  {
    name: "The Siren",
    slug: "the-siren",
    price: 7,
    notes: "Grapefruit, sea salt, rosemary",
    image: "assets/the_drink_pictures/Bottle-Render_09_Siren.jpg",
    ingredients: ["Grapefruit", "Sea salt foam", "Rosemary", "Soda"],
    vibe: "Ocean-cool and alluring — a calming, reflective tide."
  },
  {
    name: "The Fool",
    slug: "the-fool",
    price: 7,
    notes: "Yuzu, lime, green apple",
    image: "assets/the_drink_pictures/Bottle-Render_10_Fool.jpg",
    ingredients: ["Yuzu", "Lime", "Green apple", "Coconut water"],
    vibe: "Playful, adventurous, open-hearted — a fresh start."
  },
  {
    name: "The Magician",
    slug: "the-magician",
    price: 7,
    notes: "Blood orange, gentian, botanicals",
    image: "assets/the_drink_pictures/Bottle-Render_10_Magician.jpg",
    ingredients: ["Blood orange", "Gentian", "Botanicals", "Soda"],
    vibe: "Transformative and creative — alchemy in motion."
  },
  {
    name: "The Oracle",
    slug: "the-oracle",
    price: 7,
    notes: "Tomato, black tea, shiitake",
    image: "assets/the_drink_pictures/Bottle-Render_09_Oracle.jpg",
    ingredients: ["Tomato", "Black tea", "Shiitake", "Warm spice"],
    vibe: "Intuitive and contemplative — quiet wisdom per sip."
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('shopGrid');
  const modal = document.getElementById('quickView');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('closeQuickView');

  // Render cards
  grid.innerHTML = PRODUCTS.map(p => `
    <article class="card product-card" data-slug="${p.slug}">
      <div class="product-media">
        <img src="${p.image}" alt="${p.name} bottle" loading="lazy">
        <span class="shine" aria-hidden="true"></span>
      </div>

      <div class="product-label">
        <h3 class="product-title">${p.name}</h3>
        <p class="product-notes">${p.notes}</p>
      </div>

      <div class="product-foot">
        <span class="price">$${p.price.toFixed(2)}</span>
        <button class="btn" data-quick="${p.slug}">Quick view</button>
      </div>
    </article>
  `).join('');

  // Quick view open
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-quick]');
    if(!btn) return;
    const slug = btn.getAttribute('data-quick');
    openModal(slug);
  });

  function openModal(slug){
    const p = PRODUCTS.find(x => x.slug === slug);
    if(!p) return;

    modalBody.innerHTML = `
      <div class="grid" style="grid-template-columns: 1fr 1.2fr; gap:1rem">
        <div>
          <img src="${p.image}" alt="${p.name} large" style="width:100%;height:auto;border-radius:.8rem;object-fit:contain">
        </div>
        <div>
          <h3 style="margin-top:0">${p.name}</h3>
          <p class="muted" style="margin:.25rem 0 1rem">${p.vibe}</p>
          <h4 style="margin:.25rem 0 .5rem">Ingredients</h4>
          <ul style="margin:.25rem 0 1rem;">
            ${p.ingredients.map(i => `<li>${i}</li>`).join('')}
          </ul>
          <div style="display:flex;gap:.5rem;align-items:center;margin-top:.5rem">
            <button class="btn primary" id="addToCart">Add to cart • $${p.price.toFixed(2)}</button>
            <a href="checkout.html" class="btn">Go to checkout</a>
          </div>
        </div>
      </div>
    `;

    modal.setAttribute('open','');
    modal.querySelector('.dialog').focus();

    // add-to-cart wiring
    const addBtn = document.getElementById('addToCart');
    addBtn?.addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('saga-cart') || '[]');
      const existing = cart.find(c => c.slug === p.slug);
      if(existing){ existing.qty += 1; } else { cart.push({ slug: p.slug, name: p.name, price: p.price, qty: 1 }); }
      localStorage.setItem('saga-cart', JSON.stringify(cart));
      addBtn.textContent = 'Added ✓';
      setTimeout(() => addBtn.textContent = `Add to cart • $${p.price.toFixed(2)}`, 900);
    });
  }

  // Close modal
  closeBtn.addEventListener('click', ()=> modal.removeAttribute('open'));
  modal.addEventListener('click', (e)=>{ if(e.target === modal) modal.removeAttribute('open'); });
});
