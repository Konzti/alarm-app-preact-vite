import bpm from "@/assets/sounds/90bpm-mix.mp3"
import goodMorning from "@/assets/sounds/good-morning.mp3"
import audio3 from "@/assets/sounds/lovely-winter.mp3"
import { AlarmAudio } from "@/types"

export const audioSources: AlarmAudio[] = [
  {
    id: 1,
    name: "90bpm-Mix",
    src: bpm,
  },
  {
    id: 2,
    name: "Good Morning",
    src: goodMorning,
  },
  {
    id: 3,
    name: "Lovely Winter",
    src: audio3,
  },
]
