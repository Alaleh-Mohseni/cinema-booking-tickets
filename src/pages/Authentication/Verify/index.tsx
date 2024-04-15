import { MdOutlineVerifiedUser } from "react-icons/md";
import { Link } from "react-router-dom";
import { TiArrowLeft } from "react-icons/ti";
import { HiArrowUturnRight } from "react-icons/hi2";

function Verify() {
    return (
        <>
            {/* <Toaster position="top-right" reverseOrder={false} /> */}
            <h1 className="text-xl text-center font-semibold leading-tight tracking-tight md:text-2xl">
                ورود با رمز یکبارمصرف
            </h1>
            <div className="flex justify-center text-slate-500 py-1">
                <p>کد ارسال شده به شماره موبایل زیر را وارد کنید:</p>
            </div>
            <form className="space-y-4 md:space-y-6">
                <div className="flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-full bg-gray-900 rounded-3xl text-slate-500">
                    <div className="flex gap-3 items-center">
                        <MdOutlineVerifiedUser className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                        <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                        <label htmlFor="otp" className="sr-only">
                            Otp
                        </label>
                        <input
                            type="number"
                            id="otp"
                            placeholder="••••••"
                            className="self-stretch my-auto bg-transparent outline-none"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-[#ff8036] hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium gap-5 rounded-3xl mt-7 px-16 py-3.5 text-xl text-center"
                >
                    تایید کد ارسالی
                </button>
                <div className="flex justify-end items-center text-slate-500 px-3">
                    <Link to="/login">مرحله قبلی</Link>
                    <HiArrowUturnRight className="pr-1" size="20" />
                </div>
            </form>
        </>
    )
}

export default Verify