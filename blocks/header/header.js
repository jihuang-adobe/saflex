/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // fetch nav content
  /*
  const navPath = '/nav';
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.classList.add('navbar', 'navbar-expand-lg', 'bg-light');
    nav.innerHTML = html;

    const navElement = nav.getElementsByClassName('navigation')[0];
    navElement.classList.add('row');
    navElement.parentElement.classList.add('container-fluid');

    [...navElement.children].forEach((col, index) => {
      col.classList.add('col');
    });

    block.append(nav);
  }
  */
}
