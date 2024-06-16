import { Link } from 'react-router-dom';
import { RiUserSmileLine, RiUser6Line, RiLockPasswordLine } from "react-icons/ri";
import { FaAngleLeft } from "react-icons/fa6";
import { HiUser } from "react-icons/hi";
import { useCompleteProfile } from '../../../hooks/useCompleteProfile';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { completeProfileSchema } from '../../../schemas/schemas';
import Button from '../../../components/Button';
import ToasterMessage from '../../../components/ToasterMessage';
import FormGroup from '../../../components/FormGroup';


function CompleteProfile() {
  const { handleSubmitProfile, photo, userPhoto, handlePhotoChange, preview } = useCompleteProfile()
  const resolver = yupResolver(completeProfileSchema)
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver, mode: 'onTouched' })

  return (
    <div className="w-full">
      <div className="pt-7">
        <ToasterMessage />
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          <div className="w-full bg-gray-900 text-white border border-gray-700 rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0 relative">
            <div className="py-6 px-12 space-y-4 md:space-y-6 sm:py-8">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleSubmitProfile)}>
                <div className="py-2 flex justify-center items-center relative">
                  {photo ?
                    <div className='w-44 h-44 flex justify-center items-center rounded-full border-4 border-solid border-[#ff8036]'>
                      <img
                        src={userPhoto || preview}
                        className="w-40 h-40 rounded-full"
                        alt="user photo"
                      />
                    </div>
                    :
                    <div className="w-40 h-40 bg-orange-100 mx-auto rounded-full shadow-2xl text-[#ff8036] flex justify-center items-center">
                      <HiUser className='h-20 w-20' />
                    </div>
                  }
                  <input
                    type="file"
                    className="w-full h-full cursor-pointer mb-0 opacity-0 absolute top-0"
                    id="photo"
                    {...register('photo')}
                    onChange={handlePhotoChange}
                    placeholder='photo'
                  />
                </div>
                <FormGroup
                  htmlFor={'firstName'}
                  label={'First Name'}
                  type={'text'}
                  Icon={RiUserSmileLine}
                  name={'firstName'}
                  id={'firstName'}
                  className={'bg-gray-800'}
                  placeholder={'نام'}
                  register={register}
                  errors={errors.firstName}
                />
                <FormGroup
                  htmlFor={'lastName'}
                  label={'Last Name'}
                  type={'text'}
                  Icon={RiUser6Line}
                  name={'lastName'}
                  id={'lastName'}
                  className={'bg-gray-800'}
                  placeholder={'نام خانوادگی'}
                  register={register}
                  errors={errors.lastName}
                />
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
      </div>
    </div>
  )
}

export default CompleteProfile