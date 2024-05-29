import { error } from 'console';
import { SxRequestData, generateSxRequestDataAsXml } from '../siriRequests/GenerateSxRequest';
import { SiriSxResponse } from '../types/SiriSx';

export async function fetchSiriSxData() {
    const apiKey = process.env.SX_API_KEY;
    const requestorRef = process.env.SX_REQUESTOR_REF;
    const timestamp = new Date().toISOString()
    const lines = ['R12', 'RE11']
    const url = "https://api.banenor.no/customer-info/siri-sx/v2.1/rest";

    if (apiKey == undefined || requestorRef == undefined) {
        throw error("Unable to read .env.local. This makes RequestorRef and/or API key undefined. ")
    }

    const requestData: SxRequestData = {
        RequestorRef: requestorRef,
        RequestTimestamp: timestamp,
        LineRefs: lines
    };

    const xmlRequestBody = generateSxRequestDataAsXml(requestData);

    const response = await fetch(url, {
        method: "POST",
        body: xmlRequestBody,
        headers: {
            "Ocp-Apim-Subscription-Key": apiKey,
            "Content-Type": "application/xml",
        }
    })
    const xmlResponse = await response.text();
    return parseXml(xmlResponse);
}

function parseXml(xmlString: string): Promise<SiriSxResponse> {
    var xml2js = require('xml2js');
    var ParseString = new xml2js.Parser({ explicitArray: false }).parseString;

    return new Promise((resolve, reject) => {
        ParseString(xmlString, (err: any, result: any) => {
            if (err) {
                reject(err);
            } else {
                const siri: SiriSxResponse = result['Siri'];
                resolve(siri);
            }
        });
    });
}
