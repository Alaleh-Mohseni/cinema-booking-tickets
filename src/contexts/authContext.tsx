import { useState, createContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, login, verify, loginPassword, forgetPassword } from '../services/auth';
import { lsSet, lsGet, lsRemove } from '../utils/localStorage';
import { toast } from 'react-hot-toast';

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
    handleLogout: () => void;
    url: string | undefined;
    isModalOpen: boolean;
    setIsModalOpen: (status: boolean) => void;
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
    phoneNumber: string;
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
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const userToken = lsGet('access_token');
        if (userToken) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSuccess = (data: any, verifyCode: string, phone: string, urlPath: string) => {
        lsSet('user', data, true);
        setVerificationCode(verifyCode);
        setPhoneNumber(phone);
        setUrl(urlPath);
        navigate(`/verify/${phone}`);
    };

    const handleError = (err: any) => {
        const message = err.response?.data?.message || err.response?.data?.detail || 'خطایی رخ داده است.';
        toast.error(message);
    };

    const onSubmitRegister = async (data: RegisterData) => {
        try {
            const response = await signUp({ phone_number: data.phoneNumber });
            const verifyCode = response?.data?.token?.split(' ').slice(9).join('');
            const phone = response?.data?.data?.phone_number;
            const urlRegister = response?.config?.url?.split('/').slice(5).join('');
            handleSuccess(response, verifyCode, phone, urlRegister!);
        } catch (error) {
            handleError(error);
        }
    };

    const onSubmitLogin = async (data: LoginData) => {
        try {
            const response = await login({ phone_number: data.phoneNumber });
            const verifyCode = response?.data?.token?.split(' ').slice(9).join('');
            const phone = response?.data?.data?.phone_number;
            handleSuccess(response, verifyCode, phone, 'login');
        } catch (error) {
            handleError(error);
        }
    };

    const onSubmitVerify = async (data: VerifyData) => {
        try {
            const token = verificationCode || data.otp;
            const urlPath = url === 'register' ? 'register' : url === 'forget_password' ? 'forget_password' : 'login';
            const response = await verify(urlPath, phoneNumber, { token });

            if (urlPath === 'login') {
                lsSet('access_token', response.data.data.tokens.access_token);
                lsSet('refresh_token', response.data.data.tokens.refresh_token);
            } else {
                lsSet('success', response.data.type);
            }

            lsSet('user', response.data, true);
            setVerificationCode(token);

            toast.success(response.data.message);

            navigate(urlPath === 'login' ? '/' : urlPath === 'register' ? '/login' : '/login-password');
        } catch (error) {
            handleError(error);
        }
    };

    const onSubmitLoginPassword = async (data: LoginPasswordData) => {
        try {
            const response = await loginPassword({ phone_number: data.phoneNumber, password: data.password });
            lsSet('access_token', response.data.data.tokens.access_token);
            lsSet('refresh_token', response.data.data.tokens.refresh_token);
            lsSet('user', response.data, true);
            toast.success('Login successful');
            navigate('/');
        } catch (error) {
            handleError(error);
        }
    };

    const onSubmitForgetPassword = async (data: ForgetPasswordData) => {
        try {
            const response = await forgetPassword({ phone_number: data.phoneNumber });
            const verifyCode = response?.data?.token?.split(' ').slice(9).join('');
            const phone = response?.data?.data?.phone_number;
            handleSuccess(response.data, verifyCode, phone, 'forget_password');
        } catch (error) {
            handleError(error);
        }
    };

    const handleLogout = () => {
        lsRemove('access_token');
        setIsLoggedIn(false);
        setIsModalOpen(false);
        navigate('/');
    };

    return (
        <AuthContext.Provider
            value={{
                onSubmitRegister,
                onSubmitLogin,
                onSubmitVerify,
                onSubmitLoginPassword,
                onSubmitForgetPassword,
                verificationCode,
                setVerificationCode,
                phoneNumber,
                isLoggedIn,
                handleLogout,
                url,
                isModalOpen,
                setIsModalOpen,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
