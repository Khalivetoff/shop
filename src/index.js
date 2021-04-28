import '@mdi/font/scss/materialdesignicons.scss';
import './style/main.scss'

import Shop from "./Shop";
import Basket from "./Basket";

const shop = new Shop();
const basket = new Basket({products: shop.products, idsShowCount: ['product-count']});
shop.init('#shop', {function: basket.changeProduct, context: basket});

