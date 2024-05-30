import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from '../../../schemas/schemas';
import { AuthContext } from '../../../contexts/authContext';
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import Button from '../../../components/Button';
import FormGroup from '../../../components/FormGroup';
import ToasterMessage from '../../../components/ToasterMessage';

function Register() {
    const { onSubmitRegister } = useContext(AuthContext)
    const resolver = yupResolver(registrationSchema)
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver })

    return (
        <>
            <ToasterMessage />
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl">
                ایجاد حساب کاربری
            </h1>
            <form onSubmit={handleSubmit(onSubmitRegister)} className="space-y-4 md:space-y-6">
                <FormGroup
                    htmlFor={'phoneNumber'}
                    label={'Phone Number'}
                    type={'text'}
                    Icon={HiOutlineDevicePhoneMobile}
                    name={'phoneNumber'}
                    id={'phoneNumber'}
                    className={`bg-gray-900`}
                    placeholder={'شماره موبایل'}
                    register={register}
                    errors={errors.phoneNumber}
                />
                <Button text={'ادامه'} />
            </form>
        </>
    )
}

export default Register