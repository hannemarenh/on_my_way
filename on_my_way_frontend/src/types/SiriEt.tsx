export type SiriEtResponse = {
    ServiceDelivery: ServiceDelivery;
}
type ServiceDelivery = {
    ResponseTimestamp: string;
    ProducerRef: string;
    EstimatedTimetableDelivery: EstimatedTimetableDelivery;
}
type EstimatedTimetableDelivery = {
    version: string;
    ResponseTimestamp: string;
    EstimatedJourneyVersionFrame: EstimatedJourneyVersionFrame;
}
type EstimatedJourneyVersionFrame = {
    RecordedAtTime: string;
    EstimatedVehicleJourney: EstimatedVehicleJourney[];
}
export type EstimatedVehicleJourney = {
    RecordedAtTime: string;
    LineRef: string;
    DirectionRef: string;
    DatedVehicleJourneyRef: string;
    VehicleMode: string;
    PublishedLineName: string;
    OriginName: string;
    DestinationName: string;
    ServiceFeatureRef: string;
    DataSource: string;
    VehicleRef: string;
    RecordedCalls?: RecordedCalls;
    EstimatedCalls?: EstimatedCalls;
    IsCompleteStopSequence: boolean;
}

type RecordedCalls = {
    RecordedCall: RecordedCall | RecordedCall[]
}
export type EstimatedCalls = {
    EstimatedCall: any
}

 export type EstimatedCall = {
    StopPointRef: string;
    StopPointName: string;
    AimedArrivalTime: string;
    ExpectedArrivalTime: string;
    ArrivalStatus: string;
    ArrivalBoardingActivity: string;
    AimedDepartureTime?: string;
    ExpectedDepartureTime?: string;
    DepartureStatus?: string;
    DepartureBoardingActivity?: string;
}

type RecordedCall = {
    StopPointRef: string;
    StopPointName: string;
    ActualArrivalTime?: string;
    AimedArrivalTime?: string;
    ActualDepartureTime?: string;
    AimedDepartureTime?: string;
}
