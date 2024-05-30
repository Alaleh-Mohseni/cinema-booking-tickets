import { useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from '../../../schemas/schemas';
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import Button from '../../../components/Button';
import FormGroup from '../../../components/FormGroup';
import ToasterMessage from '../../../components/ToasterMessage';

function Login() {
    const { onSubmitLogin } = useContext(AuthContext)
    const resolver = yupResolver(loginSchema)
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver })

    return (
        <>
            <ToasterMessage />
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight md:text-2xl">
                ورود
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmitLogin)}>
                <FormGroup
                    htmlFor={'phoneNumber'}
                    label={'Phone Number'}
                    type={'text'}
                    Icon={HiOutlineDevicePhoneMobile}
                    name={'phoneNumber'}
                    id={'phoneNumber'}
                    className={'bg-gray-900'}
                    placeholder={'شماره موبایل'}
                    register={register}
                    errors={errors.phoneNumber}
                />
                <Button text={'ادامه'} />
            </form>
        </>
    )
}

export default Login