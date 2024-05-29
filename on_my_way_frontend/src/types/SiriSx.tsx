export type SiriSxResponse = {
    version: string;
    ServiceDelivery: ServiceDelivery;
}

type ServiceDelivery = {
    ResponseTimestamp: string;
    ProducerRef: string;
    SituationExchangeDelivery: SituationExchangeDelivery;
}

type SituationExchangeDelivery = {
    ResponseTimestamp: string;
    Situations: any;
}

export type Situations = {
    PtSituationElement: PtSituationElement[]  
}

export type PtSituationElement = {
    CreationTime: string;
    ParticipantRef: string;
    SituationNumber: string;
    Source: {
        SourceType: string;
    };
    VersionedAtTime: string;
    Progress: string;
    ValidityPeriod: ValidityPeriod;
    UndefinedReason?: string;
    Priority: number;
    ReportType: string;
    Summary: { [lang: string]: string };
    Description: {
        _: string; // Text content of the description
        $: {
            'xml:lang': string; // Language attribute
        };
    }[];
    Affects: Affects;
}



type ValidityPeriod = {
    StartTime: string;
    EndTime: string;
}

type AffectedStopPoint = {
    StopPointRef: string;
    StopPointName: string;
    StopCondition: string[];
}

type AffectedRoute = {
    StopPoints: AffectedStopPoint[];
}

type AffectedLine = {
    LineRef: string;
    Routes: AffectedRoute[];
}

type AffectedNetwork = {
    AffectedLine: AffectedLine[];
}

type Networks = {
    AffectedNetwork: AffectedNetwork[];
}

type Affects = {
    Networks: Networks[];
}


