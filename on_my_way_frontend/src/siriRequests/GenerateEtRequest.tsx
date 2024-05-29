export type EtRequestData = {
    RequestorRef: string;
	RequestTimestamp: string;
	LineRef: LineRef;
	Direction: Direction
};

export enum LineRef {
	R12 = "NSB:Line:L12",
	RE11 = "NSB:Line:R11"
}

export type Direction = "north" | "south";


export function getDirectionRef(lineRef: LineRef, direction: Direction) {
	if (direction == "south") {
		switch (lineRef) {
			case LineRef.R12: {
				return "KBG";
			}
			case LineRef.RE11: {
				return "SKN";
			}
		}
	}

	switch (lineRef) {
		case LineRef.R12: {
			return "EVL";
		}
		case LineRef.RE11: {
			return "EVL";
		}
	}
}
export function generateEtRequestDataAsXml({ RequestorRef, RequestTimestamp, LineRef, Direction }: EtRequestData): string {
	const directionRef = getDirectionRef(LineRef, Direction);
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
						<DirectionRef>${directionRef}</DirectionRef>
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
