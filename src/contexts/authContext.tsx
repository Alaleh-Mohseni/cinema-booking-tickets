import { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signUp, login, verify, profile, setPassword, changePassword, loginPassword, forgetPassword } from '../services/auth';
import { lsSet, lsGet } from '../utils/localStorage';
import { toast } from "react-hot-toast";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const { register, watch, formState: { errors } } = useForm({ mode: 'onTouched' });
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState();
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [url, setUrl] = useState()
    const [userId, setUserId] = useState()
    const [accessToken, setAccessToken] = useState()
    // const user = lsGet('user', true);
    // const storedProfile = user.profile;
    const [userPhoto, setUserPhoto] = useState('')
    const [photo, setPhoto] = useState(false)


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
        const urls = url ? 'register' : 'login'

        verify(urls, phoneNumber, { token: token })
            .then((data) => {
                lsSet('access_token', data.data.data.tokens.access_token);
                lsSet('refresh_token', data.data.data.tokens.refresh_token);
                lsSet('user', data, true);
                console.log(data)
                // const userID = data.data.data.profile_user.user_id
                // const accToken = data.data.data.tokens.access_token
                setVerificationCode(token)
                setUserId(data.data.data.profile_user.user_id)
                setAccessToken(data.data.data.tokens.access_token)
                // toast.success(data.data.message)
                return navigate('/');
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


    const handleSubmitProfile = (e: any) => {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const photo = e.target.photo.file;
        const userToken = lsGet('access_token');

        profile({
            first_name: firstName,
            last_name: lastName,
            photo: photo
        },
            userToken
        )
            .then((data) => {
                lsSet('user', data, true);
                setUserPhoto(data.data.data.photo)
                setPhoto(true)
                console.log('Complete profile successful:', data);
                toast.error(data.data.message);
            })
            .catch((err) => {
                console.error('Complete profile failed:', err);
                toast.error(err.response.data.message);
            });
    };

    const handleSubmitSetPassword = (e: any) => {
        e.preventDefault();
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const userToken = lsGet('access_token');

        setPassword({ password: password, re_password: confirmPassword }, userToken)
            .then((data) => {
                lsSet('user', data, true);
                console.log('SetPass successful:', data);
                toast.success(data.data.message);
            })
            .catch((err) => {
                console.error('SetPass failed:', err);
                toast.error(err.response.data.detail);
            });
    };

    const handleSubmitChangePassword = (e: any) => {
        e.preventDefault();
        const oldPassword = e.target.oldPassword.value;
        const newPassword = e.target.newPassword.value;
        const confirmNewPassword = e.target.confirmNewPassword.value;
        const userToken = lsGet('access_token');

        changePassword({
            password: newPassword,
            re_password: confirmNewPassword,
            old_password: oldPassword
        },
            userToken
        )
            .then((data) => {
                lsSet('user', data, true);
                console.log('ChangePass successful:', data);
                toast.success(data.data.message);
            })
            .catch((err) => {
                console.error('ChangePass failed:', err);
                toast.error(err.response.data.detail);
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
        handleSubmitProfile,
        handleSubmitSetPassword,
        handleSubmitChangePassword,
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
        isLoading,
        userId,
        userPhoto,
        photo,
        accessToken,
        watch
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}