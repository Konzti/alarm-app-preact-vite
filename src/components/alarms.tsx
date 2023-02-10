import { PlusOutlined } from "@ant-design/icons"

import { useAlarms } from "@/hooks/useAlarms"
import { Alarm } from "@/types"
import AlarmComponent from "./alarmComponent"
import AlarmsHeader from "./alarmsHeader"

type AlarmsProps = {
  openModal: () => void
  openEditModal: () => void
}

const Alarms = ({ openModal, openEditModal }: AlarmsProps) => {
  const { alarms, editAlarm } = useAlarms()

  const checkAlarm = (alarm: Alarm) => {
    Notification.requestPermission()
      .then((res) => console.log(res))
      .catch((err) => console.log(err))

    editAlarm(alarm.id, { ...alarm, active: !alarm.active })
  }
  return (
    <>
      {alarms.length ? (
        <div className="bg-primary pb-3 px-3 min-h-[90vh]">
          <AlarmsHeader alarms={alarms} />
          <div className="flex flex-col gap-2 overflow-auto">
            {alarms.map((alarm) => (
              <AlarmComponent
                key={alarm.id}
                alarm={alarm}
                checkAlarm={checkAlarm}
                openEditModal={openEditModal}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-primary py-3 px-3 flex-1 flex items-center justify-center">
          <h1 className="text-xl">No alarms</h1>
        </div>
      )}
      <AddAlarmButton openModal={openModal} />
    </>
  )
}

const AddAlarmButton = ({ openModal }: { openModal: () => void }) => {
  return (
    <div className="w-[4rem] h-[4rem] fixed right-1/2 bottom-12 translate-x-1/2">
      <button
        className="bg-blue-600 w-full h-full text-4xl rounded-full shadow-lg flex items-center justify-center"
        onClick={openModal}
      >
        <PlusOutlined />
      </button>
    </div>
  )
}

export default Alarms
