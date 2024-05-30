import { TrainStation } from "../types/TrainStation";

type LocationToggleTrainProps = {
    activeLocation: TrainStation
    onChange: (newLocation: TrainStation) => void
}

export default function LocationToggleTrain({ activeLocation, onChange }: LocationToggleTrainProps) {
    const activeButtonStyle: string = "bg-gray-200 text-gray-800 font-bold py-2 px-4";
    const disabledButtonStyle: string = "bg-gray-500 text-gray-800 font-bold py-2 px-4";

    return (
        <div>
            <button
                className={"rounded-l " + (isActive(activeLocation, TrainStation.eidsvollVerk) ? activeButtonStyle : disabledButtonStyle )}
                type="button"
                onClick={()=>onChange(TrainStation.eidsvollVerk)}
                disabled={activeLocation == TrainStation.eidsvollVerk}
            >
                Til Bin
            </button>
            <button
                className={(isActive(activeLocation, TrainStation.skoyen) ? activeButtonStyle: disabledButtonStyle )}
                type="button"
                onClick={() => onChange(TrainStation.skoyen)}
                disabled={activeLocation == TrainStation.skoyen}
            >
                Fra Skoyen
            </button>
            <button
                className={"rounded-r " + ((isActive(activeLocation, TrainStation.osl) ? activeButtonStyle: disabledButtonStyle ))}
                type="button"
                onClick={() => onChange(TrainStation.osl)}
                disabled={activeLocation == TrainStation.osl}
            >
            Fra Osl
            </button>
        </div>

    )

}

function isActive(activeLocation: TrainStation, current: TrainStation) {
    return activeLocation === current
}