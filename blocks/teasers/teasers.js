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

  [...block.children].forEach((row, index) => {
    var colElement = document.createElement('div');

    colElement.classList.add('col-12');
    colElement.classList.add('g-2');

    if(!row.children[1].innerHTML) {
      colElement.classList.add('col-md-6');
    }

    row.classList.add('border');
    row.classList.add('border-dark');
    row.classList.add('p-3');
    row.classList.add('bg-white');

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
      linkButton.classList.add('btn-lg');

      linkButton.parentElement.classList.add('d-grid');
      linkButton.parentElement.classList.add('justify-content-md-end');
    }

    colElement.append(row);
    rowElement.append(colElement);
  });

  block.append(rowElement);
}
