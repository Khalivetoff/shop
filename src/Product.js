import $requests from "./requests";
import observer from "./Observable";

export default function Product({id, name, price, structureIds, img}, structure, descriptions, onProductClick) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.imageId = img;
    this.image;
    this.structure = structureIds.map(sItem => {
        return {
            id: sItem.id,
            name: structure[sItem.id].name,
            obligatory: sItem.obligatory,
        }
    })
    this.description = descriptions[this.id];
    this.element = undefined;
    this.button = undefined;
    this.onButtonClick = undefined;

    this.createElement = async function (onProductClick) {
        this.button = document.createElement('button');
        this.button.innerText = 'add in basket';
        this.setOnButtonClick(onProductClick);
        this.element = this._createElement('div', 'product-item');
        this.element.innerHTML = `<span class="product-item__title">${this.name}</span>`;
        this.image = this._createElement('img', 'product-item__image');
        this.image.src = `${$requests.url}/img/loading.jpeg`;
        this.element.appendChild(this.image);
        const description = this._createElement('div', 'product-item__description');
        description.innerHTML = `<span>${this.description}</span>`
        this.element.appendChild(description);
        const bottomContent = this._createElement('div', 'product-item__bottom-content');
        bottomContent.appendChild(this.button);
        this.element.appendChild(bottomContent);
        observer.addTarget(this.element, this.setImage, this);
    }

    this._createElement = function(type, _class) {
        const el = document.createElement(type);
        if (_class) {
            el.classList.add(_class);
        }
        return el;
    }

    this.deleteElement = function () {
        this.element = undefined;
    }

    this.setImage = async function () {
        this.image.src = `${$requests.url}/img/${this.imageId}.png`;
    }

    this.setOnButtonClick = function (onButtonClick) {
        if (this.onButtonClick) {
            this.button.removeEventListener('click', this.onButtonClick);
        }
        const _data = {
            id: this.id,
            name: this.name,
            price: this.price,
            structure: this.structure,
        }
        this.onButtonClick = onButtonClick.bind(null, this);
        this.button.addEventListener('click', this.onButtonClick);
    }

    this.createElement(onProductClick);
}
