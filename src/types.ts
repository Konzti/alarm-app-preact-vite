/* eslint-disable no-unused-vars */
export enum AlarmRepeat {
  ONCE = "once",
  DAILY = "daily",
  WEEKLY = "weekly",
}

export type AlarmAudio = {
  id: number
  name: string
  src: string
}

export type Alarm = {
  id: number
  time: string
  repeat: AlarmRepeat
  active: boolean
  audio: AlarmAudio
}
