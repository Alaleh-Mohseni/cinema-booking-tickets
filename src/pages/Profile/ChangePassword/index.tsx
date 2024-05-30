import { RiLockPasswordLine } from "react-icons/ri";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from '../../../schemas/schemas';
import { useChangePassword } from "../../../hooks/useChangePassword";
import { useForm } from 'react-hook-form';
import Button from "../../../components/Button";
import FormGroup from "../../../components/FormGroup";
import ToasterMessage from "../../../components/ToasterMessage";


function ChangePassword() {
    const { onSubmitChangePassword } = useChangePassword()
    const resolver = yupResolver(changePasswordSchema)
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver })

    return (
        <div className="w-full">
            <div className="pt-7">
                <ToasterMessage />
                <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
                    <div className="w-full bg-gray-900 text-white border border-gray-700 rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0 relative">
                        <div className="py-6 px-12 space-y-4 md:space-y-6 sm:py-8">
                            <div className='text-center text-lg'>
                                <h5>لطفا رمز عبور جدیدی را انتخاب و آنرا وارد کنید.</h5>
                            </div>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmitChangePassword)}>
                                <FormGroup
                                    htmlFor={'oldPassword'}
                                    label={'Old Password'}
                                    type={'password'}
                                    Icon={RiLockPasswordLine}
                                    name={'oldPassword'}
                                    id={'oldPassword'}
                                    className={'bg-gray-800'}
                                    placeholder={'رمز عبور قبلی'}
                                    register={register}
                                    errors={errors.oldPassword}
                                />
                                <FormGroup
                                    htmlFor={'newPassword'}
                                    label={'New Password'}
                                    type={'password'}
                                    Icon={RiLockPasswordLine}
                                    name={'newPassword'}
                                    id={'newPassword'}
                                    className={'bg-gray-800'}
                                    placeholder={'رمز عبور جدید'}
                                    register={register}
                                    errors={errors.newPassword}
                                />
                                <FormGroup
                                    htmlFor={'confirmNewPassword'}
                                    label={'Confirm New Password'}
                                    type={'password'}
                                    Icon={RiLockPasswordLine}
                                    name={'confirmNewPassword'}
                                    id={'confirmNewPassword'}
                                    className={'bg-gray-800'}
                                    placeholder={'تکرار رمز عبور جدید'}
                                    register={register}
                                    errors={errors.confirmNewPassword}
                                />
                                <Button text={'ذخیره تغییرات'} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword