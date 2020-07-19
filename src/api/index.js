import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(country ? `${url}/countries/${country}` : url);
        return { confirmed, recovered, deaths, lastUpdate };

    } catch (error) {
        console.log('fetchData', error);
    }
};

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        return data.map(({ confirmed, deaths, reportDate }) => { return { confirmed, deaths, reportDate }; });
    } catch (error) {
        console.log('fetchDailyData', error);
    }
};

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
    } catch (error) {
        console.log('fetchCountries', error);
    }
};