export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.button.textContent = 'Load more';
    this.refs.button.style.cursor = 'pointer';
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.button.textContent = 'loading...';
    this.refs.button.style.cursor = 'default';
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
