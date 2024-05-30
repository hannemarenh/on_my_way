import { TrainStation } from "../types/LocationTrain";
import { EstimatedCall } from "../types/SiriEt";
import Illustration from "./Illustration";

type NextTrainProps = {
    estimatedCalls: EstimatedCall[][]
    activeLocation: TrainStation
}

export default function NextTrain({ estimatedCalls, activeLocation }: NextTrainProps) {
    const trains = estimatedCalls.reduce((acc, value) => acc.concat(value), [])
        .sort((a: EstimatedCall, b: EstimatedCall) => {
            if (a.ExpectedDepartureTime === undefined || b.ExpectedDepartureTime === undefined) throw Error("Cant find expected departure time")
            return Date.parse(a.ExpectedDepartureTime) - Date.parse(b.ExpectedDepartureTime)
        });

    const myTrain = trains[0];

    const timeUntilDepartue = myTrain.ExpectedDepartureTime !== undefined ? new Date(myTrain.ExpectedDepartureTime).getTime() - new Date().getTime() : 0
    const minutesUntilDeparture = Math.floor(timeUntilDepartue / 60000);
    if (myTrain.AimedDepartureTime === undefined || myTrain.ExpectedDepartureTime === undefined) return (<>Cant find any departure time...</>)
    return (
        <>
            {myTrain.ArrivalStatus === 'delayed' ?
                <div className="flex">
                    <p className="p-2">Expected departure time: </p>
                    <p className="p-2 line-through">{new Date(myTrain.AimedDepartureTime).toLocaleTimeString('no-NO')}</p>
                    <p className="p-2">{new Date(myTrain.ExpectedDepartureTime).toLocaleTimeString('no-NO')}</p>
                </div> :
                <p className="p-2">Expected departure time: {new Date(myTrain.ExpectedDepartureTime).toLocaleTimeString('no-NO')}</p>
            }
            <div className="flex flex-col items-center">
                <p className="p-2">Du har: {minutesUntilDeparture} minutter </p>
                {activeLocation === TrainStation.eidsvollVerk && <Illustration minutesToNextTrain={minutesUntilDeparture} />}
            </div>
        </>
    )
}



