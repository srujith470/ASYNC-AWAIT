const axios = require('axios')
const getExchangerate = (from ,to) => {
  return  axios.get('http://data.fixer.io/api/latest?access_key=2173cbd345f1e533e51843a34b1d8d5f')
  .then((response) => {
        const euro =1/response.data.rates[from];
        const rate = euro * response.data.rates[to];
        return rate
    })
}

getExchangerate('USD','INR').then((rate)=>{
    console.log(rate)
});


const getExchangerateAsync = async (from ,to) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=2173cbd345f1e533e51843a34b1d8d5f');
    const euro =1/response.data.rates[from];
    const rate = euro * response.data.rates[to];
    return rate
  }

getExchangerateAsync('USD','INR').then((rate)=>{
    console.log(rate)
});

const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
        return response.data.map((country) => {
            return country.name
        });
    });
}

getCountries('INR').then((countries)=>{
    console.log(countries)
})

const getCountriesAsync = async (currencyCode) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
        return response.data.map((country) => {
            return country.name
        });
    });
}

getCountriesAsync('INR').then((countries)=>{
    console.log(countries)
})


const convertCurrency = (from,to,amount) => {
    let convertedAmount;
   return getExchangerate(from,to).then((rate) => {
         convertedAmount = (amount * rate).toFixed(2);
        console.log( 'Converted Amount:',convertedAmount);
        return getCountries(to)
    }).then(country => {
        console.log(country);
        return `${amount} ${from} is worth ${convertedAmount} ${to} can be used in ${country.join(', ')}`;
    })

}

convertCurrency('USD','INR',20).then((message) => {
    console.log(message)
})
