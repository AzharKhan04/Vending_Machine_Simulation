import currencyAvailabe from "../Constants/vendingMachineAvailableCurrencies"

function CurrencyExchangeSerive() {

    let existingCurrency = localStorage.getItem('currencyAvailabe')
    if (!existingCurrency) {
        localStorage.setItem('currenciesAvailable', JSON.stringify(currencyAvailabe))
        this.currencyAvailabe = currencyAvailabe
    } else {

        this.currencyAvailabe = JSON.parse(localStorage.getItem('currencyAvailabe'))

    }



}

CurrencyExchangeSerive.prototype.getCurrency = function() {
    console.log(this)

    return new Promise((resolve, reject) => {
        if (this.currencyAvailabe) {
            resolve(this.currencyAvailabe)
        } else {
            reject('no curreincies foun')
        }
    })
}

export default CurrencyExchangeSerive