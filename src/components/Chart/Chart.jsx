import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';
import styles from './Chart.module.css';


export default ({ country, data: { confirmed, recovered, deaths } }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            setDailyData(await fetchDailyData());
        };
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

    const barChart = (
        confirmed ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            label: 'People',
                            backgroundColor: ['#3333ff', 'rgba(0, 225, 0, .5)', 'red'],
                            data: [confirmed.value, recovered.value, deaths.value],
                        },
                    ],
                }}
                options={{
                    legend: { display: false },
                    title: {
                        display: true,
                        text: `Current state of ${country}`,
                    }
                }}
            />
        ) : null
    );

    return (
        <div className={styles.container}>
            {country !== 'global' ? barChart : lineChart}
        </div>
    );
}