export interface StopwatchProps  {
    isStopwatchRunning : boolean;
    setIsStopwatchRunning: (value: boolean) => void;
    stopwatchTime: number;
    setStopwatchTime: (value: number | ((prev: number) => number)) => void;
}