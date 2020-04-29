import React from 'react';
import './App.css';

import { Card, Chart, CountryPicker } from './components';

import styles from './App.module.css';
import { fetchData, countries } from './api';


class App extends React.Component {

  state = {
    data: {},
    country: ''
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData, country: '' });
    // console.log(data);
  }

  handleCountryChange = async (country) => {
    const fetchedCountryData = await fetchData(country);

    this.setState({ data: fetchedCountryData, country: country })
    console.log(country);
  }

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container} >
        <Card data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    )
  }
}

export default App;
