import { useEffect, useState } from "react";
import { TimeDisplayProps } from "./TimeDisplayTypes";

export const TimeDisplay = (props: TimeDisplayProps) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timeTopText, setTimeTopText] = useState(props.is24hTime ? "24h" : "");

    useEffect(() => {
        if (props.is24hTime) {
            setTimeTopText("24h");
        } else {
            const hours24 = currentTime.getHours();
            setTimeTopText(hours24 >= 12 ? "PM" : "AM");
        }
    }, [props.is24hTime, currentTime]); 

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval); 
    }, []);

    const getCurrentTime = () => {
        let hours;
        const minutes = currentTime.getMinutes().toString().padStart(2, "0");
        const seconds = currentTime.getSeconds().toString().padStart(2, "0");

        if (props.is24hTime) {
            hours = currentTime.getHours().toString().padStart(2, "0");
        } else {
            const hours24 = currentTime.getHours();
            const hours12 = hours24 % 12 || 12; // Convert 24-hour to 12-hour format
            hours = hours12.toString();
        }

        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div>
            <p>{timeTopText}</p>
            <p>{getCurrentTime()}</p>
        </div>
    );
};
