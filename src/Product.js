export default function Product({id, name, price, structureIds}, structure, onProductClick) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.structure = structureIds.map(sItem => {
        return {
            id: sItem.id,
            name: structure[sItem.id].name,
            obligatory: sItem.obligatory,
        }
    })
    this.element = undefined;
    this.button = undefined;
    this.onButtonClick = undefined;

    this.createElement = function (onProductClick) {
        this.button = document.createElement('button');
        this.button.innerText = 'add in basket';
        this.setOnButtonClick(onProductClick)
        this.element = document.createElement('div');
        this.element.classList.add('product-item');
        this.element.innerHTML = `<p>${this.name}</p>`;
        this.element.appendChild(this.button);
    }

    this.deleteElement = function () {
        this.element = undefined;
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
        this.onButtonClick = onButtonClick.bind(null, _data);
        this.button.addEventListener('click', this.onButtonClick);
    }

    this.createElement(onProductClick);
}
