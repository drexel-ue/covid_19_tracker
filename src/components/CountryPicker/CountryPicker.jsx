import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';

export default () => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            setCountries(await fetchCountries());
        };
        fetch();
    }, [countries.length]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect>
                <option value='global'>Global</option>
                {countries.map((country, index) => (<option key={`country_${index}`} value={country}>{country}</option>))}
            </NativeSelect>
        </FormControl>
    );
}