import ProductService from "../ProductContainer/ProductService"
import CurrencyExchangeSerive from './CurrencyExchangeService';

const currencyExchangeService = new CurrencyExchangeSerive();

const order = async(products, currenciesRecived) => {

    return new Promise(async(resolve, reject) => {

        if (!products || !currenciesRecived) {
            reject({
                error: "Error"
            })
        }

        try {

            let amountToDeduct = 0;
            let totalAmountRecieved = 0;
            let amountToReturn = 0;


            products.map((product) => {
                amountToDeduct = amountToDeduct + product.productPrice
            })

            let currencyAvailabe = await currencyExchangeService.getCurrency()
            let currencyArray = Object.keys(currencyAvailabe)
            currencyArray = currencyArray.sort((a, b) => {
                return b - a
            })


            let newCurrencyAvailable = {
                ...currencyAvailabe
            }


            Object.keys(currenciesRecived).forEach((key) => {
                totalAmountRecieved = totalAmountRecieved + Number(currenciesRecived[key]) * Number(key)
                newCurrencyAvailable[key] = newCurrencyAvailable[key] + currenciesRecived[key]

            })

            amountToReturn = totalAmountRecieved - amountToDeduct

            let currencyReturning = {

            }

            if (totalAmountRecieved < amountToDeduct) {

                reject({
                    error: "Insufficient fund insterted",
                    change: currenciesRecived
                })

            }

            if (amountToReturn == 0) {

                updateVendingMachine(products, newCurrencyAvailable).then((res) => {


                    resolve({
                        message: "Please Collect Your Product",
                        data: products,
                        change: null
                    })


                })


            } else {


                currencyArray.forEach((currency) => {

                    let numCurrency = Number(currency)
                    let res = Math.floor((amountToReturn / numCurrency))

                    if (res > 0) {

                        if (currencyAvailabe[numCurrency] > 0) {
                            newCurrencyAvailable[numCurrency] = newCurrencyAvailable[numCurrency] - res
                            currencyReturning[numCurrency] = res;
                            amountToReturn = amountToReturn - (numCurrency * res)

                        }



                    }


                })

                if (amountToReturn > 0) {
                    reject({
                        error: "No Change Available",
                        change: currenciesRecived
                    })
                } else {

                    updateVendingMachine(products, newCurrencyAvailable).then((res) => {

                        resolve({
                            message: "Please Collect Your Product(s)",
                            change: currencyReturning,
                            data: products
                        })

                    })


                }




            }

        } catch (err) {
            reject(err)
        }




    })


}

const updateVendingMachine = (products, newCurrencies) => {


    let productsIds = []

    products.forEach((p) => {
        productsIds.push(p.id)
    })

    let ps = new ProductService()

    return ps.getAllProducts().then((products) => {
        let newProducts = products.map((p) => {
            if (productsIds.indexOf(p.id) > -1) {
                p.productCount = p.productCount - 1
            }
            return p;
        })

        localStorage.setItem('currenciesAvailable', JSON.stringify(newCurrencies))
        localStorage.setItem('products', JSON.stringify(newProducts))


    })




}



export default order