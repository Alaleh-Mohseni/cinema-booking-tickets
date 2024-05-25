import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/authContext';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaAngleLeft } from "react-icons/fa6";
import { Toaster } from 'react-hot-toast';
import Button from '../../../components/Button';

function LoginPassword() {
    const { handleSubmitLoginPassword, register, errors } = useContext(AuthContext)

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
            <h1 className="text-xl text-center font-semibold leading-tight tracking-tight md:text-2xl">
                ورود با رمز عبور
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitLoginPassword}>
                <div className="flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-full bg-gray-900 rounded-3xl text-slate-500">
                    <div className="flex gap-3 items-center">
                        <RiLockPasswordLine className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                        <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                        <label htmlFor="oldPassword" className="sr-only">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="رمز عبور"
                            className="self-stretch my-auto bg-transparent outline-none"
                            {...register('password', {
                                required: 'رمز عبور الزامی است',
                                minLength: {
                                    value: 8,
                                    message: 'حداقل تعداد کاراکتر ۸ عدد است',
                                }
                            })}
                        />
                    </div>
                </div>
                <Button text={'ادامه'} />
            </form>
            <div className='flex justify-start text-slate-500 pt-2'>
                <Link to='/forget-password' className='flex justify-center items-center gap-2'>
                    <p>فراموشی رمز عبور</p>
                    <FaAngleLeft />
                </Link>
            </div>
        </>
    )
}

export default LoginPassword