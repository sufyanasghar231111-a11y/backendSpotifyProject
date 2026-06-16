import React, { createContext, useRef, useState, useMemo, useCallback } from 'react'

export const audioContext = createContext()
export const audioTimeContext = createContext()

const AudioProvider = ({ children }) => {
  const [playing, setPlaying] = useState(null)
  const [currentSong, setCurrentSong] = useState(null)

  const audioRef = useRef(null)
  const lastUpdateRef = useRef(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const handleTime = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    const now = Date.now()
    if (now - lastUpdateRef.current > 400) {
      setCurrentTime(audio.currentTime)
      lastUpdateRef.current = now
    }
  }, [])

  const loader = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    setDuration(a.duration)
  }, [])

  const handleSeek = useCallback((e) => {
    const value = Number(e.target.value)
    setCurrentTime(value)
    if (audioRef.current) audioRef.current.currentTime = value
  }, [])

  const stableValue = useMemo(() => ({
    playing,
    setPlaying,
    audioRef,
    handleSeek,
    currentSong,
    setCurrentSong
  }), [playing, currentSong, handleSeek])

  const timeValue = useMemo(() => ({
    currentTime,
    duration,
    handleTime,
    loader
  }), [currentTime, duration, handleTime, loader])

  return (
    <audioContext.Provider value={stableValue}>
      <audioTimeContext.Provider value={timeValue}>
        {children}
        <audio ref={audioRef} onLoadedMetadata={loader} onTimeUpdate={handleTime} />
      </audioTimeContext.Provider>
    </audioContext.Provider>
  )
}

export default AudioProvider
