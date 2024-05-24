export enum Location { "eidsvollVerk" = "Eidsvoll Verk", "oslo" = "Oslo" };

export type LocationData = {
    location: Location,
    latitudeInDegrees: number,
    longitudeInDegrees: number
}

export const eidsvollVerkData: LocationData = {
    location: Location.eidsvollVerk,
    latitudeInDegrees: 60.30,
    longitudeInDegrees: 11.53
}

export const osloData: LocationData = {
    location: Location.oslo,
    latitudeInDegrees: 59.94,
    longitudeInDegrees: 10.72
}