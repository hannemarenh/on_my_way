import { LocationData } from "../types/Location";
import { WeatherData } from "../types/Weather";

export const fetchWeatherData = async (locationData: LocationData, updateWeatherData: (data: WeatherData) => void) => {
    const url = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=" + locationData.latitudeInDegrees + "&lon=" + locationData.longitudeInDegrees;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const weatherData: WeatherData = await response.json();
            updateWeatherData(weatherData);
        }
    }
    catch (error) {
        console.error(error)
    }
    return
}