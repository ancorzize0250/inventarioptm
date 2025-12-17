import axios from 'axios';

const MEOWFACTS_API_URL = 'https://meowfacts.herokuapp.com/';

const getTwoRandomCatFacts = async () => {
    try {
        const response = await axios.get(`${MEOWFACTS_API_URL}?lang=esp&count=2`); 
        return response.data.data; 
    } catch (error) {
        return ["No se pudieron cargar datos sobre gatos."]; 
    }
};

export default {
    getTwoRandomCatFacts,
};