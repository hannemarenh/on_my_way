import { WeatherData } from "../types/Weather";
import Image from 'next/image';

type WeatherDataDisplayProps = {
    data: WeatherData
}
export default function WeatherDataDisplay({ data }: WeatherDataDisplayProps) {
    const lastMesauredData = data.properties.timeseries[0];

    const imageUrlNext1Hour = "/weathericons/" + lastMesauredData.data.next_1_hours.summary.symbol_code +".svg"
    const imageUrlNext6Hour = "/weathericons/" + lastMesauredData.data.next_6_hours.summary.symbol_code +".svg"
    return (
        <>
            <div>
                Last measured value ({data.properties.timeseries[0].time}) was {data.properties.timeseries[0].data.instant.details.air_temperature}
            </div>
            <div>
                Next hour
                <Image
                    src={imageUrlNext1Hour}
                    width={50}
                    height={50}
                    alt={imageUrlNext1Hour}
                />
            </div>
            <div>
                Next 6 hours 
                <Image
                    src={imageUrlNext6Hour}
                    width={50}
                    height={50}
                    alt={imageUrlNext6Hour}
                />
            </div>
        </>
    )
}

//next_1_hours: {
//    summary: {
//        symbol_code: string;
//    };
//    details: {
//        precipitation_amount: number;
//    };
//};
//next_6_hours: {
//    summary: {
//        symbol_code: string;
//    };
//    details: {
//        precipitation_amount: number;
//    };