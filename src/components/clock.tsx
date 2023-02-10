import { useState, useEffect } from "preact/hooks"
import "./clock.css"

const clockHours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

type ClockProps = {
  width: number
}

const Clock = ({ width }: ClockProps) => {
  const [time, setTime] = useState(new Date())
  const [isDigital, setIsDigital] = useState<boolean>(false)

  let dHours = time.getHours().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  })
  let dMinutes = time.getMinutes().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  })
  let dSeconds = time.getSeconds().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  })
  let secondsRatio = time.getSeconds() / 60
  let minutesRatio = (secondsRatio + time.getMinutes()) / 60
  let hoursRatio = (minutesRatio + time.getHours()) / 12

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  let styleClock = {
    width,
    height: width,
  }
  let styleHand = {
    position: "absolute",
    bottom: "50%",
    width: "5px",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    backgroundColor: "hsla(6, 50%, 100%, .8)",
    transformOrigin: "bottom",
  }

  let styleH = {
    ...styleHand,
    transform: `rotateZ(${hoursRatio * 360}deg)`,
    height: "20%",
  }
  let styleM = {
    ...styleHand,
    transform: `rotateZ(${minutesRatio * 360}deg)`,
    height: "30%",
  }
  let styleS = {
    ...styleHand,
    transform: `rotateZ(${secondsRatio * 360}deg)`,
    height: "40%",
    width: "3px",
    backgroundColor: "hsla(0, 100%, 50%,.7)",
  }

  return (
    <>
      {isDigital ? (
        <div
          style={{ width, fontSize: width / 13 }}
          className="mt-3 mx-auto flex items-center justify-center text-center cursor-pointer"
          onClick={() => setIsDigital((prev) => !prev)}
        >
          <span id="d-hours" className="text-2xl w-12">
            {dHours}
          </span>
          <span className="text-2xl">:</span>
          <span id="d-minutes" className="text-2xl w-12">
            {dMinutes}
          </span>
          <span className="text-2xl">:</span>
          <span id="d-seconds" className="text-2xl w-12">
            {dSeconds}
          </span>
        </div>
      ) : (
        <div
          className="clock cursor-pointer"
          style={styleClock}
          onClick={() => setIsDigital((prev) => !prev)}
        >
          <div style={styleH} />
          <div style={styleM} />
          <div style={styleS} />
          {clockHours.map((hour) => (
            <span key={hour} style={{ "--i": hour } as any}>
              <b>{hour}</b>
            </span>
          ))}
        </div>
      )}
    </>
  )
}

export default Clock
