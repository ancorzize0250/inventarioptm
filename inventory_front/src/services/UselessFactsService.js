import axios from 'axios';

const USELESS_FACTS_API_URL = 'https://uselessfacts.jsph.pl/random.json?language=en';

const getDailyUselessFact = async () => {
    try {
        const response = await axios.get(USELESS_FACTS_API_URL);
        return response.data.text; 
    } catch (error) {
        return "Error al cargar el dato inutil del día"; 
    }
};

export default {
    getDailyUselessFact,
};