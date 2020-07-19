import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from './api';

export default class App extends React.Component {
  state = {
    data: {},
    country: 'global',
  };

  async componentDidMount() {
    this.setState({ data: await fetchData() })
  }

  handleCountryChange = async (country) => {
    this.setState({
      data: await fetchData(country),
      country,
    });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <Cards data={data} />
        <CountryPicker onChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}
