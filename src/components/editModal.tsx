/* eslint-disable no-unused-vars */
import { useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"
import { useAlarms } from "@/hooks/useAlarms"
import { audioSources } from "@/data/audio"
import { Alarm, AlarmAudio, AlarmRepeat } from "@/types"

type EditModalProps = {
  close: () => void
  alarm: Alarm | null
}

const EditModal = ({ close, alarm }: EditModalProps) => {
  if (alarm === null) throw new Error("Alarm is null")

  const { editAlarm, removeAlarm } = useAlarms()
  const [time, setTime] = useState<string>(alarm.time)
  const [repeatMenuOpen, setRepeatMenuOpen] = useState<boolean>(false)
  const [audioMenuOpen, setAudioMenuOpen] = useState<boolean>(false)
  const [repeat, setRepeat] = useState<AlarmRepeat>(alarm.repeat)
  const [alarmAudio, setAlarmAudio] = useState<AlarmAudio>(alarm.audio)
  const disabled = time.length < 3

  const onInputChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    setTime(e.currentTarget.value)
  }

  const onEditSave = () => {
    if (disabled) return
    editAlarm(alarm.id, { ...alarm, time, repeat, audio: alarmAudio })
    close()
  }

  const onDelete = () => {
    removeAlarm(alarm.id)
    close()
  }

  return (
    <div className="fixed w-full max-w-[600px] h-screen flex flex-col justify-center bg-gray-500 bg-opacity-50 z-[100] p-3">
      <div className="w-full flex flex-col items-center justify-center gap-3 p-3 bg-black rounded-xl">
        <h1 className="text-xl text-center">Edit Alarm</h1>
        <div className="flex gap-3 items-center justify-center">
          <input
            type="time"
            name="time"
            id="time"
            className="p-3 rounded-xl cursor-pointer text-blue-700"
            defaultValue={alarm.time}
            onChange={onInputChange}
          />
          <div className="relative">
            <button
              className="inline-flex items-center bg-blue-600 p-3 rounded-xl hover:bg-blue-800"
              onClick={() => setRepeatMenuOpen((prev) => !prev)}
            >
              <span>Repeat: {repeat}</span>
              <span>
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
            {repeatMenuOpen ? (
              <div className="absolute left-0 right-0 py-3 bg-gray-500 rounded-xl mt-1">
                <ul>
                  {Object.values(AlarmRepeat).map((val, i) => (
                    <li
                      key={i}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-600"
                      onClick={() => {
                        setRepeat((prev) => val)
                        setRepeatMenuOpen(false)
                      }}
                    >
                      {val}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="relative">
            <button
              className="inline-flex items-center bg-blue-600 p-3 rounded-xl hover:bg-blue-800"
              onClick={() => setAudioMenuOpen((prev) => !prev)}
            >
              <span>Audio: {alarmAudio.name}</span>
              <span>
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
            {audioMenuOpen ? (
              <div className="absolute left-0 right-0 py-3 bg-gray-500 rounded-xl mt-1">
                <ul>
                  {audioSources.map((audioSrc) => (
                    <li
                      key={audioSrc.id}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-600"
                      onClick={() => {
                        setAlarmAudio((prev) => audioSrc)
                        setAudioMenuOpen(false)
                      }}
                    >
                      {audioSrc.name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
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
            onClick={onEditSave}
          >
            Save
          </button>
          <button
            className="p-3 bg-red-500 rounded-xl disabled:opacity-50 hover:bg-red-700"
            disabled={disabled}
            onClick={onDelete}
          >
            Delete
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

export default EditModal
