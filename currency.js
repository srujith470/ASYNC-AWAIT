const axios = require('axios')

const getExchangerateAsync = async (from ,to) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=2173cbd345f1e533e51843a34b1d8d5f');
    const euro =1/response.data.rates[from];
    const rate = euro * response.data.rates[to];
    return rate
  }

 getExchangerateAsync('USD','INR').then((rate)=>{
     console.log('RATE',rate)
 });

const getCountriesAsync = async (currencyCode) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
        return response.data.map((country) => {
            return country.name
        });
}

 getCountriesAsync('INR').then((countries)=>{
     console.log('COUNTRIES:',countries)
 })

 const convertCurrencyAsync = async (from, to, amount) => {
    const rate = await getExchangerateAsync(from,to);
    const countries = await getCountriesAsync(to);
    const convertedAmount = (amount * rate).toFixed(2)
    return `${amount} ${from} is worth ${convertedAmount} ${to} can be used in ${countries.join(', ')}`;
}

convertCurrencyAsync('USD','INR', 100).then((message) => {
    console.log(message)
})