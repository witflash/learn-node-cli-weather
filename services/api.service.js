import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'

const getWeather = async () => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);

    if (!token) {
        throw new Error('There is no API key; set key with the command -t [API_KEY]');
    }
    
    if (!city) {
        throw new Error('City is not set; do this with the command -c [CITY]');
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'ua',
            units: 'metric',
        }
    })

    return data;
};

export { getWeather };