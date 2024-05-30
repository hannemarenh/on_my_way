"use client"
import LocationToggleTrain from "./LocationToggleTrain";
import { TrainStation } from "../types/LocationTrain";
import { useEffect, useState } from "react";
import NextTrain from "./NextTrain";
import { EstimatedCall, EstimatedCalls, EstimatedVehicleJourney, SiriEtResponse } from "../types/SiriEt";
import { fetchSiriEtData } from "../utils/GetSiriEtData";
import { Direction, LineRef } from "../siriRequests/GenerateEtRequest";

type TrainToGoProps = {

}
export function TrainToGo({ }: TrainToGoProps) {
    const MINUTE_MS = 60000;
    const [activeLocation, setActiveLocation] = useState<TrainStation>(TrainStation.eidsvollVerk);
    const changeLocation = (newLocation: TrainStation) => {
        setActiveLocation(newLocation);
    };

    const [dataR12, setDataR12] = useState<SiriEtResponse>()
    const [dataRE11, setDataRE11] = useState<SiriEtResponse>()

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Logs every minute');
        }, MINUTE_MS);

        let isFetched = true;
        const fetchData = async () => {
            const dataR12 = await fetchSiriEtData(LineRef.R12);
            const dataRE11 = await fetchSiriEtData(LineRef.RE11);
            if (isFetched) {
                setDataR12(dataR12)
                setDataRE11(dataRE11)
            }
        }
        fetchData().catch(console.error)
        return () => { isFetched = false; clearInterval(interval) };
    }, [])

    if (dataR12 === undefined || dataRE11 === undefined) return (<>Loading...</>)

    const trainData: EstimatedCall[][] = getTrainData(dataR12, dataRE11, activeLocation);

    return (
        <div className="p-4 text-center">
            <LocationToggleTrain activeLocation={activeLocation} onChange={changeLocation} />
            <NextTrain estimatedCalls={trainData} activeLocation={activeLocation} />
        </div>
    )
}

function getTrainData(dataR12: SiriEtResponse, dataRE11: SiriEtResponse, activeLocation: TrainStation): EstimatedCall[][] {
    const r12: EstimatedCall[] = getEstimatedCalls(dataR12, activeLocation);
    const re11: EstimatedCall[] = getEstimatedCalls(dataRE11, activeLocation);
    return [r12, re11];
}
function getEstimatedCalls(data: SiriEtResponse, activeLocation: TrainStation): EstimatedCall[] {
    const direction: Direction = activeLocation === TrainStation.eidsvollVerk ? "south" : "north";
    const directionRefs: string[] = direction === "north" ? ['EVL'] : ['KBG', 'SKN']
    const dataInCorrectDirection: EstimatedCalls[] = data.ServiceDelivery.EstimatedTimetableDelivery.EstimatedJourneyVersionFrame.EstimatedVehicleJourney
        .filter((current: EstimatedVehicleJourney) => { return directionRefs.includes(current.DirectionRef) })
        .map((current: EstimatedVehicleJourney) => { return current.EstimatedCalls })
        .filter((current): current is EstimatedCalls => !!current);

    let estimatedCalls: EstimatedCall[] = []

    dataInCorrectDirection.forEach((current: EstimatedCalls) => {
        const copy = current.EstimatedCall

        if (isArray(copy)) {
            const check = current.EstimatedCall as EstimatedCall[]
            check.forEach((current: EstimatedCall) => {
                if (current.StopPointName === activeLocation) { estimatedCalls.push(current) }
            })
        }
        else {
            const data = current.EstimatedCall as EstimatedCall;
            if (data.StopPointName === activeLocation) { estimatedCalls.push(data) }
        }
    })
    return estimatedCalls
}

function isArray(estimatedCall: EstimatedCall | EstimatedCall[]): estimatedCall is EstimatedCall {
    const check = estimatedCall as EstimatedCall
    return (check).StopPointRef === undefined;
}
