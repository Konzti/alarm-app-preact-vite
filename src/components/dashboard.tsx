import { useAlarms } from "@/hooks/useAlarms"
import Clock from "./clock"

const Dashboard = () => {
  const { alarmPlaying, stopSound } = useAlarms()
  return (
    <div className="flex flex-col justify-center items-center px-3 h-[300px]">
      {alarmPlaying ? (
        <>
          <h1 className="text-2xl text-center mb-3">Alarm is playing</h1>
          <button
            className="bg-red-600 p-3 rounded-xl hover:bg-red-800"
            onClick={stopSound}
          >
            Stop
          </button>
        </>
      ) : (
        // </div>
        <Clock width={220} />
      )}
    </div>
  )
}

export default Dashboard
