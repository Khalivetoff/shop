import axios from 'axios'

const $requests = {
    url: 'http://localhost:8085/shop-backend',
    request({method = 'get', url = this.url, endPoint, data = undefined}) {
        return new Promise(resolve => {
            axios({
                method,
                url: `${url}/${endPoint}`,
                data,
            })
                .then(response => resolve({
                    type: 'success',
                    data: response.data,
                }))
                .catch(e => resolve({
                    type: 'error',
                    data: `${e.response.status}, ${e.response.data}`,
                }))
        })
    },
    async products() {
        return await this.request({endPoint: 'products.json'});
    },
    async structure() {
        return await this.request({endPoint: 'structure.json'});
    },
    async description() {
        return await this.request({endPoint: 'descriptions.json'});
    },
}


export default $requests;
