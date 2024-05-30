import { Direction } from "../siriRequests/GenerateEtRequest"
export enum TrainStation { "eidsvollVerk" = "Eidsvoll Verk", "skoyen" = "Sk\u00f8yen stasjon", "osl" = "Oslo lufthavn stasjon" };

export type something = {
    trainStation: TrainStation,
    direction: Direction
}
