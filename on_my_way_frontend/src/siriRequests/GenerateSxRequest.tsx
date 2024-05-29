export type SxRequestData = {
    RequestorRef: string;
    RequestTimestamp: string;
    LineRefs: string[];
};

export function generateSxRequestDataAsXml({ RequestorRef, RequestTimestamp, LineRefs }: SxRequestData ): string {
    const lineRefsXml = LineRefs.map(lineRef => `<LineRef>${lineRef}</LineRef>`).join('\n');

    return (
        `<?xml version="1.0" encoding="utf-8"?>
        <Siri xmlns="http://www.siri.org.uk/siri" version="2.1" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <ServiceRequest>
                <RequestTimestamp>${RequestTimestamp}</RequestTimestamp>
                <RequestorRef>${RequestorRef}</RequestorRef>
                <SituationExchangeRequest version="1.1">
                    <RequestTimestamp>${RequestTimestamp}</RequestTimestamp>
                    ${lineRefsXml}
                </SituationExchangeRequest>
            </ServiceRequest>
        </Siri>`
    );
}
