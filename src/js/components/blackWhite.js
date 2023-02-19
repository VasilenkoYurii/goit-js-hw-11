function blackWhite(e) {
  const main = document.querySelector('main');
  if (e.target.checked) {
    main.classList.add('black');
    main.classList.remove('white');
    addStyleBlackWrite();
  } else {
    main.classList.add('white');
    main.classList.remove('black');
    addStyleBlackWrite();
  }
}

function addStyleBlackWrite() {
  const refsBtn = {
    body: document.querySelector('body'),
    header: document.querySelector('.header'),
    itemsLink: Array.from(document.querySelectorAll('.gallery__item__link')),
    main: document.querySelector('main'),
    btnUp: document.querySelector('.btn-up'),
  };

  if (refsBtn.main.classList.contains('black')) {
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
    refsBtn.body.style.backgroundImage = 'none';
    refsBtn.header.style.backgroundColor = 'teal';
    refsBtn.itemsLink.map(item => (item.style.color = `#666`));
    refsBtn.btnUp.style.backgroundColor = 'teal';
  }
}

export { blackWhite, addStyleBlackWrite };
