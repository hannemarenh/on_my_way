import { Location } from '../types/Location'

type LocationToggleWeatherProps = {
    activeLocation: Location
    onChange: () => void
}

export default function LocationToggleWeather({ activeLocation, onChange }: LocationToggleWeatherProps) {
    const activeButtonStyle: string = "bg-gray-200 text-gray-800 font-bold py-2 px-4";
    const disabledButtonStyle: string = "bg-gray-500 text-gray-800 font-bold py-2 px-4";
    return (
        <div>
            <button
                className={"rounded-l " + (activeLocation != Location.eidsvollVerk ? disabledButtonStyle : activeButtonStyle)}
                type="button"
                onClick={onChange}
                disabled={activeLocation == Location.eidsvollVerk}
            >
                {Location.eidsvollVerk}
            </button>
            <button
                className={"rounded-r " + (activeLocation != Location.oslo ? disabledButtonStyle : activeButtonStyle)}
                type="button"
                onClick={onChange}
                disabled={activeLocation == Location.oslo}
            >
                {Location.oslo}
            </button>
        </div>

    )

}