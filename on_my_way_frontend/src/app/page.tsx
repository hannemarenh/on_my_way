import Messages from '../components/Messages';
import NextTrain from '../components/NextTrain';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-8">
            <h1>Neste tog til Oslo: </h1>
            <NextTrain />
            <div>
                <Messages />
            </div>
        </main>
    );
}
