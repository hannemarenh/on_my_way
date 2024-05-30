"use client"
import { useRouter } from 'next/navigation';

export default function RefreshWindow(){
    const router = useRouter();
    const handleRefresh = () => {
        router.refresh();
    };
    return (
        <div className="p-2 bg-gray-200 text-gray-800 rounded">
            <button onClick={handleRefresh}>refresh</button>
        </div>
    );
};
