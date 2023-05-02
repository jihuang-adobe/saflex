import { generateUUID } from '../../scripts/scripts.js';

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  var productDOM;
  
  block.parentElement.classList.add('container', 'my-5');

  [...block.children].forEach((row) => {
    row.classList.add('row');

    row.children[0].classList.add('col-2');
    row.children[1].classList.add('col-8');
    row.children[2].classList.add('col-2');

    // row 0, filters
    const navUL = row.children[0].querySelector('ul');
    if(navUL) {
      navUL.classList.add('navbar-nav', 'border', 'border-dark');

      const navLIs = navUL.querySelectorAll('li');

      [...navLIs].forEach((navli) => {
        navli.classList.add('nav-item');

        // if it is bolded
        if(navli.querySelector('strong')){
          navli.classList.add('active');
        }

        const navAnchors = navli.querySelectorAll('li a');

        const navIcons = navli.querySelectorAll('picture');

        [...navIcons].forEach((navIcon) => {
          navIcon.classList.add('col-5', 'text-center');
        });

        [...navAnchors].forEach((navAnchor) => {
          navAnchor.classList.add('nav-link', 'px-2', 'd-flex', 'align-items-center');

          navAnchor.prepend(...navIcons);
        });
      });
    }

    // row 1
    productDOM = row.children[1];
  });

  if(productDOM) {
    //row 1, products
    const productDataSource = productDOM.querySelector('a');

    if(productDataSource) {
      productDataSource.remove();

      const resp = await fetch(productDataSource.href);

      if (resp.ok) {
        const products = await resp.json();
        
        const productsRow = document.createElement('div');
        productsRow.classList.add('row');
  
        productDOM.append(productsRow);
  
        products.data.forEach((productObj) => {
          const product = document.createElement('div');
          product.classList.add('col-4','gx-2');
  
          product.innerHTML = `
          <a href="${productObj['Link']}" class="text-decoration-none">
            <div class="card">
              <img src="${productObj['Image Url']}" class="card-img-top" alt="${productObj.Title}">
              <div class="card-body">
                <h5 class="card-title p-2 text-black">${productObj.Title}</h5>
                <p class="card-text fs-6 fw-light text-black">${productObj['Teaser Text']}</p>
              </div>
            </div>
          </a>
          `;
  
          productsRow.append(product);
        });
      }
    }
  }
}