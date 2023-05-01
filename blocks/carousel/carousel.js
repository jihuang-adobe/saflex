import { getMetadata, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  console.log(block);
  var templateJSON = { items: [] };
  [...block.children].forEach((row) => {
    templateJSON.items.push({
      imgurl: row.children[0].querySelector('picture img').src,
      imgalt: row.children[1].textContent,
      descriptionhtml: row.children[1].innerHTML
    });
  });

  console.log(templateJSON)

  var htmlTemplate = `
  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
    <div class="carousel-indicators">
        {{#each items}}
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="{{@index}}" aria-label="{{this.imgalt}}"></button>
        {{/each}}
    </div>
    <div class="carousel-inner">
      {{#each items}}
      <div class="carousel-item active">
        <img src="{{this.imgurl}}" class="d-block w-100" alt="{{this.imgalt}}">
        <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
        </div>
      </div>
      {{/each}}
    </div>
  </div>
  `;

  var handlebarsTemplate = Handlebars.compile(htmlTemplate);
  
  const DOMElement = document.createElement('div');
  DOMElement.innerHTML = handlebarsTemplate(templateJSON);

  block.parentElement.append(DOMElement);
}
