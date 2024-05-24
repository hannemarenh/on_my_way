"use client"
import LocationToggle from '../../components/LocationToggle';
import { Location, LocationData, eidsvollVerkData, osloData } from '../../types/Location';
import { WeatherData } from '../../types/Weather';
import { useEffect, useState } from 'react';
import { fetchWeatherData } from '../../actions/GetWeatherData';
import WeatherDataDisplay from '../../components/WeatherDataDisplay';

export default function WeatherPage() {
    const [currentLocation, setLocation] = useState<Location>(Location.eidsvollVerk);
    const changeLocation = () => {
        setLocation(currentLocation == Location.eidsvollVerk ? Location.oslo : Location.eidsvollVerk)
    }

    const locationData: LocationData = currentLocation == Location.eidsvollVerk ? eidsvollVerkData : osloData
    const [weatherData, setWeatherData] = useState<WeatherData>();

    useEffect(() => {
        fetchWeatherData(locationData, setWeatherData);
    }, [locationData]);


    return (
        <div className="sticky flex flex-col items-center justify-center h-40">
            <LocationToggle activeLocation={currentLocation} onChange={changeLocation} />
            <div className="m-4">
                {weatherData && <WeatherDataDisplay data={weatherData} />}
            </div>
        </div>
    )
}