import { generateUUID } from '../../scripts/scripts.js';

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // fetch nav content
  const navPath = '/nav';
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const nav = document.createElement('nav');

    nav.classList.add('navbar', 'navbar-expand-lg', 'bg-light');
    nav.innerHTML = html;

    const navElement = nav.getElementsByClassName('navigation')[0];
    const navElementId = generateUUID();
    const navElementParent = navElement.parentElement;

    const mobileNavButton = document.createElement('button');
    mobileNavButton.innerHTML = `
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#{{navElementId}}" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    `;

    navElement.classList.add('row', 'collapse', 'navbar-collapse');
    navElement.setAttribute('id', navElementId);

    navElementParent.classList.add('container');

    [...navElement.children].forEach((col, index) => {
      switch (index) {
        case 0:
          col.classList.add('col-2');
          col.querySelector('img').classList.add('img-fluid');
          break;
        case 1:
          col.classList.add('col-7');
          break;
        case 2:
            col.classList.add('col-3');
            break;
        default:
            col.classList.add('col-12');
          break;
      }
      
      const topUlElement = col.querySelector('ul');
 
      if(topUlElement) {
        topUlElement.classList.add('navbar-nav', 'nav-fill');

        // all li are nav-item
        const allLiElements = topUlElement.querySelectorAll('li');
        allLiElements.forEach((liElement) => {
          liElement.classList.add('nav-item');
        });

        // all a are nav-link
        const allAnchorElements = topUlElement.querySelectorAll('a');
        allAnchorElements.forEach((anchorElement) => {
          anchorElement.classList.add('nav-link');
        });

        const topLiElements = topUlElement.querySelectorAll(':scope > li');

        topLiElements.forEach((topLiElement) => {
          topLiElement.classList.add('nav-item');
          const topLiAnchorElement = topLiElement.querySelector('a');

          if(topLiAnchorElement) {
            topLiAnchorElement.classList.add('nav-link');
            
            // if it is 3rd col
            if(index == 2) {
              
              topLiAnchorElement.classList.add('btn', 'btn-secondary', 'text-white');
            }
          }

          const subUlLement = topLiElement.querySelector('ul');
          if(subUlLement){
            topLiElement.classList.add('dropdown-hover');

            subUlLement.classList.add('dropdown-menu');
          }
        });
      }

    });

    block.append(nav);
  }
}
