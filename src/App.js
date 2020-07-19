import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from './api';

export default class App extends React.Component {
  state = { data: {} }

  async componentDidMount() {
    this.setState({ data: await fetchData() })

    // TODO: remove.
    console.log('App State', this.state);
  }

  render() {
    const { data } = this.state;

    return (
      <div className={styles.container}>
        <Cards data={data} />
        <CountryPicker />
        <Chart />
      </div>
    );
  }
}
