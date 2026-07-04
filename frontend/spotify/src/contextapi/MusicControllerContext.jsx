import React, { createContext, useCallback, useContext, useEffect, useRef, useState, useMemo } from 'react'
import { audioContext } from '../contextapi/AudioProvider';
import {getMusic, patchMusic} from '../api/favApi'
import { resetContext } from './resetPasswordContext';

export const musciControl = createContext()
function MusicControllerContext({ children }) {
    let [control, setControl] = useState([])
    let { audioRef, setPlaying, setCurrentSong, currentSong } = useContext(audioContext)
    const {authReady}=useContext(resetContext)

    let currentSongRef=useRef(currentSong)

    useEffect(()=>{
        currentSongRef.current=currentSong
    },[currentSong])

   

    const getMusicPlaying = useCallback(async () => {
        try {
            const res = await getMusic()
            setControl(res.data.getCurrentPlaying)
        }
        catch (err) {
            console.log(err);
        }
    }, [])

    useEffect(() => {
        if(!authReady) return
        getMusicPlaying()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authReady])

    const patchMusicPlaying = useCallback(async (id) => {

        try {
            const audio = audioRef.current
            if (!audio) return;
            if (!id) return
            await patchMusic(id, {
                currentTime: audio.currentTime,
                duration:audio.duration
            })

            await getMusicPlaying()
        }
        catch (err) {
            console.log(err.response?.data);
        }
    },[audioRef, getMusicPlaying])

     let patchRef=useRef(patchMusicPlaying)

     useEffect(()=>{
        patchRef.current=patchMusicPlaying
    },[patchMusicPlaying])



    const playRef = useCallback(async (song) => {
        let audio = audioRef.current
        if (!audio) return
        let newSrc = song.uri
        let sameSong = audio.src.includes(newSrc)


        if (sameSong) {
            if (audio.paused) {
                audio.play()
                setPlaying(true)
                setCurrentSong(song?._id)
            }
            else {
                audio.pause()
                setPlaying(false)
                await patchMusicPlaying(song?._id)
            }

            return
        }

        let saveTime = control.find(item => item.music._id === song._id)
        audio.src = newSrc
        audio.load()
        audio.currentTime = saveTime?.currentTime || 0

        audio.play()
        setPlaying(true)
        setCurrentSong(song?._id)
    }, [audioRef, control, setPlaying, setCurrentSong, patchMusicPlaying])

    useEffect(() => {
        let audio = audioRef.current
        if (!audio ) return

        let lastUpdate=0
        const saveTime = () => {
            if(! currentSongRef.current) return 
            let now =Date.now()
            if(now-lastUpdate < 300) return
            lastUpdate=now
            patchRef.current(currentSongRef.current)
        }

        audio.addEventListener('timeupdate', saveTime)

        return () => {
            audio.removeEventListener('timeupdate', saveTime)
        }
    }, [])

    const value = useMemo(() => ({
        control, 
        patchMusicPlaying, 
        getMusicPlaying, 
        playRef
    }), [control, patchMusicPlaying, getMusicPlaying, playRef])
   
    return (
        <musciControl.Provider value={value}>
            {children}
        </musciControl.Provider>
    )
}

export default MusicControllerContext