import { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signUp, login, verify } from '../services/auth';
import { lsSet } from '../utils/localStorage';
import { toast } from "react-hot-toast";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const { register, formState: { errors } } = useForm({ mode: 'onTouched' });
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState();
    const [phoneNumber, setPhoneNumber] = useState('')
    const [logged, setLogged] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [url, setUrl] = useState()
    const [userId, setUserId] = useState()

    const handleSubmitRegister = (e: any) => {
        e.preventDefault();
        const phone = e.target.phoneNumber.value;

        signUp({ phone_number: phone })
            .then((data) => {
                lsSet('user', data.user, false);
                console.log('Registration successful:', data);

                const verifyCode = data?.data.token.split(' ').slice(9).join('')
                const phone = data.data.data.phone_number
                const urlReg = data.config.url?.split('/').slice(5).join('')

                setVerificationCode(verifyCode)
                setPhoneNumber(phone)
                setUrl(urlReg)

                return navigate(`/verify/${data.data.data.phone_number}`);
            })
            .catch((err) => {
                console.error('Registration failed:', err);
                toast.error(err.response.data.message);
            });
    };


    const handleSubmitLogin = (e: any) => {
        e.preventDefault();
        const phone = e.target.phoneNumber.value;

        login({ phone_number: phone })
            .then((data) => {
                lsSet('access_token', data.access_token);
                lsSet('refresh_token', data.refresh_token);
                lsSet('user', data, true);
                console.log('Login successful:', data);

                const verifyCode = data?.data.token.split(' ').slice(9).join('')
                const phone = data.data.data.phone_number

                setVerificationCode(verifyCode)
                setPhoneNumber(phone)

                return navigate(`/verify/${data.data.data.phone_number}`);
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.response.data.message);
            });
    };


    const handleSubmitVerify = (e: any) => {
        e.preventDefault();
        const otp = e.target.otp.value;
        const token = verificationCode ? otp : null
        const urls = url ? 'register' : 'login'

        verify(urls, phoneNumber, { token: token })
            .then((data) => {
                lsSet('user', data.user, false);
                console.log(data)
                // const userID = data.data.data.profile-user.user_id
                setVerificationCode(token)
                // setUserId(userID)
                // toast.success(data.data.message)
                if (data.status === 200) {
                    setLogged(true)
                    navigate('/')
                }
                // setLogged(false)
                // return navigate('/');
            })
            .catch((err) => {
                console.error(err)
                if (err.response.status === 404) {
                    toast.error(err.response.data.message);
                }

                if (err.response.status === 403) {
                    toast.error(err.response.data.detail);
                }
            });
    };

    // console.log(userId)

    const value = {
        handleSubmitRegister,
        handleSubmitLogin,
        handleSubmitVerify,
        register,
        errors,
        verificationCode,
        setVerificationCode,
        phoneNumber,
        logged,
        setLogged,
        url,
        isLoading,
        userId
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}