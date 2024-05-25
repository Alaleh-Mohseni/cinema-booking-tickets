import { useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext';
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import Button from '../../../components/Button';

function ForgetPassword() {
    const { handleSubmitForgetPassword, register, errors } = useContext(AuthContext)

    return (
        <>
            {/* <Toaster position="top-right" reverseOrder={false} /> */}
            <h1 className="text-xl text-center font-semibold leading-tight tracking-tight md:text-2xl">
                فراموشی رمز عبور
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitForgetPassword}>
                <div className="flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-full bg-gray-900 rounded-3xl text-slate-500">
                    <div className="flex gap-3 items-center">
                        <HiOutlineDevicePhoneMobile className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                        <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                        <label htmlFor="phone" className="sr-only">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            placeholder="شماره موبایل"
                            className="self-stretch my-auto bg-transparent outline-none"
                            {...register('phoneNumber', {
                                required: true,
                                pattern: {
                                    value: /^[0-9]{11}$/,
                                    message: 'شماره موبایل معتبر نیست'
                                }
                            })}
                        />
                    </div>
                </div>
                <Button text={'ادامه'} />
            </form>
        </>
    )
}

export default ForgetPassword