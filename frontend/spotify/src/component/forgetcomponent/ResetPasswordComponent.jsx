import React, { useContext } from 'react'
import { resetContext } from '../../contextapi/resetPasswordContext'
import { RiLoader4Line, RiSpotifyFill } from '@remixicon/react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const ResetPasswordComponent = () => {
    const { password, handlePasswordChange } = useContext(resetContext)
    const { token } = useParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    let navigate = useNavigate()
    async function resetpassword(e) {
        e.preventDefault()
        setError('')
        const newPassword = password.newPassword.trim()
        const confirmPassword = password.confirmPassword.trim()
        // Empty validation
        if (!newPassword || !confirmPassword) {
            setError('Please fill in both password fields')
            return
        }

        // Password length
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters')
            return
        }

        // Password match
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        try {
            setLoading(true)
            await axios.post(`http://localhost:3000/api/reset/resetpassword/${token}`, { password: password.confirmPassword })
            navigate('/login')
        }
        catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    const passwordsFilled =
        password.newPassword !== '' &&
        password.confirmPassword !== ''

    const passwordsMatch =
        passwordsFilled &&
        password.newPassword === password.confirmPassword

    const canSubmit =
        passwordsFilled &&
        passwordsMatch &&
        password.newPassword.length >= 8 &&
        !loading
    return (
        <div className='flex px-4 pt-16 sm:pt-24 md:pt-30 justify-center'>
            <div className='w-full max-w-sm text-center'>
                <h1 className='flex items-center justify-center'><RiSpotifyFill className='w-10 h-10 sm:w-14 sm:h-14' /></h1>
                <h1 className='py-3 font-bold text-2xl sm:text-3xl md:text-4xl'>Reset Password</h1>
                <form onSubmit={resetpassword} className='flex  flex-col '>
                    <h1 className='pb-2 font-semibold text-start'>New Password</h1>
                    <input name='newPassword' type="password" value={password.newPassword} onChange={handlePasswordChange} className='w-full py-2.5 mb-4 px-3  border border-[#7C7C7C] rounded' placeholder='Enter new password' />
                    <h1 className='pb-2 font-semibold text-start'>Confirm Password</h1>
                    <input name='confirmPassword' type="password" value={password.confirmPassword} onChange={handlePasswordChange} className='w-full py-2.5 mb-1  px-3  border border-[#7C7C7C] rounded' placeholder='Confirm new password' />
                    {password.newPassword !== password.confirmPassword && password.newPassword !== '' && password.confirmPassword !== '' && (
                        <div className='text-xs text-start text-red-500'>Password is not match</div>
                    )
                    }
                    {password.newPassword === password.confirmPassword && password.newPassword !== '' && password.confirmPassword !== '' && (
                        <div className='text-xs text-start text-green-500'>Password is match</div>
                    )
                    }

                    {/* Password validation */}
                    {password.newPassword !== '' &&
                        password.newPassword.length < 8 && (
                            <p className="text-red-500 text-sm mt-2">
                                Password must be at least 8 characters
                            </p>
                        )}

                    {passwordsFilled &&
                        password.newPassword !== password.confirmPassword && (
                            <p className="text-red-500 text-sm mt-2">
                                Passwords do not match
                            </p>
                        )}

                    {passwordsMatch &&
                        password.newPassword.length >= 8 && (
                            <p className="text-green-500 text-sm mt-2">
                                Passwords match
                            </p>
                        )}

                    {error && (
                        <p className="text-red-500 text-sm mt-2">
                            {error}
                        </p>
                    )}

                    <button
                        disabled={!canSubmit}
                        type="submit"
                        className={`w-full rounded-full py-3 flex items-center justify-center mt-4 font-bold ${canSubmit
                            ? 'bg-[#2beb6e] text-black cursor-pointer hover:scale-[1.01]'
                            : 'bg-zinc-600 text-gray-300 cursor-not-allowed'
                            }`}
                    >
                        {loading ? (
                            <RiLoader4Line
                                size={22}
                                className="animate-spin"
                            />
                        ) : (
                            'Continue'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordComponent