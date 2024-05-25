import { MdOutlineVerifiedUser } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../../contexts/authContext";
import { HiArrowUturnRight } from "react-icons/hi2";
import { FaAngleLeft } from "react-icons/fa6";
import { TbLogin2 } from "react-icons/tb";
import { Toaster } from 'react-hot-toast';
import Button from "../../../components/Button";


function Verify() {
    const { verificationCode, phoneNumber, url, register, handleSubmitVerify } = useContext(AuthContext)
    // const urls = url ? 'register' : 'login'
    const urls = url === 'register' ? 'register' : url === 'forget-password' ? 'forget-password' : 'login' ;

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
            <Toaster position="top-left" reverseOrder={false} />
            <h1 className="text-xl text-center font-semibold leading-tight tracking-tight md:text-2xl">
                ورود با رمز یکبارمصرف
            </h1>
            <div className="flex flex-col justify-center items-center gap-3 text-slate-500 py-1">
                <p>کد ارسال شده به شماره موبایل زیر را وارد کنید:</p>
                <p>{phoneNumber}</p>
                <p>کد: {verificationCode}</p>
                <p>{expired ? 'لطفا مجدد اقدام کنید' : `${formattedTime}`}</p>
            </div>
            <form onSubmit={handleSubmitVerify} className="space-y-4 md:space-y-6">
                <div className="flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-full bg-gray-900 rounded-3xl text-slate-500">
                    <div className="flex gap-3 items-center">
                        <MdOutlineVerifiedUser className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                        <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                        <label htmlFor="otp" className="sr-only">
                            Otp
                        </label>
                        <input
                            type="text"
                            id="otp"
                            placeholder="کد تایید..."
                            className="self-stretch my-auto bg-transparent outline-none"
                            {...register('otp')}
                        />
                    </div>
                </div>
                <Button text={'تایید کد ارسالی'} />
                <div className="flex justify-between items-center flex-row-reverse text-slate-500 px-3">
                    <div className="flex items-center">
                        <Link to={`/${urls}`}>مرحله قبلی</Link>
                        <HiArrowUturnRight className="pr-1" size="20" />
                    </div>
                    {urls === 'login' ?
                        <div className='flex'>
                            <Link to={`/login-password/${phoneNumber}`} className='flex justify-center items-center gap-2'>
                                <TbLogin2 size='24' />
                                <p>ورود با رمز عبور</p>
                                <FaAngleLeft />
                            </Link>
                        </div>
                        :
                        null
                    }
                </div>
            </form>
        </>
    )
}

export default Verify