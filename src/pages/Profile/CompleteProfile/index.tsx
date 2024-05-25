import { Link } from 'react-router-dom';
import { RiUserSmileLine, RiUser6Line, RiLockPasswordLine } from "react-icons/ri";
import { FaAngleLeft } from "react-icons/fa6";
import { HiUser } from "react-icons/hi";
import { useCompleteProfile } from '../../../hooks/useCompleteProfile';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import Button from '../../../components/Button';

function CompleteProfile() {
  const { handleSubmitProfile, photo, userPhoto } = useCompleteProfile()
  const { register, formState: { errors } } = useForm({ mode: 'onTouched' });

  return (
    <main className="w-full">
      <section className="pt-7">
        <Toaster position="top-left" reverseOrder={false} />
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          <div className="w-full bg-gray-900 text-white border border-gray-700 rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0 relative">
            <div className="py-6 px-12 space-y-4 md:space-y-6 sm:py-8">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitProfile}>
                <div className="py-2 flex justify-center items-center">
                  {photo ?
                    <img
                      src={userPhoto}
                      className="w-40 h-40 rounded-full"
                      alt="user photo"
                    />
                    :
                    <div className="w-40 h-40 bg-orange-100 mx-auto rounded-full shadow-2xl text-[#ff8036]">
                      <HiUser className='h-20 w-20' />
                    </div>
                  }
                  <input
                    type="file"
                    className="w-full h-full cursor-pointer mb-0 opacity-0 absolute"
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
                <Button text={'ذخیره تغییرات'} />
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