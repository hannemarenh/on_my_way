import Messages from '../components/Messages';
import RefreshWindow from '../components/RefreshWindow';
import { TrainToGo } from '../components/TrainToGo';
import WeatherPage from '../components/WeatherPage';

export default function Home() {
    const date = new Date().toLocaleDateString('no-NO');
    const time = new Date().toLocaleTimeString('no-NO');
    return (
        <main className="flex flex-col items-center  p-4">
            
            <div className="flex p-8">
                <p className="p-2 font-bold">{date}</p>
                <p className="p-2 font-bold">{time}</p>
                <RefreshWindow />
            </div>
            <TrainToGo />
            <Messages />
            <WeatherPage />
        </main>
    );
}

