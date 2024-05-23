import { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signUp, login, verify, loginPassword, forgetPassword } from '../services/auth';
import { lsSet } from '../utils/localStorage';
import { toast } from "react-hot-toast";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const { register, formState: { errors } } = useForm({ mode: 'onTouched' });
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [url, setUrl] = useState()
  

    const handleSubmitRegister = (e: any) => {
        e.preventDefault();
        const phone = e.target.phoneNumber.value;

        signUp({ phone_number: phone })
            .then((data) => {
                lsSet('user', data, true);
                console.log('Registration successful:', data);

                const verifyCode = data?.data.token.split(' ').slice(9).join('')
                const phone = data.data.data.phone_number
                const urlRegister = data.config.url?.split('/').slice(5).join('')

                setVerificationCode(verifyCode)
                setPhoneNumber(phone)
                setUrl(urlRegister)

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
        const urls = url ? 'register' : 'login';

        verify(urls, phoneNumber, { token: token })
            .then((data) => {
                if(urls === 'login') {
                    lsSet('access_token', data.data.data.tokens.access_token);
                    lsSet('refresh_token', data.data.data.tokens.refresh_token);    
                }

                if(urls === 'register') {
                    lsSet('success', data.data.type);
                }

                lsSet('user', data, true);
                console.log(data)
                setVerificationCode(token)
                toast.success(data.data.message)
                return navigate('/');
            })
            .catch((err) => {
                console.error(err)
                if(urls === 'login') {
                    if (err.response.status === 404) {
                        toast.error(err.response.data.message);
                    }
    
                    if (err.response.status === 403) {
                        toast.error(err.response.data.detail);
                    }    
                }
            });
    };


    const handleSubmitLoginPassword = (e: any) => {
        e.preventDefault();
        const password = e.target.password.value;

        loginPassword(phoneNumber, { password: password })
            .then((data) => {
                lsSet('access_token', data.data.data.tokens.access_token);
                lsSet('refresh_token', data.data.data.tokens.refresh_token);
                lsSet('user', data, true);
                console.log('Login successful:', data);
                return navigate('/');
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.response.data.message);
            });
    };


    const handleSubmitForgetPassword = (e: any) => {
        e.preventDefault();
        const phone = e.target.phoneNumber.value;

        forgetPassword({ phone_number: phone })
            .then((data) => {
                lsSet('user', data, true);
                console.log('forgetPass successful:', data);

                const phone = data.data.data.phone_number
                setPhoneNumber(phone)
                return navigate(`/verify/${data.data.data.phone_number}`);
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.response.data.message);
            });
    };


    const value = {
        handleSubmitRegister,
        handleSubmitLogin,
        handleSubmitVerify,
        handleSubmitLoginPassword,
        handleSubmitForgetPassword,
        register,
        errors,
        verificationCode,
        setVerificationCode,
        phoneNumber,
        isLoggedIn,
        setIsLoggedIn,
        url,
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}