import { Alarm } from "@/types"

const AlarmsHeader = ({ alarms }: { alarms: Alarm[] }) => {
  const numberOfAlarms = alarms.length.toString()
  return (
    <div className="bg-primary bg-opacity-90 sticky top-[10vh] z-50 p-3">
      <h1 className="mb-3">My {numberOfAlarms} Alarms</h1>
    </div>
  )
}

export default AlarmsHeader
