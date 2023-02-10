import { useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"
import { useAlarms } from "@/hooks/useAlarms"
import { AlarmRepeat } from "@/types"

type ModalProps = {
  close: () => void
}

const Modal = ({ close }: ModalProps) => {
  const { addAlarm } = useAlarms()
  const [time, setTime] = useState<string>("")
  const disabled = time.length < 3

  const onInputChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    setTime(e.currentTarget.value)
  }

  const onAdd = () => {
    if (disabled) return
    addAlarm(time, AlarmRepeat.ONCE)
    close()
  }

  return (
    <div className="fixed w-full max-w-[600px] h-screen flex flex-col justify-center bg-gray-500 bg-opacity-50 z-[100] p-3">
      <div className="w-full flex flex-col items-center justify-center gap-3 p-3 bg-black rounded-xl">
        <h1 className="text-xl text-center">Add Alarm</h1>
        <input
          type="time"
          name="time"
          id="time"
          className="p-3 rounded-xl cursor-pointer text-blue-700"
          onChange={onInputChange}
        />
        <div>
          {disabled ? (
            <span className="text-lg">Please select a time</span>
          ) : (
            <span className="text-lg">{time}</span>
          )}
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            className="p-3 bg-green-500 rounded-xl disabled:opacity-50 hover:bg-green-600"
            disabled={disabled}
            onClick={onAdd}
          >
            Add
          </button>
          <button
            className="p-3 bg-gray-500 rounded-xl hover:bg-gray-700"
            onClick={close}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
