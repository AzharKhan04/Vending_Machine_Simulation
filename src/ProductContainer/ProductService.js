import products from '../Constants/products'

function ProductService() {

    let existingProducts = localStorage.getItem('products')
    if (!existingProducts) {
        localStorage.setItem('products', JSON.stringify(products))
        this.products = products
    } else {

        this.products = JSON.parse(localStorage.getItem('products'))

    }



}

ProductService.prototype.getAllProducts = function() {

    return new Promise((resolve, reject) => {
        if (this.products) {
            resolve(this.products)
        } else {
            reject({
                error: 'no products found'
            })
        }
    })
}

export default ProductService