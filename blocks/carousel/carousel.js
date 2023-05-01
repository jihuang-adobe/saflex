import { generateUUID } from '../../scripts/scripts.js';

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const blockId = generateUUID()
  block.setAttribute('id', blockId);
  block.setAttribute('data-bs-ride', 'false');
  block.classList.add('slide');

  var carouselIndicators = document.createElement('div');
  carouselIndicators.classList.add('carousel-indicators');

  var carouselInners = document.createElement('div');
  carouselInners.classList.add('carousel-inner');

  [...block.children].forEach((row, index) => {
    var carouseelIndicator = document.createElement('button');
    carouseelIndicator.setAttribute('type', 'button');
    carouseelIndicator.setAttribute('data-bs-target', '#' + blockId);
    carouseelIndicator.setAttribute('data-bs-slide-to', index);
    carouseelIndicator.setAttribute('aria-label', row.children[1].textContent);

    if(index == 0) {
      carouseelIndicator.setAttribute('class', 'active');
      carouseelIndicator.setAttribute('aria-current', 'true');
    }

    carouselIndicators.append(carouseelIndicator);

    row.classList.add('carousel-item');
    if(index == 0) {
      row.classList.add('active');
    }
    
    if(row.children[1]) {
      /*
      row.children[1].classList.add('carousel-caption');
      row.children[1].classList.add('d-none');
      row.children[1].classList.add('d-md-block');
      */

      row.children[1].classList.add('carousel-caption-custom');
      row.children[1].classList.add('position-absolute');
      row.children[1].classList.add('top-50');
      row.children[1].classList.add('start-25');
      row.children[1].classList.add('w-25');
      row.children[1].classList.add('translate-middle-y');
      row.children[1].classList.add('p-4');
      row.children[1].classList.add('text-bg-dark');
      row.children[1].classList.add('bg-opacity-75');
      row.children[1].classList.add('fs-3');

      // buttons
      row.children[1].querySelectorAll('a').forEach((link) => {
        link.setAttribute('class', 'btn btn-light');
      });
    }

    carouselInners.append(row);
  });

  block.append(carouselIndicators);
  block.append(carouselInners);
}
