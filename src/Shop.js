import $requests from "./requests";
import Product from "./Product";

let instance = false;
export default function Shop() {
    this._products = [];
    this.products = [];
    this.structure = {};
    this.descriptions = {};
    this.shopEl = undefined;
    this.onChangeProducts = undefined;

    this.init = async function(shopSelector, onProductsChange) {
        if (instance) return;
        instance = true;
        this.setOnChangeProducts(onProductsChange);
        await Promise.all([this.setInternalProducts(), this.setStructure(), this.setDescriptions()]);
        await this.setProducts();
        this.shopEl = document.querySelector(shopSelector);
        this.buildShop();
    }

    this.setInternalProducts = async function() {
        const _products = await $requests.products();
        this._products = _products.data;
    }

    this.setStructure = async function() {
        this.structure = {};
        const structure = await $requests.structure();
        structure.data.forEach(sItem => {
            this.structure[sItem.id] = {
                name: sItem.name,
            };
        })
    }

    this.setDescriptions = async function() {
        this.descriptions = {};
        const descriptions = await $requests.description();
        descriptions.data.forEach(dItem => {
            this.descriptions[dItem.productId] = dItem.description;
        })
    }

    this.setProducts = async function() {
        this.products = [];
        this._products.forEach(pItem => {
            if (pItem.allowed) {
                this.products.push(new Product(pItem, this.structure, this.descriptions, this.onChangeProducts));
            }
        })
    }

    this.buildShop = function() {
        this.products.forEach(pItem => {
            this.shopEl.appendChild(pItem.elements.this);
        })
    }

    this.setOnChangeProducts = function(onProductClick) {
        this.onChangeProducts = onProductClick;
        if (!!this.products.length) {
            this.products.forEach(pItem => pItem.setOnChangeProduct(this.onChangeProducts));
        }
    }
}
