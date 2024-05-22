import GetWeatherData from './getWeatherData'

export default async function Weather() {
    const data =await GetWeatherData();

    return (<div>{JSON.stringify(data)}</div>)
}