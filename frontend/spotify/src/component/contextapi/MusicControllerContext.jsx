import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { audioContext } from './AudioProvider';

export const musciControl = createContext()
function MusicControllerContext({ children }) {
    let [control, setControl] = useState([])
    let { audioRef, setPlaying, setCurrentSong,currentSong } = useContext(audioContext)


    async function getMusicPlaying() {
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

    async function patchMusicPlaying(id) {

        try {
            const audio = audioRef.current
            if (!audio) return;

            await axios.patch(`http://localhost:3000/api/current/patchcurr/${id}`, {
                currentTime: audio.currentTime
            }, { withCredentials: true })
            getMusicPlaying()
        }
        catch (err) {
            console.log(err);
        }
    }

 

    async function playRef(song) {
        let audio = audioRef.current
        if (!audio) return
        let newSrc = song.uri
        let sameSong = audio.src.includes(newSrc)


        if (sameSong) {
            if (audio.paused) {
               await audio.play()
                setPlaying(true)
                setCurrentSong(song?._id)
            }
            else {
                audio.pause()
                await patchMusicPlaying(song?._id)
                setPlaying(false)
            }
            
            return
        }

        let saveTime= control.find(item => item.music._id === song._id)
        audio.src = newSrc
        audio.load()
        audio.currentTime = saveTime?.currentTime || 0


       await audio.play()
        setPlaying(true)
        setCurrentSong(song?._id)
    }

    useEffect(()=>{
        let audio=audioRef.current
        if(!audio) return 
        const saveTime= ()=>{
            patchMusicPlaying(currentSong)
        }

        audio.addEventListener('timeupdate', saveTime)

        return ()=>{
            audio.removeEventListener('timeupdate', saveTime)
        }
    },[currentSong])

    return (
        <musciControl.Provider value={{ control, patchMusicPlaying, getMusicPlaying, playRef }}>
            {children}
        </musciControl.Provider>
    )
}

export default MusicControllerContext