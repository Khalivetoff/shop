import '@mdi/font/scss/materialdesignicons.scss';
import './style/main.scss'

import Shop from "./Shop";

function test(data) {
    console.log(data);
}
const shop = new Shop();
shop.init('#shop', test);
