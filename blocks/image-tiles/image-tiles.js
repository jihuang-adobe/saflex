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
    var figureElement = document.createElement('figure');
    var figureCaptionElement = document.createElement('figcaption');

    colElement.classList.add('col-12', 'col-md-3', 'col-md-3', 'p-1');
    figureElement.classList.add('figure', 'position-relative');
    figureCaptionElement.classList.add('figure-caption', 'position-absolute', 'top-0', 'start-0', 'bg-dark', 'text-white', 'bg-opacity-75', 'p-2', 'm-2');
    
    // move images to first link
    var linkElement = row.querySelector('a');
    figureElement.append(...row.querySelectorAll('picture'));
    figureCaptionElement.append(...linkElement.childNodes);
    
    figureElement.append(figureCaptionElement);
    linkElement.append(figureElement);

    colElement.append(row);
    rowElement.append(colElement);
  });

  block.append(rowElement);
}
