import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { RiLockPasswordLine } from "react-icons/ri";

function ChangePassword() {
    return (
        <>
            {/* <Toaster position="top-right" reverseOrder={false} /> */}
            <h1 className="text-xl text-center font-semibold leading-tight tracking-tight md:text-2xl">
                تغییر رمز عبور
            </h1>
            <form className="space-y-4 md:space-y-6">
                <div className="flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-full bg-gray-900 rounded-3xl text-slate-500">
                    <div className="flex gap-3 items-center">
                        <HiOutlineDevicePhoneMobile className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                        <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                        <label htmlFor="oldPassword" className="sr-only">
                            Old Password
                        </label>
                        <input
                            type="password"
                            id="oldPassword"
                            placeholder="رمز عبور فعلی"
                            className="self-stretch my-auto bg-transparent outline-none"
                        />
                    </div>
                </div>
                <div className="flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-full bg-gray-900 rounded-3xl text-slate-500">
                    <div className="flex gap-3 items-center">
                        <RiLockPasswordLine className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                        <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                        <label htmlFor="newPassword" className="sr-only">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            placeholder="رمز عبور جدید"
                            className="self-stretch my-auto bg-transparent outline-none"
                        />
                    </div>
                </div>
                <div className="flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-full bg-gray-900 rounded-3xl text-slate-500">
                    <div className="flex gap-3 items-center">
                        <RiLockPasswordLine className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                        <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                        <label htmlFor="confirmNewPassword" className="sr-only">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            placeholder="تکرار رمز عبور جدید"
                            className="self-stretch my-auto bg-transparent outline-none"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-[#ff8036] hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium gap-5 rounded-3xl mt-7 px-16 py-3.5 text-xl text-center"
                >
                    ادامه
                </button>
            </form>
        </>
    )
}

export default ChangePassword