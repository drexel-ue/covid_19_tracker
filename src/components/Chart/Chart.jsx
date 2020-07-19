import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';
import styles from './Chart.module.css';


export default () => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            setDailyData(await fetchDailyData());
        };

        console.log('Chart Data', dailyData);

        fetch();
    }, [dailyData.length]);

    const lineChart = (
        dailyData[0] ? <Line data={{
            labels: dailyData.map(({ reportDate }) => reportDate),
            datasets: [
                {
                    data: dailyData.map(({ confirmed }) => confirmed.total),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                },
                {
                    data: dailyData.map(({ deaths }) => deaths.total),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(225, 0, 0, .5)',
                    fill: true,
                },
            ],
        }} /> : null
    );

    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    );
}