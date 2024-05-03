import { useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext';
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { Toaster } from 'react-hot-toast';
import Loader from '../../../components/Loader';

function Register() {
    const { handleSubmitRegister, register, errors, isLoading } = useContext(AuthContext)

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl">
                ایجاد حساب کاربری
            </h1>
            <form onSubmit={handleSubmitRegister} className="space-y-4 md:space-y-6">
                <div className="flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-full bg-gray-900 rounded-3xl text-slate-500">
                    <div className="flex gap-3 items-center">
                        <HiOutlineDevicePhoneMobile className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                        <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                        <label htmlFor="phoneNumber" className="sr-only">
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
                {errors?.phoneNumber && <p className="text-red-500 text-sm">{errors?.phoneNumber.message}</p>}
                <button
                    type="submit"
                    className="w-full text-white bg-[#ff8036] hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium gap-5 rounded-3xl mt-7 px-16 py-3.5 text-xl text-center"
                >
                    {isLoading ? <Loader/> : "ادامه"}
                </button>
            </form>
        </>
    )
}

export default Register