import { getMetadata, decorateIcons } from '../../scripts/lib-franklin.js';
import { generateUUID } from '../../scripts/scripts.js';

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const blockId = generateUUID()
  block.setAttribute('id', blockId);
  block.setAttribute('data-bs-ride', 'true');
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
      row.children[1].classList.add('carousel-caption');
      row.children[1].classList.add('d-none');
      row.children[1].classList.add('d-md-block');
    }

    carouselInners.append(row);
  });

  block.append(carouselIndicators);
  block.append(carouselInners);
}
