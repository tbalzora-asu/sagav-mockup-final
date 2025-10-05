
(function(){
  const saved = localStorage.getItem('saga-theme');
  const initial = saved || prefers;
  if(initial === 'light') document.documentElement.classList.add('light');
  if(modeToggle){
    const setPressed = () => modeToggle.setAttribute('aria-pressed', document.documentElement.classList.contains('light') ? 'true' : 'false');
    setPressed();
    modeToggle.addEventListener('click', ()=>{
      document.documentElement.classList.toggle('light');
      localStorage.setItem('saga-theme', document.documentElement.classList.contains('light') ? 'light' : 'dark');
      setPressed();
    });
  }
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
})();
