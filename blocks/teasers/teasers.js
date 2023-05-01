import { getMetadata, decorateIcons } from '../../scripts/lib-franklin.js';
import { generateUUID } from '../../scripts/scripts.js';

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  block.classList.add('container');

  var rowElement = document.createElement('div');
  rowElement.classList.add('row');

  //img should be full width
  block.querySelectorAll('picture img').forEach((img) => {
    img.classList.add('w-100');
  });

  [...block.children].forEach((row, index) => {
    var colElement = document.createElement('div');

    colElement.classList.add('col-12');
    colElement.classList.add('g-2');

    var decorativeWrapperElement = document.createElement('div');
    decorativeWrapperElement.classList.add('border');
    decorativeWrapperElement.classList.add('border-dark');
    decorativeWrapperElement.classList.add('p-3');
    decorativeWrapperElement.classList.add('bg-white');

    // if 2nd child element has content, then this is full content
    if(row.children[1].innerHTML) {
      row.classList.add('row');

      row.children[0].classList.add('col-8');
      row.children[1].classList.add('col-4');
    } else {
      colElement.classList.add('col-md-6');
    }

    var titleButton = row.querySelector('.button-container .button');
    if(titleButton) {
      titleButton.classList.add('btn');
      titleButton.classList.add('btn-secondary');
      titleButton.classList.add('btn-lg');
    }

    var linkButton = row.querySelector('.button-container:last-child .button');
    if(linkButton) {
      linkButton.classList.add('btn');
      linkButton.classList.add('btn-dark');

      linkButton.parentElement.classList.add('d-grid');
      linkButton.parentElement.classList.add('justify-content-md-end');
    }

    decorativeWrapperElement.append(row);
    colElement.append(decorativeWrapperElement);
    rowElement.append(colElement);
  });

  block.append(rowElement);
}
