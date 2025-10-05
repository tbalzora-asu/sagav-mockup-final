
document.addEventListener('DOMContentLoaded', () => {
  const data = [

  {year: '2025 Aug', title: 'The Dream', text: 'The idea of Saga V is born — a tarot-inspired mocktail brand blending flavor and ritual.'},
  {year: '2025 Sep', title: 'The Design Begins', text: 'Archetypes take form: The Sun, The Fool, The Magician, The Siren, The Oracle. Each crafted with color, symbolism, and story.'},
  {year: '2025 Oct', title: 'The Craft', text: 'Recipes refined, visuals aligned, and the brand voice established — mystical yet accessible.'},
  {year: '2025 Nov', title: 'The Launch', text: 'Saga V emerges into the world — five archetypes, one vision: to transform mocktails into modern ritual.'}


  ];
  const list = document.getElementById('timelineList');
  const detail = document.getElementById('timelineDetail');

  function render(){
    list.innerHTML = '';
    data.forEach((item, idx) => {
      const li = document.createElement('div');
      li.className = 'tl-item card';
      li.tabIndex = 0;
      li.setAttribute('role','button');
      li.setAttribute('aria-controls','timelineDetail');
      li.setAttribute('data-index', idx);
      li.innerHTML = `<h4>${item.year} — ${item.title}</h4><p>${item.text}</p>`;
      li.addEventListener('click',()=>focusItem(idx));
      li.addEventListener('keydown',(e)=>{ if(e.key==='Enter' || e.key===' ') { e.preventDefault(); focusItem(idx);} });
      list.appendChild(li);
    });
    focusItem(data.length-1);
  }

  function focusItem(i){
    const item = data[i];
    [...list.children].forEach((c, n)=> c.style.outline = n===i ? '3px solid var(--ring)' : 'none');
    detail.innerHTML = `
      <div class="card">
        <h3 style="margin-top:0">${item.year} — ${item.title}</h3>
        <p>${item.text}</p>
      </div>`;
  }

  render();
});
// move programmatic focus to <main> after jump (for some screen readers)
document.querySelector('.skip-link')?.addEventListener('click', e => {
  const target = document.getElementById('main-content');
  if (target){ target.setAttribute('tabindex','-1'); target.focus(); }
});
