import { weatherAPI } from './apiService';

export const WeatherService = {
  async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => resolve(position.coords),
        error => reject(error)
      );
    });
  },

  async getWeatherData(latitude, longitude) {
    try {
      const response = await weatherAPI.get('/weather', {
        params: {
          lat: latitude,
          lon: longitude
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting weather data:', error);
      throw error;
    }
  },

  async getWeatherForecast(latitude, longitude) {
    try {
      const response = await weatherAPI.get('/forecast', {
        params: {
          lat: latitude,
          lon: longitude
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting weather forecast:', error);
      throw error;
    }
  },

  getLocationName(latitude, longitude) {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
      
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            resolve(results[0].formatted_address);
          } else {
            reject(new Error('No results found'));
          }
        } else {
          reject(new Error('Geocoder failed: ' + status));
        }
      });
    });
  }
};
