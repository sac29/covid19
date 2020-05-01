import React from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl';

import { Card, Chart, CountryPicker } from './components';

import styles from './App.module.css';
import { fetchData, countries } from './api';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FjaGluMjkiLCJhIjoiY2s5aGowMnAzMGNnZDNkbnhtN3hqcTl1NiJ9.Foi2a3WK5E2jkodumxcQ8g';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,
      data: {},
      country: ''
    };
  }

  // state = {

  // }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData, country: '' });
    // console.log(data);
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
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
        <div>
          <div ref={el => this.mapContainer = el} className={styles.mapContainer}/>
        </div>
        <Card data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    )
  }
}

export default App;
