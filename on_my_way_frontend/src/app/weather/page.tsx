import NavBar from '../../components/NavBar';
import GetWeatherData from './getWeatherData'

export default async function Weather() {
    const data = await GetWeatherData();

    return (
        <>
            <NavBar />
            <div>{JSON.stringify(data)}</div>)
        </>
    )
}