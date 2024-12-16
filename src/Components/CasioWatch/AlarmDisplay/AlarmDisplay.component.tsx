import { AlarmDisplayProps } from "./AlarmDisplay.types";
import "../Casio/Casio.css";
import { AlarmSetMode } from "../Casio/Casio.component";

export const AlarmDisplay = (props: AlarmDisplayProps) => {

    console.log(props.alarmTime,"wtf am I?")

return (
    <div>
      <p>
        <span
          className={
            props.alarmSetMode === AlarmSetMode.HOUR ? "active-digit" : ""
          }
        >
          {props.alarmTime.split(":")[0]}
        </span>
        <span>:</span>
        <span
          className={
            props.alarmSetMode === AlarmSetMode.MINUTE ? "active-digit" : ""
          }
        >
          {props.alarmTime.split(":")[1]}
        </span>
      </p>
    </div>
  );
};
