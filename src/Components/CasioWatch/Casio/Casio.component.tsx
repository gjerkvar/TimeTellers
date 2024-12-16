import { useEffect, useState } from "react";
import { TimeDisplay } from "../TimeDisplay/TImeDisplay.component";
import { AlarmDisplay } from "../AlarmDisplay/AlarmDisplay.component";
import { StopwatchDisplay } from "../StopwatchDisplay/StopwatchDisplay.component";
import "./Casio.css";
import { loadFromLocalStorage, playCasioSound } from "./Casio.helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export enum WatchMode {
  TIME = "time",
  STOPWATCH = "stopwatch",
  ALARM = "alarm",
}

export enum AlarmSetMode {
  NONE = "none",
  HOUR = "hour",
  MINUTE = "minute",
}

export const ChimeIcon = () => (
  <svg
    width="45"
    height="20"
    viewBox="0 0 45 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Narrow flat-sided "D" */}
    <path
      d="M2 4 H4 A4 6 0 0 1 4 16 H2 V4 Z"
      fill="black"
    />

    {/* Four equal-sized curved lines */}
    <path
      d="M8 5 Q10 10, 8 15"
      stroke="black"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M12 5 Q14 10, 12 15"
      stroke="black"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M16 5 Q18 10, 16 15"
      stroke="black"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M20 5 Q22 10, 20 15"
      stroke="black"
      strokeWidth="2"
      fill="none"
    />

    {/* Square bracket `]` with adjusted spacing */}
    <path
      d="M23 5 H26 V15 H23"
      stroke="black"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);






export const Casio = () => {
  const modes = ["time", "stopwatch", "alarm"];
  const [currentModeIndex, setCurrentModeIndex] = useState<number>(0);
  const [lightOn, setLightOn] = useState<boolean>(false);
  const [chimeAlarmState, setChimeAlarmState] = useState<number>(0); // 0: OFF, 1: Chime ON, 2: Alarm ON, 3: Both ON
  const [alarmSetMode, setAlarmSetMode] = useState<AlarmSetMode>(
    AlarmSetMode.NONE
  );
  const [timeTopText, setTimeTopText] = useState<string>("");
  const [is24hTime, setIs24hTime] = useState<boolean>(true);
  const [stopwatchTime, setStopwatchTime] = useState<number>(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState<boolean>(false);

  const [alarmTime, setAlarmTime] = useState<string>(() =>
    loadFromLocalStorage("alarmTime", "07:00")
  );
  const [alarmOn, setAlarmOn] = useState<boolean>(() =>
    loadFromLocalStorage("alarmOn", false)
  );
  const [chimeOn, setChimeOn] = useState<boolean>(() =>
    loadFromLocalStorage("chimeOn", false)
  );

  const getDayDate = () => {
    const currentTime = new Date();
    const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"]; // Days as displayed on a Casio watch
    const day = days[currentTime.getDay()];
    const date = currentTime.getDate().toString();
    return `${day} ${date}`;
  };


  useEffect(() => {
    const watchData = {
      alarmTime,
      alarmOn,
      chimeOn,
      is24hTime,
    };
    localStorage.setItem("casiWatchData", JSON.stringify(watchData));
  }, [alarmTime, alarmOn, chimeOn]);


  const toggleAlarmSetMode = (currentMode: AlarmSetMode): AlarmSetMode => {
    switch (currentMode) {
      case AlarmSetMode.NONE:
        return AlarmSetMode.HOUR;
      case AlarmSetMode.HOUR:
        return AlarmSetMode.MINUTE;
      case AlarmSetMode.MINUTE:
        return AlarmSetMode.NONE;
      default:
        return AlarmSetMode.NONE;
    }
  };

  const twentyFourhButtonInAlarmMode = (currentModeIndex: number) => {
    if (alarmSetMode === AlarmSetMode.NONE) {
      // Toggle chime and alarm states when not in set mode

      setChimeAlarmState((prevState) => (prevState + 1) % 4);
      switch (chimeAlarmState) {
        case 0: // Both OFF
          setChimeOn(false);
          setAlarmOn(false);
          break;
        case 1: // Chime ON, Alarm OFF
          setChimeOn(true);
          setAlarmOn(false);
          break;
        case 2: // Chime OFF, Alarm ON
          setChimeOn(false);
          setAlarmOn(true);
          break;
        case 3: // Both ON
          setChimeOn(true);
          setAlarmOn(true);
          break;
      }
    } else {
      // Increment hours or minutes in set mode
      if (alarmSetMode === AlarmSetMode.HOUR) {
        adjustAlarmTime("hour", 1);
      } else if (alarmSetMode === AlarmSetMode.MINUTE) {
        adjustAlarmTime("minute", 1);
      }
    }
  };

  const handleModeChange = (currentModeIndex: number) => {
    setCurrentModeIndex(
      (currentModeIndex) => (currentModeIndex + 1) % modes.length
    );
  };

  const adjustAlarmTime = (unit: "hour" | "minute", increment: number) => {
    const [hours, minutes] = alarmTime.split(":").map(Number);
    if (unit === "hour") {
      const newHours = (hours + increment + 24) % 24;
      setAlarmTime(
        `${String(newHours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}`
      );
    } else if (unit === "minute") {
      const newMinutes = (minutes + increment + 60) % 60;
      setAlarmTime(
        `${String(hours).padStart(2, "0")}:${String(newMinutes).padStart(
          2,
          "0"
        )}`
      );
    }
  };

  const handleLightButton = (currentModeIndex: number) => {
    switch (modes[currentModeIndex]) {
      case WatchMode.TIME:
        setLightOn(true);
        break;
      case WatchMode.ALARM:
        setLightOn(true);
        setAlarmSetMode((prevMode: AlarmSetMode) =>
          toggleAlarmSetMode(prevMode)
        );
        break;
      case WatchMode.STOPWATCH:
        setLightOn(true);
        setStopwatchTime(0);
        break;
    }
  };

  const handleOnOff24hButton = (currentModeIndex: number) => {
    switch (modes[currentModeIndex]) {
      case WatchMode.TIME:
        setIs24hTime(!is24hTime);
        break;
      case WatchMode.ALARM:
        twentyFourhButtonInAlarmMode(currentModeIndex);
        break;
      case WatchMode.STOPWATCH:
        setIsStopwatchRunning(!isStopwatchRunning);
        break;
    }
  };

  const getModeContent = (currentModeIndex: number) => {
    switch (modes[currentModeIndex]) {
      case WatchMode.TIME:
        return {
          topText: getDayDate(),
          component: (
            <TimeDisplay
              is24hTime={is24hTime}
              setIs24hTime={setIs24hTime}
              timeTopText={timeTopText}
              setTimeTopText={setTimeTopText}
            />
          ),
        };
      case WatchMode.ALARM:
        return {
          topText: "AL",
          component: (
            <AlarmDisplay
              alarmTime={alarmTime}
              setAlarmTime={setAlarmTime}
              alarmSetMode={alarmSetMode}
            />
          ),
        };
      case WatchMode.STOPWATCH:
        return {
          topText: "ST",
          component: (
            <StopwatchDisplay
              isStopwatchRunning={isStopwatchRunning}
              setIsStopwatchRunning={setIsStopwatchRunning}
              stopwatchTime={stopwatchTime}
              setStopwatchTime={setStopwatchTime}
            />
          ),
        };
      default:
        return {
          topText: getDayDate(),
          component: (
            <TimeDisplay
              is24hTime={is24hTime}
              setIs24hTime={setIs24hTime}
              timeTopText={timeTopText}
              setTimeTopText={setTimeTopText}
            />
          ),
        };
    }
  };

  return (
    <div>
      <button onClick={() => handleLightButton(currentModeIndex)}>Light</button>
      <button onClick={() => playCasioSound('casioalarm.wav', 4)}>Play Alarm</button>
<button onClick={() => playCasioSound('casiohourchime.wav', 0.6)}>Play Hourly Chime</button>

      <button onClick={() => handleModeChange(currentModeIndex)}>
        Next mode
      </button>
      <button onClick={() => handleOnOff24hButton(currentModeIndex)}>
        Alarm ON/OFF/24HR
      </button>
      <div className="casio-lcd">
        {chimeOn && <ChimeIcon/>}
        {alarmOn &&<FontAwesomeIcon icon={faBell}/>}
        <p>{getModeContent(currentModeIndex)?.topText}</p>
        {getModeContent(currentModeIndex).component}
      </div>
    </div>
  );
};
