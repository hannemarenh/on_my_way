import NextTrain from '../components/NextTrain';
import Illustration from '../components/Illustration';
import Messages from '../components/Messages';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between lg:flex">
                <div className="fixed left-0 top-0 flex w-full justify-center  lg:static lg:w-auto">
                    <NextTrain />
                </div>
                <div className="fixed bottom-0 left-0 flex h-48 w-full justify-center lg:static lg:size-auto">
                    <Illustration minutesToNextTrain={4} />
                </div>
            </div>

            <div className="">
                <Messages />
            </div>
        </main>
    );
}
