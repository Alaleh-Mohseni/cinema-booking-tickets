import { MdOutlineVerifiedUser } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifySchema } from '../../../schemas/schemas';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../../contexts/authContext";
import { HiArrowUturnRight } from "react-icons/hi2";
import Button from "../../../components/Button";
import FormGroup from "../../../components/FormGroup";
import ToasterMessage from "../../../components/ToasterMessage";

function Verify() {
    const { verificationCode, phoneNumber, url, onSubmitVerify } = useContext(AuthContext)
    const resolver = yupResolver(verifySchema)
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver })
    const urls = url === 'register' ? 'register' : 'login';
    const [secondsLeft, setSecondsLeft] = useState(80);
    const [expired, setExpired] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft(prevSeconds => {
                if (prevSeconds === 0) {
                    clearInterval(interval);
                    setExpired(true);
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return (
        <>
            <ToasterMessage />
            <h1 className="text-xl text-center font-semibold leading-tight tracking-tight md:text-2xl">
                ورود با رمز یکبارمصرف
            </h1>
            <div className="flex flex-col justify-center items-center gap-3 text-slate-400 py-1">
                <p>کد ارسال شده به شماره موبایل زیر را وارد کنید:</p>
                <p>{phoneNumber}</p>
                {expired ?
                    <p>لطفا مجدد اقدام کنید</p>
                    :
                    <>
                        <p>کد: {verificationCode}</p>
                        <p>{formattedTime}</p>
                    </>
                }
            </div>
            <form onSubmit={handleSubmit(onSubmitVerify)} className="space-y-4 md:space-y-6">
                <FormGroup
                    htmlFor={'otp'}
                    label={'Otp'}
                    type={'text'}
                    Icon={MdOutlineVerifiedUser}
                    name={'otp'}
                    id={'otp'}
                    className={'bg-gray-900'}
                    placeholder={'کد تایید...'}
                    register={register}
                    errors={errors.otp}
                />
                <Button text={'تایید کد ارسالی'} />
                <div className="flex justify-end items-center text-slate-400 px-3">
                    <Link to={`/${urls}`}>مرحله قبلی</Link>
                    <HiArrowUturnRight className="pr-1" size="20" />
                </div>
            </form>
        </>
    )
}

export default Verify