import { useEffect, useState } from "react";
import { StopwatchProps } from "./StopwatchTypes";


export const StopwatchDisplay = (props: StopwatchProps) => {
/*     const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const [time, setTime] = useState<number>(0);
 */
    useEffect(() => {
        if(props.isStopwatchRunning) {
            const interval = setInterval(() => {
                props.setStopwatchTime((time: number) => time  + 10)
            }, 10);
    
            return () => clearInterval(interval);
        }
    },[props.isStopwatchRunning])

    const handleStartStopPress = () => {
      props.setIsStopwatchRunning(!props.isStopwatchRunning);
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time/6000)
            .toString()
            .padStart(2,"0");
        const seconds = Math.floor((time % 6000) / 1000)
            .toString()
            .padStart(2,"0");
        const hundreths = Math.floor((time % 1000) / 10)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}:${hundreths}`;
    }

    return (
        <div>
            <p>{formatTime(props.stopwatchTime)}</p>
        </div>
    )
}