// write  a unit test for this function with vitest:

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from '../../../schemas/schemas';
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { FaAngleLeft } from "react-icons/fa6";
import { TbLogin2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Button from '../../../components/Button';
import ToasterMessage from '../../../components/ToasterMessage';
import { useState } from 'react';
import { login } from '../../../services/auth';
import { lsSet } from '../../../utils/localStorage';
import { toast } from 'react-hot-toast';

interface LoginData {
    phoneNumber: string;
}


function Login() {
    const resolver = yupResolver(loginSchema)
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver })
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [url, setUrl] = useState<string | undefined>();


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


    return (
        <>
            <ToasterMessage />
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl">
                ورود
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmitLogin)}>
                <div className={`
            flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-ful rounded-3xl text-slate-500
            ${errors.phoneNumber && 'border-red-500 border-2 border-solid'}
            `}>
                    <div className="flex gap-3 items-center">
                        <HiOutlineDevicePhoneMobile className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                        <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                        <label htmlFor='phoneNumber' className="sr-only">
                            Phone Number
                        </label>
                        <input
                            type='text'
                            id='phoneNumber'
                            placeholder='شماره موبایل'
                            className='self-stretch my-auto bg-transparent outline-none'
                            {...register('phoneNumber')}
                        />
                    </div>
                </div>
                {errors.phoneNumber ? <p className="text-red-500 text-sm px-3">{errors?.phoneNumber.message}</p> : null}
                <Button text={'ادامه'} />
            </form>
            <div className='flex text-slate-400'>
                <Link to='/login-password' className='flex justify-center items-center gap-2'>
                    <TbLogin2 size='24' />
                    <p>ورود با رمز عبور</p>
                    <FaAngleLeft />
                </Link>
            </div>
        </>
    )
}

export default Login