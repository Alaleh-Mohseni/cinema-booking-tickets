import { Link } from 'react-router-dom';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaAngleLeft } from "react-icons/fa6";
import { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { setPasswordSchema } from '../../../schemas/schemas';
import { useSetPassword } from '../../../hooks/useSetPassword';
import Button from '../../../components/Button';
import FormGroup from '../../../components/FormGroup';


function SetPassword() {
    const { onSubmitSetPassword } = useSetPassword()
    const resolver = yupResolver(setPasswordSchema)
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver })


    return (
        <main className="w-full">
            <section className="pt-7">
                <Toaster position="top-left" reverseOrder={false} />
                <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
                    <div className="w-full bg-gray-900 text-white border border-gray-700 rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0 relative">
                        <div className="py-6 px-12 space-y-4 md:space-y-6 sm:py-8">
                            <div className='text-center text-lg'>
                                <h5>لطفا رمز عبور خود را انتخاب و آنرا وارد کنید.</h5>
                            </div>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmitSetPassword)}>
                                <FormGroup
                                    htmlFor={'password'}
                                    label={'Password'}
                                    type={'password'}
                                    Icon={RiLockPasswordLine}
                                    name={'password'}
                                    id={'password'}
                                    className={'bg-gray-800'}
                                    placeholder={'رمز عبور'}
                                    register={register}
                                    errors={errors.password}
                                />
                                <FormGroup
                                    htmlFor={'confirmPassword'}
                                    label={'Confirm Password'}
                                    type={'password'}
                                    Icon={RiLockPasswordLine}
                                    name={'confirmPassword'}
                                    id={'confirmPassword'}
                                    className={'bg-gray-800'}
                                    placeholder={'تکرار رمز عبور'}
                                    register={register}
                                    errors={errors.confirmPassword}
                                />
                                <Button text={'ذخیره تغییرات'} />
                            </form>
                            <div className='flex justify-start text-slate-500 pt-2'>
                                <Link to='/dashboard/change-password' className='flex justify-center items-center gap-2'>
                                    <RiLockPasswordLine size='20' />
                                    <p>تغییر رمز عبور</p>
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

export default SetPassword