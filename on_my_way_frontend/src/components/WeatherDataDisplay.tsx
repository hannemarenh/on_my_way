import Image from 'next/image';
import { WeatherData } from "../types/Weather";

type WeatherDataDisplayProps = {
    data: WeatherData
}
export default function WeatherDataDisplay({ data }: WeatherDataDisplayProps) {
    const numberOfHours = 5
    const timeseries = data.properties.timeseries.slice(0, numberOfHours);
    timeseries.push(data.properties.timeseries[numberOfHours + 4])

    return (
        <div className="w-96">
            <div className="flex items-center align-center">
                <div className="p-2 w-20">
                </div>
                <div className="p-2 w-20">
                    Time
                </div>
                <div className="p-2 w-20">
                    Temp [C]
                </div>
                <div className="p-2 w-20">
                    Wind [m/s]
                </div>
                <div className="p-2 w-20">
                    Rain [mm]
                </div>
            </div>
            {timeseries.map((weatherData) => {
                const imageUrl = "/weathericons/" + weatherData.data.next_1_hours.summary.symbol_code + ".svg"
                return (
                    <div key={weatherData.time} className="flex items-center align-center">
                        <Image
                            src={imageUrl}
                            width={80}
                            height={80}
                            alt={imageUrl}
                            className="pr-2"
                        />
                        <div className="p-2 w-20 self-center">
                            {weatherData.time.slice(11, 16)}
                        </div>
                        <div className="p-2 w-20">
                            {weatherData.data.instant.details.air_temperature}
                        </div>
                        <div className="p-2 w-20">
                            {weatherData.data.instant.details.wind_speed}
                        </div>
                        <div className="p-2 w-20">
                            {weatherData.data.next_1_hours.details.precipitation_amount}
                        </div>
                    </div>
                )
            })}

        </div>
    )
}
