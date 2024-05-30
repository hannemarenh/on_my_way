import { LineRef } from "../types/TrainStation";

export type EtRequestData = {
    RequestorRef: string;
	RequestTimestamp: string;
	LineRef: LineRef;
};


export function generateEtRequestDataAsXml({ RequestorRef, RequestTimestamp, LineRef }: EtRequestData): string {
    return (
        `<Siri xmlns="http://www.siri.org.uk/siri" version="2.1" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
		<ServiceRequest>
			<RequestTimestamp>${RequestTimestamp}</RequestTimestamp>
			<RequestorRef>${RequestorRef}</RequestorRef>
			<EstimatedTimetableRequest version="1.1">
				<RequestTimestamp>${RequestTimestamp}</RequestTimestamp>
				<PreviewInterval>PT60M</PreviewInterval>
				<OperatorRef>NSB</OperatorRef>
				<Lines>
					<LineDirection>
						<LineRef>${LineRef}</LineRef>
					</LineDirection>
				</Lines>
				<Extensions>
					<ServiceFeatureRef>passengerTrain</ServiceFeatureRef>
				</Extensions>
			</EstimatedTimetableRequest>
		</ServiceRequest>
		</Siri>`
    );
}
