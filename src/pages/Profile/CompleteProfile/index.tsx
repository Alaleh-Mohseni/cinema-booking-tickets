import { useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext';
import { Link } from 'react-router-dom';
import { RiUserSmileLine, RiUser6Line, RiLockPasswordLine } from "react-icons/ri";
import { FaAngleLeft } from "react-icons/fa6";
import { HiUser } from "react-icons/hi";

function CompleteProfile() {
  const { handleSubmitProfile, register, userPhoto, photo } = useContext(AuthContext)

  return (
    <main className="w-full">
      <section className="pt-7">
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          <div className="w-full bg-gray-900 text-white border border-gray-700 rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0 relative">
            <div className="py-6 px-12 space-y-4 md:space-y-6 sm:py-8">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitProfile}>
                <div className="py-2">
                  {photo ?
                    <img src={userPhoto} className="w-40 h-40 rounded-lg absolute" alt="chosen" />
                    :
                    <div className="w-40 h-40 bg-orange-100 mx-auto rounded-full shadow-2xl flex items-center justify-center text-[#ff8036]">
                      <HiUser className='h-20 w-20' />
                    </div>
                  }
                  {/* {userPhoto ? (
                    <img src={userPhoto} className="w-40 h-40 rounded-lg absolute" alt="chosen" />
                  ) : (
                    <div className="flex flex-col absolute items-center">
                      <p className="text-gray-500">انتخاب تصویر پروفایل</p>
                    </div>
                  )} */}
                  {/* {avatarString &&
                    <img
                      className="w-28 h-28 mx-auto rounded-full"
                      src={avatarString}
                      alt="Profile"
                    />
                  } */}
                  <input
                    type="file"
                    className="w-full h-full cursor-pointer mb-0 opacity-0"
                    id="ّphoto"
                    {...register('photo', { required: true })}
                  />
                </div>

                <div className="flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-full bg-gray-800 rounded-3xl text-slate-500">
                  <div className="flex gap-3 items-center">
                    <RiUserSmileLine className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                    <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                    <label htmlFor="firstName" className="sr-only">
                      FirstName
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="نام"
                      className="self-stretch my-auto bg-transparent outline-none"
                      {...register('firstName', { required: true })}
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-full bg-gray-800 rounded-3xl text-slate-500">
                  <div className="flex gap-3 items-center">
                    <RiUser6Line className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                    <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                    <label htmlFor="lastName" className="sr-only">
                      LastName
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="نام خانوادگی"
                      className="self-stretch my-auto bg-transparent outline-none"
                      {...register('lastName', { required: true })}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#ff8036] hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium gap-5 rounded-3xl mt-7 px-16 py-3.5 text-xl text-center"
                >
                  ذخیره تغییرات
                </button>
              </form>
              <div className='flex justify-start text-slate-500 pt-2'>
                <Link to='/dashboard/set-password' className='flex justify-center items-center gap-2'>
                  <RiLockPasswordLine size='20' />
                  <p>انتخاب رمز عبور</p>
                  <FaAngleLeft />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default CompleteProfile