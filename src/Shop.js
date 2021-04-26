import $requests from "./requests";
import Product from "./Product";

let instance = false;
export default function Shop() {
    this._products = [];
    this.products = [];
    this.structure = {};
    this.descriptions = {};
    this.shopEl = undefined;
    this.onProductClick = undefined;

    this.init = async function(shopSelector, onProductClick) {
        if (instance) return;
        instance = true;
        this.setOnProductClick(onProductClick);
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
                this.products.push(new Product(pItem, this.structure, this.descriptions, this.onProductClick));
            }
        })
    }

    this.buildShop = function() {
        this.products.forEach(pItem => {
            this.shopEl.appendChild(pItem.element);
        })
    }

    this.setOnProductClick = function(onProductClick) {
        this.onProductClick = onProductClick;
        if (!!this.products.length) {
            this.products.forEach(pItem => pItem.setOnProductClick(this.onProductClick));
        }
    }
}
