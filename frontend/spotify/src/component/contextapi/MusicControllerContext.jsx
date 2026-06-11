import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { audioContext } from './AudioProvider';

export const musciControl = createContext()
function MusicControllerContext({ children }) {
    let [control, setControl] = useState([])
    let { audioRef, setPlaying, setCurrentSong, currentSong } = useContext(audioContext)


    const getMusicPlaying = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/current/getcurr', { withCredentials: true })
            setControl(res.data.getCurrentPlaying)
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMusicPlaying()
    }, [])

    const patchMusicPlaying = async (id) => {

        try {
            const audio = audioRef.current
            if (!audio) return;
            if (!id) return
            await axios.patch(`http://localhost:3000/api/current/patchcurr/${id}`, {
                currentTime: audio.currentTime
            }, { withCredentials: true })

            getMusicPlaying()
        }
        catch (err) {
            console.log(err.response?.data);
        }
    }



    const playRef = async (song) => {
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
    }

    useEffect(() => {
        let audio = audioRef.current
        if (!audio || !currentSong) return

        let lastUpdate=0
        const saveTime = () => {
            let now =Date.now()
            if(now-lastUpdate < 500) return
            lastUpdate=now
            patchMusicPlaying(currentSong)
        }

        audio.addEventListener('timeupdate', saveTime)

        return () => {
            audio.removeEventListener('timeupdate', saveTime)
        }
    }, [currentSong, patchMusicPlaying])

   
    return (
        <musciControl.Provider value={{control, patchMusicPlaying, getMusicPlaying, playRef}}>
            {children}
        </musciControl.Provider>
    )
}

export default MusicControllerContext