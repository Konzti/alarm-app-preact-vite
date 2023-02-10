/* eslint-disable no-unused-vars */
import { createContext, FunctionComponent } from "preact"
import { useCallback, useEffect, useMemo, useRef, useState } from "preact/hooks"
import { get, set } from "idb-keyval"
import { audioSources } from "@/data/audio"
import { ALARMS_KEY } from "@/constants"
import { Alarm, AlarmRepeat } from "@/types"

const initalContext = {
  alarms: [] as Alarm[],
  selectedAlarm: null as Alarm | null,
  setAlarmToEdit: (alarm: Alarm) => {},
  addAlarm: (time: string, repeat: AlarmRepeat.ONCE) => {},
  removeAlarm: (id: number) => {},
  editAlarm: (id: number, alarm: Alarm) => {},
  alarmPlaying: false,
  stopSound: () => {},
  loading: false,
}

export const AlarmsContext = createContext<typeof initalContext>(initalContext)

export const AlarmsProvider: FunctionComponent = ({ children }) => {
  const [alarms, setAlarms] = useState<Alarm[]>(initalContext.alarms)
  const [alarmPlaying, setAlarmPlaying] = useState<boolean>(
    initalContext.alarmPlaying
  )
  const [loading, setLoading] = useState<boolean>(initalContext.loading)
  const [selectedAlarm, setSelectedAlarm] = useState<Alarm | null>(null)
  const audioRef = useRef<HTMLAudioElement>()

  const getDBKeyVal = useCallback(async () => {
    const items: string | undefined = await get(ALARMS_KEY)
    if (!items) return []
    const parsedItems: Alarm[] = JSON.parse(items)
    return parsedItems
  }, [])

  const updateDbKeyVal = useCallback(async () => {
    try {
      await set(ALARMS_KEY, JSON.stringify(alarms))
    } catch (err) {
      console.log(err)
    }
  }, [alarms])

  const addAlarm = useCallback(
    (time: string, repeat: AlarmRepeat = AlarmRepeat.ONCE) => {
      let alarm: Alarm = {
        id: Date.now(),
        time,
        repeat,
        active: false,
        audio: audioSources[0],
      }
      setAlarms((prev) => [...alarms, alarm])
    },
    [alarms]
  )

  const removeAlarm = useCallback(
    (id: number) => {
      setAlarms((prev) => alarms.filter((alarm) => alarm.id !== id))
    },
    [alarms]
  )
  const editAlarm = useCallback(
    (id: number, updatedAlarm: Alarm) => {
      setAlarms((prev) =>
        alarms.map((alarm) =>
          alarm.id === id ? { ...alarm, ...updatedAlarm } : alarm
        )
      )
    },
    [alarms]
  )

  const setAlarmToEdit = (alarm: Alarm) => {
    setSelectedAlarm((prev) => alarm)
  }
  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const users = await getDBKeyVal()
      setAlarms(users)
      setLoading(false)
    })()
  }, [getDBKeyVal])

  useEffect(() => {
    updateDbKeyVal()

    let checkAlarmInterval = setInterval(() => {
      if (alarms.length > 0) {
        alarms.forEach((alarm) => {
          if (alarm.active) {
            const now = new Date()
            const alarmTime = new Date()
            const [hours, minutes] = alarm.time.split(":")
            alarmTime.setHours(parseInt(hours, 10))
            alarmTime.setMinutes(parseInt(minutes, 10))

            if (
              now.getHours() == alarmTime.getHours() &&
              now.getMinutes() == alarmTime.getMinutes()
            ) {
              if (alarm.repeat === AlarmRepeat.ONCE) {
                editAlarm(alarm.id, { ...alarm, active: false })
              }
              let notification = new Notification("Alarm", {
                body: `Alarm set for ${alarm.time}`,
              })
              notification.onclick = () => {
                notification.close()
                stopSound()
              }
              playSound(alarm.audio.src)
            }
          }
        })
      }
    }, 5000)

    return () => {
      clearInterval(checkAlarmInterval)
    }
  }, [alarms, editAlarm, getDBKeyVal, updateDbKeyVal])

  const playSound = (src: string) => {
    audioRef.current = new Audio(src)
    audioRef.current.play()
    setAlarmPlaying(true)
  }

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setAlarmPlaying(false)
    }
  }

  const value = useMemo(
    () => ({
      alarms,
      addAlarm,
      removeAlarm,
      editAlarm,
      selectedAlarm,
      setAlarmToEdit,
      stopSound,
      alarmPlaying,
      loading,
    }),
    [
      alarms,
      addAlarm,
      removeAlarm,
      editAlarm,
      selectedAlarm,
      alarmPlaying,
      loading,
    ]
  )

  return (
    <AlarmsContext.Provider value={value}>{children}</AlarmsContext.Provider>
  )
}
