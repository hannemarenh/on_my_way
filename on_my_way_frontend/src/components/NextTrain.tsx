import { error } from "console";
import { Direction, LineRef, getDirectionRef } from "../siriRequests/GenerateEtRequest";
import { EstimatedCall, EstimatedCalls, EstimatedVehicleJourney, SiriEtResponse } from "../types/SiriEt";
import { fetchSiriEtData } from "../utils/GetSiriEtData";
import Illustration from "./Illustration";

export default async function NextTrain() {
    const dataR12: SiriEtResponse = await fetchSiriEtData(LineRef.R12);
    const dataRE11: SiriEtResponse = await fetchSiriEtData(LineRef.RE11);


    const r12: EstimatedCall[] = getEstimatedCallsToEidsvollVerk(LineRef.R12, "south", dataR12);
    const re11: EstimatedCall[] = getEstimatedCallsToEidsvollVerk(LineRef.RE11, "south", dataRE11);
    const trains = [...r12, ...re11]
        .sort((a: EstimatedCall, b: EstimatedCall) => {
            if (a.ExpectedDepartureTime === undefined || b.ExpectedDepartureTime === undefined) throw error("Cant find expected departure time")
            return Date.parse(a.ExpectedDepartureTime) - Date.parse(b.ExpectedDepartureTime)
        });

    const myTrain = trains[0];


    const timeUntilDepartue = myTrain.ExpectedDepartureTime !== undefined ? new Date(myTrain.ExpectedDepartureTime).getTime() - new Date().getTime() : 0
    const minutesUntilDeparture = Math.floor(timeUntilDepartue / 60000);
    return (
        <>
            {myTrain.ArrivalStatus === 'delayed' &&
                <p className="line-through">{myTrain.AimedDepartureTime && new Date(myTrain.AimedDepartureTime).toLocaleTimeString('no-NO')}</p>
            }
            <p>Expected departure time: {myTrain.ExpectedDepartureTime && new Date(myTrain.ExpectedDepartureTime).toLocaleTimeString('no-NO')}</p>
            <p>Du har: {minutesUntilDeparture} minutter </p>
            <Illustration minutesToNextTrain={minutesUntilDeparture} />
        </>
    )
}


function isArray(estimatedCall: EstimatedCall | EstimatedCall[]): estimatedCall is EstimatedCall {
    const check = estimatedCall as EstimatedCall
    return (check).StopPointRef === undefined;
}
function getEstimatedCallsToEidsvollVerk(lineRef: LineRef, direction: Direction, data: SiriEtResponse) {
    const directionRef = getDirectionRef(lineRef, direction)
    const dataInDirectionSouth: EstimatedCalls[] = data.ServiceDelivery.EstimatedTimetableDelivery.EstimatedJourneyVersionFrame.EstimatedVehicleJourney
        .filter((current: EstimatedVehicleJourney) => { return current.DirectionRef === directionRef })
        .map((current: EstimatedVehicleJourney) => { return current.EstimatedCalls })
        .filter((current): current is EstimatedCalls => !!current);

    let estimatedCallsToEidsvollVerk: EstimatedCall[] = []

    dataInDirectionSouth.forEach((current: EstimatedCalls) => {
        const copy = current.EstimatedCall

        if (isArray(copy)) {
            const check = current.EstimatedCall as EstimatedCall[]
            check.forEach((current: EstimatedCall) => {
                if (current.StopPointName === "Eidsvoll Verk") { estimatedCallsToEidsvollVerk.push(current) }
            })
        }
        else {
            const data = current.EstimatedCall as EstimatedCall;
            if (data.StopPointName === "Eidsvoll Verk") { estimatedCallsToEidsvollVerk.push(data) }
        }
    })
    return estimatedCallsToEidsvollVerk
}