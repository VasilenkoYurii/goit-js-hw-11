function blackWhite(e) {
  const main = document.querySelector('main');

  const STORAGE_KEY = 'is-black-or-white';

  if (e.target.checked) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, 'black');
    addStyleBlackWrite();
  } else {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, 'white');
    addStyleBlackWrite();
  }
}

function addStyleBlackWrite() {
  const refsBtn = {
    toggle: document.querySelector('.toggle'),
    body: document.querySelector('body'),
    header: document.querySelector('.header'),
    itemsLink: Array.from(document.querySelectorAll('.gallery__item__link')),
    btnUp: document.querySelector('.btn-up'),
  };

  const blackOrWhite = localStorage.getItem('is-black-or-white');

  if (blackOrWhite === 'black') {
    refsBtn.toggle.checked = true;
    refsBtn.body.style.backgroundImage = `linear-gradient(
    -100deg,
    rgba(7, 7, 7, 0.9) 10%,
    rgba(61, 61, 61, 0.8) 90%
  )`;
    refsBtn.header.style.backgroundColor = '#2d2d2e';
    refsBtn.header.style.boxShadow = `0 1px 3px hsl(0deg 0% 92% / 12%), 0 1px 1px hsl(0deg 0% 81% / 14%), 0 2px 1px hsl(0deg 0% 95% / 20%)`;
    refsBtn.itemsLink.map(item => (item.style.color = `#fff`));
    refsBtn.btnUp.style.backgroundColor = `rgb(139, 139, 139)`;
  } else {
    refsBtn.toggle.checked = false;
    refsBtn.body.style.backgroundImage = 'none';
    refsBtn.header.style.backgroundColor = 'teal';
    refsBtn.itemsLink.map(item => (item.style.color = `#666`));
    refsBtn.btnUp.style.backgroundColor = 'teal';
  }
}

export { blackWhite, addStyleBlackWrite };
