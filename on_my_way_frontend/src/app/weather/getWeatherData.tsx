export default async function GetWeatherData() {
    const res = await fetch("https://api.met.no/weatherapi/nowcast/2.0/complete?lat=59.9333&lon=10.7166");
    return res.json()
}