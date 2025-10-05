// blog.js — Saga V (real posts + correct image paths)

// Canonical posts for the 5 archetypes
const POSTS = [
  {
    title: "Draw The Sun",
    slug: "draw-the-sun",
    excerpt: "Radiant peach and honey—liquid sunlight for joyful seekers.",
    image: "assets/the_drink_pictures/Bottle-Render_09_Sun.jpg",
    content: "Let The Sun guide you—golden peach, honey, and vanilla blossom brighten your spread. A ritual for optimism and the gentle sweetness of life."
  },
  {
    title: "Answer The Siren",
    slug: "answer-the-siren",
    excerpt: "Grapefruit and sea salt—bracing tides for adventurous hearts.",
    image: "assets/the_drink_pictures/Bottle-Render_09_Siren.jpg",
    content: "The Siren calls to you with briny grace: grapefruit, sea salt, and rosemary. A savory reveal that balances mystery with elegance."
  },
  {
    title: "Leap With The Fool",
    slug: "leap-with-the-fool",
    excerpt: "Yuzu-lime sparks—tangy, playful, and brave.",
    image: "assets/the_drink_pictures/Bottle-Render_10_Fool.jpg",
    content: "The Fool encourages you to begin—yuzu, lime, and green apple awaken curiosity. Draw, sip, and step into the unknown."
  },
  {
    title: "Conjure The Magician",
    slug: "conjure-the-magician",
    excerpt: "Blood orange and botanicals—complex, contemplative, refined.",
    image: "assets/the_drink_pictures/Bottle-Render_10_Magician.jpg",
    content: "The Magician transforms the moment—blood orange, gentian root, and herbs weave a bittered spell of mastery."
  },
  {
    title: "Consult The Oracle",
    slug: "consult-the-oracle",
    excerpt: "Tomato and black tea—earthy wisdom, savory depth.",
    image: "assets/the_drink_pictures/Bottle-Render_09_Oracle.jpg",
    content: "The Oracle grounds the senses—tomato, black tea, shiitake, and spice reveal quiet truths with every contemplative sip."
  }
];

// Build route like: blog/post-<slug>.html
function postUrl(slug) {
  return `blog/post-${slug}.html`;
}

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('blogList');
  if (!list) return;

  list.innerHTML = '';
  POSTS.forEach(p => {
    const url = postUrl(p.slug);
    const article = document.createElement('article');
    article.className = 'card blog-card';
    article.id = p.slug; // fallback anchor
    article.innerHTML = `
      <div class="grid grid-2">
        <a href="${url}" class="media" aria-label="${p.title}">
          <img src="${p.image}" alt="${p.title} bottle render" loading="lazy">
        </a>
        <div>
          <h3 style="margin-top:0">
            <a href="${url}">${p.title}</a>
          </h3>
          <p class="muted">${p.excerpt}</p>
          <p>${p.content}</p>
          <p>
            <a class="btn link" href="${url}" aria-label="Read more: ${p.title}">
              Read more
            </a>
          </p>
        </div>
      </div>
    `;
    list.appendChild(article);
  });
});