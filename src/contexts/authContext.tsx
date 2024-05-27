import { useState, createContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, login, verify, loginPassword, forgetPassword } from '../services/auth';
import { lsSet } from '../utils/localStorage';
import { toast } from "react-hot-toast";

interface AuthContextProps {
    onSubmitRegister: (data: RegisterData) => void;
    onSubmitLogin: (data: LoginData) => void;
    onSubmitVerify: (data: VerifyData) => void;
    onSubmitLoginPassword: (data: LoginPasswordData) => void;
    onSubmitForgetPassword: (data: ForgetPasswordData) => void;
    verificationCode: string;
    setVerificationCode: (code: string) => void;
    phoneNumber: string;
    isLoggedIn: boolean;
    setIsLoggedIn: (status: boolean) => void;
    url: string | undefined;
}

interface RegisterData {
    phoneNumber: string;
}

interface LoginData {
    phoneNumber: string;
}

interface VerifyData {
    otp: string;
}

interface LoginPasswordData {
    password: string;
}

interface ForgetPasswordData {
    phoneNumber: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [url, setUrl] = useState<string | undefined>();


    const handleSuccess = (data: any, verifyCode: string, phone: string, urlPath: string) => {
        lsSet('user', data, true);
        setVerificationCode(verifyCode);
        setPhoneNumber(phone);
        setUrl(urlPath);
        return navigate(`/verify/${phone}`);
    };

    const handleError = (err: any) => {
        const message = err.response?.data?.message || 'خطایی رخ داده است.';
        toast.error(message);
        console.error(err);
    };


    const onSubmitRegister = async (data: RegisterData) => {
        const { phoneNumber: phone } = data;

        try {
            const response = await signUp({ phone_number: phone });

            const { data: responseData, config } = response;
            const verifyCode = responseData?.token.split(' ').slice(9).join('');
            const phoneNumber = responseData.data.phone_number;
            const urlRegister = config.url?.split('/').slice(5).join('');

            handleSuccess(response, verifyCode, phoneNumber, urlRegister);
        } catch (error) {
            handleError(error);
        }
    };


    const onSubmitLogin = async (data: LoginData) => {
        const { phoneNumber } = data;

        try {
            const response = await login({ phone_number: phoneNumber });
            const token = response?.data?.token || '';
            const verifyCode = token.split(' ').slice(9).join('');
            const phone = response?.data?.data?.phone_number;

            handleSuccess(response, verifyCode, phone, 'login');
        } catch (error) {
            handleError(error);
        }
    };


    const onSubmitVerify = async (data: VerifyData) => {
        const otp = data.otp;
        const token = verificationCode ? otp : null;
        let urls;

        try {
            urls = url === 'register' ? 'register'
                :
                url === 'forget-password' ? 'forget-password'
                    :
                    'login';

            const response = await verify(urls, phoneNumber, { token: token });

            if (urls === 'login') {
                lsSet('access_token', response.data.data.tokens.access_token);
                lsSet('refresh_token', response.data.data.tokens.refresh_token);
            } else if (urls === 'register') {
                lsSet('success', response.data.type);
            }

            lsSet('user', response.data, true);
            setVerificationCode(token!);
            console.log(response.data)
            toast.success(response.data.message);

            if (urls === 'login' || urls === 'forget-password') {
                navigate('/');
            } else if (urls === 'register') {
                navigate('/login');
            }
        } catch (err) {
            handleError(err);
            if (err.response?.status === 404 || err.response?.status === 403) {
                const message = err.response.data.message || err.response.data.detail;
                toast.error(message);
            }
        }
    };


    const onSubmitLoginPassword = async (data: LoginPasswordData) => {
        try {
            const password = data.password;
            const response = await loginPassword(phoneNumber, { password });

            lsSet('access_token', response.data.data.tokens.access_token);
            lsSet('refresh_token', response.data.data.tokens.refresh_token);
            lsSet('user', response, true);
            toast.success('Login successful');
            return navigate('/');
        } catch (error) {
            handleError(error);
        }
    };


    const onSubmitForgetPassword = async (data: ForgetPasswordData) => {
        try {
            const phone = data.phoneNumber;

            const response = await forgetPassword({ phone_number: phone });
            const responseData = response?.data;

            if (responseData) {
                const verifyCode = responseData.token.split(' ').slice(9).join('');
                const phoneNumber = responseData.data.phone_number;
                const urlForgetPassword = response.config.url?.split('/').slice(5).join('');
                handleSuccess(responseData, verifyCode, phoneNumber, urlForgetPassword);
            } else {
                throw new Error("Invalid response data");
            }
        } catch (error) {
            handleError(error);
        }
    };


    const value: AuthContextProps = {
        onSubmitRegister,
        onSubmitLogin,
        onSubmitVerify,
        onSubmitLoginPassword,
        onSubmitForgetPassword,
        verificationCode,
        setVerificationCode,
        phoneNumber,
        isLoggedIn,
        setIsLoggedIn,
        url,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}