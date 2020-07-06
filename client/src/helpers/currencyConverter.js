import { usdToEuroRate } from '../constants/currencies';
const  fromUSDToEUR = (amount) => {
    return `${(amount * usdToEuroRate).toFixed(2)}\u20AC`;
}

export default fromUSDToEUR;
