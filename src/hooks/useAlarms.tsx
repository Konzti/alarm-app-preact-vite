import { useContext } from "preact/hooks"
import { AlarmsContext } from "@/context/alarmContext"

export const useAlarms = () => {
  const {
    alarms,
    addAlarm,
    removeAlarm,
    editAlarm,
    selectedAlarm,
    setAlarmToEdit,
    stopSound,
    alarmPlaying,
    loading,
  } = useContext(AlarmsContext)

  return {
    alarms,
    addAlarm,
    removeAlarm,
    editAlarm,
    selectedAlarm,
    setAlarmToEdit,
    stopSound,
    alarmPlaying,
    loading,
  }
}
