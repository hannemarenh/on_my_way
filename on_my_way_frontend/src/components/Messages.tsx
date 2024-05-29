import { PtSituationElement, SiriSxResponse, Situations } from "../types/SiriSx";
import { fetchSiriSxData } from "../utils/GetSiriSxData";
export default async function Messages() {
    const message: SiriSxResponse = await fetchSiriSxData();
    const noMessages = message.ServiceDelivery.SituationExchangeDelivery.Situations == ''

    if (noMessages) return (<p>No situations with the train</p>);

    const situations = message.ServiceDelivery.SituationExchangeDelivery.Situations as Situations

    return (
        <>
            {situations.PtSituationElement.map((current: PtSituationElement) => {
                const startTime = new Date(current.ValidityPeriod.StartTime).toLocaleString('no-NO');
                const endTime = new Date(current.ValidityPeriod.EndTime).toLocaleString('no-NO');
                const updated = new Date(current.VersionedAtTime).toLocaleString('no-NO');
                return (
                    <div key={current.SituationNumber} className="p-4">
                        <p> Forventet fra {startTime} to {endTime}</p>
                        <p>
                            {current.Description[0]._}
                        </p>
                        <p className="italic"> (Sist oppdatert {updated})</p>
                    </div>
                )
            })}
        </>
    )
}

