import { error } from 'console';
import { EtRequestData, LineRef, generateEtRequestDataAsXml } from '../siriRequests/GenerateEtRequest';
import { SiriEtResponse } from '../types/SiriEt';

export async function fetchSiriEtData(line: LineRef) {
    const apiKey = process.env.ET_API_KEY;
    const requestorRef = process.env.ET_REQUESTOR_REF;
    const timestamp = new Date().toISOString()
    const direction = "south"
    const url = "https://api.banenor.no/customer-info/siri-et/v2.1/rest";

    if (apiKey == undefined || requestorRef == undefined) {
        throw error("Unable to read .env.local. This makes RequestorRef and/or API key undefined. ")
    }

    const requestData: EtRequestData = {
        RequestorRef: requestorRef,
        RequestTimestamp: timestamp,
        LineRef: line,
        Direction: direction
    };

    const xmlRequestBody = generateEtRequestDataAsXml(requestData);

    const response = await fetch(url, {
        method: "POST",
        body: xmlRequestBody,
        headers: {
            "Ocp-Apim-Subscription-Key": apiKey,
            "Content-Type": "application/xml",
        },
        next: { revalidate: 120 }
    })
    const xmlResponse = await response.text();
    return parseXml(xmlResponse);
}

function parseXml(xmlString: string): Promise<SiriEtResponse> {
    var xml2js = require('xml2js');
    var ParseString = new xml2js.Parser({ explicitArray: false }).parseString;

    return new Promise((resolve, reject) => {
        ParseString(xmlString, (err: any, result: any) => {
            if (err) {
                reject(err);
            } else {
                const siri: SiriEtResponse = result['Siri'];
                resolve(siri);
            }
        });
    });
}
