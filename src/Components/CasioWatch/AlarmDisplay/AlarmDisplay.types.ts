import { AlarmSetMode } from "../Casio/Casio.component";

export interface AlarmDisplayProps {
    alarmTime: string;
    setAlarmTime: (value: string) => void;
    alarmSetMode: AlarmSetMode;
}