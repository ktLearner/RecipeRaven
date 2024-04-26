
const dtElements = document.querySelectorAll('dt');
dtElements.forEach(element =>{
  element.addEventListener('click', ()=>{
    const ddId = element.getAttribute('aria-controls');
    const ddelement = document.getElementById(ddId);
    const arrow = element.querySelectorAll('i')[0];
    ddelement.classList.toggle('hidden');
    arrow.classList.toggle('fa-rotate-180')

  })
})