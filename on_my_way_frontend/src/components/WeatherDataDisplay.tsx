import { WeatherData } from "../types/Weather";

type WeatherDataDisplayProps = {
    data: WeatherData
}
export default function WeatherDataDisplay({ data }: WeatherDataDisplayProps) {
    return (
        <div>
            Last measured value ({data.properties.timeseries[0].time}) was {data.properties.timeseries[0].data.instant.details.air_temperature}
        </div>
    )
}