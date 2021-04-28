import $requests from "./requests";
import observer from "./Observable";

export default function Product({id, name, price, structureIds, img, count = 0}, structure, descriptions, onChangeProduct) {
    this.data = {
        id,
        name,
        price,
        imageId: img,
        description: descriptions[id],
        count,
    }

    this.structure = structureIds.map(sItem => {
        return {
            id: sItem.id,
            name: structure[sItem.id].name,
            obligatory: sItem.obligatory,
        }
    })


    this.onUpCount = undefined;
    this.onDownCount = undefined;

    this.clearElements = {
        this: undefined,
        title: undefined,
        imageWrapper: {
            this: undefined,
            image: undefined,
        },
        description: {
            this: undefined,
            text: undefined,
        },
        count: {
            this: undefined,
            up: undefined,
            value: undefined,
            down: undefined,
        },
        bottomContent: {
            this: undefined,
            button: undefined,
        }
    }
    this.elements = Object.create(this.clearElements);

    this.buildElement = function (onProductClick) {
        this.elements.this = this.createElement('div', ['product-item']);
        this.buildTitle();
        this.buildImage();
        this.buildDescription();
        this.buildCount();
        this.buildBottomContent();
    }

    this.buildTitle = function() {
        this.elements.title = this.createElement('span', ['product-item__title'], this.data.name);
        this.elements.this.appendChild(this.elements.title);
    }

    this.buildImage = function() {
        this.elements.imageWrapper.this = this.createElement('div', ['product-item__image-wrapper']);
        this.elements.imageWrapper.image = this.createElement('img', ['product-item__image']);
        this.elements.imageWrapper.image.src = `${$requests.url}/img/loading.jpeg`;
        observer.addTarget(this.elements.imageWrapper.image, this.showImage, this);
        this.elements.imageWrapper.this.appendChild(this.elements.imageWrapper.image);
        this.elements.this.appendChild(this.elements.imageWrapper.this);
    }

    this.buildDescription = function() {
        this.elements.description.this = this.createElement('div', ['product-item__description']);
        this.elements.description.text = this.createElement('span', ['product-item__description-text'], this.data.description);
        this.elements.description.this.appendChild(this.elements.description.text);
        this.elements.this.appendChild(this.elements.description.this);
    }

    this.buildCount = function() {
        this.elements.count.this = this.createElement('div', ['product-item__count']);
        //----------------------------
        this.elements.count.down = this.createElement('button', ['product-item__count-button--down']);
        this.elements.count.down.addEventListener('click', this.changeCount.bind(this, 'down'));
        const spanIconDown = this.createElement('span', ['mdi', 'mdi-minus']);
        this.elements.count.down.appendChild(spanIconDown);
        this.elements.count.this.appendChild(this.elements.count.down);
        this.elements.this.appendChild(this.elements.count.this);
        //-------------------------------------------------------
        this.elements.count.value = this.createElement('span', ['product-item__count-value'], this.data.count);
        this.elements.count.this.appendChild(this.elements.count.value);
        //----------------------------------------------------------
        this.elements.count.up = this.createElement('button', ['product-item__count-button--up']);
        this.elements.count.up.addEventListener('click', this.changeCount.bind(this, 'up'));
        const spanIconUp = this.createElement('span', ['mdi', 'mdi-plus']);
        this.elements.count.up.appendChild(spanIconUp);
        this.elements.count.this.appendChild(this.elements.count.up);
    }

    this.buildBottomContent = function() {
        this.elements.bottomContent.this = this.createElement('div', ['product-item__bottom-content']);
        this.elements.bottomContent.this.appendChild(this.elements.count.this);
        this.elements.bottomContent.button = this.createElement('button', [''], 'Add to basket');
        this.elements.bottomContent.button.addEventListener('click', this.onSelectProduct.bind(this));
        this.elements.bottomContent.this.appendChild(this.elements.bottomContent.button);
        this.elements.this.appendChild(this.elements.bottomContent.this);
    }

    this.onSelectProduct = function() {
        if (!!this.data.count) return;
        this.changeCount('up');
    }

    this.createElement = function (type, _class, text) {
        const el = document.createElement(type);
        if (_class && !!_class.length) {
            _class.forEach(c => {
                if (!!c) el.classList.add(c);
            });
        }
        if (text !== undefined) {
            el.innerText = text;
        }
        return el;
    }

    this.changeCount = function(type) {
        if (type === 'down' && !!this.data.count) {
            this.data.count--;
        } else if (type === 'up') {
            this.data.count++;
        }
        this.elements.count.value.innerText = this.data.count;
        const _data = this.getFormData();
        this.onChangeProduct(_data);
    }

    this.showImage = async function () {
        this.elements.imageWrapper.image.src = `${$requests.url}/img/${this.data.imageId}.png`;
    }

    this.getFormData = function() {
        return {
            id: this.data.id,
            price: this.data.price,
            name: this.data.name,
            count: this.data.count,
        }
    }

    this.setOnChangeProduct = function(onChangeProduct) {
        if (!onChangeProduct) {
            onChangeProduct = {
                function() {},
                context: null,
            }
        }
        this.onChangeProduct = onChangeProduct.function.bind(onChangeProduct.context);
    }

    this.setOnChangeProduct(onChangeProduct);

    this.buildElement();
}
