let instance = false;

export default function Basket({products, idsShowCount, idsShowTotalPrice}) {
    this.products = [];
    this.totalPrice = 0;
    this.count = 0;

    this.init = function () {
        if (instance) return;
        instance = true;
        this.setProducts(products);
        this.calculateTotalPrice();
        this.updateShowCount();
    }

    this.calculateTotalPrice = function () {
        let totalPrice = 0;
        this.products.forEach(p => totalPrice += p.price * p.count);
        this.totalPrice = totalPrice;
    }

    this.calculateCount = function () {
        let count = 0;
        this.products.forEach(p => count += p.count);
        this.count = count;
        this.updateShowCount();
    }

    this.setProducts = function (products) {
        this.products = products;
    }

    this.updateShowCount = function () {
        if (!!idsShowCount && Array.isArray(idsShowCount) && !!idsShowCount.length) {
            idsShowCount.forEach(id => {
                const el = document.querySelector(`#${id}`);
                el.innerText = this.count;
            })
        }
    }

    this.changeProduct = function (productData) {
        const product = this.products.find(p => p.id === productData.id);
        if (product) {
            product.count = productData.count;
            if (!product.count) {
                this.products = this.products.filter(p => p.id !== productData.id);
            }
        } else {
            this.products.push(productData);
        }
        this.calculateCount();
        this.calculateTotalPrice();
    }

    this.buildModalDialog = function() {

    }

    this.init();
}

