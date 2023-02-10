/* eslint-disable no-unused-vars */
import { useAlarms } from "@/hooks/useAlarms"
import { Alarm } from "@/types"

type AlarmProps = {
  alarm: Alarm
  checkAlarm: (alarm: Alarm) => void
  openEditModal: () => void
}

const AlarmComponent = ({ alarm, checkAlarm, openEditModal }: AlarmProps) => {
  const { setAlarmToEdit } = useAlarms()
  const onComponentClick = () => {
    setAlarmToEdit(alarm)
    openEditModal()
    console.log(alarm.id, alarm.time, alarm.repeat, alarm.active)
  }

  return (
    <div
      className={
        alarm.active
          ? "flex items-center justify-between bg-gray-800 p-3 rounded-xl shadow-md"
          : "flex items-center justify-between bg-gray-700 p-3 rounded-xl shadow-md"
      }
    >
      <div
        className="flex flex-1 h-full items-center cursor-pointer"
        onClick={onComponentClick}
      >
        <div className={alarm.active ? "text-white" : "text-gray-400"}>
          <h2>{alarm.time}</h2>
          <p>{alarm.repeat}</p>
        </div>
      </div>
      <div className="p-3">
        <label className="group">
          <input
            hidden
            type="checkbox"
            name="activate"
            id="activate"
            className="peer"
            defaultChecked={alarm.active}
            checked={alarm.active}
            onChange={() => {
              checkAlarm(alarm)
            }}
          />
          <div className="w-12 h-6 p-1 rounded-xl cursor-pointer bg-slate-400 peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:bottom-1/2 after:translate-y-1/2 after:w-5 after:h-5 after:rounded-full after:bg-gray-200 after:left-[.15rem] after:transition-all after:duration-200 peer-checked:after:translate-x-[115%]" />
        </label>
      </div>
    </div>
  )
}

export default AlarmComponent
