import Image from 'next/image';

type IllustrationProps = {
    minutesToNextTrain: number
}

export default function Illustration({ minutesToNextTrain }: IllustrationProps) {
    let imageUrl: string;
    if (minutesToNextTrain > 12) {
        imageUrl = "/turtle.svg";
    } else if (minutesToNextTrain >= 5 && minutesToNextTrain <= 12) {
        imageUrl = "/walk.svg";
    } else {
        imageUrl = "/run.svg";
    }

    return (
        <div>
            <Image
                src={imageUrl}
                width={50}
                height={50}
                alt={imageUrl}
            />
        </div>
    )
}