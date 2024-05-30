import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginPasswordSchema } from '../../../schemas/schemas';
import { AuthContext } from '../../../contexts/authContext';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaAngleLeft } from "react-icons/fa6";
import Button from '../../../components/Button';
import FormGroup from '../../../components/FormGroup';
import ToasterMessage from '../../../components/ToasterMessage';

function LoginPassword() {
    const { onSubmitLoginPassword } = useContext(AuthContext)
    const resolver = yupResolver(loginPasswordSchema)
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver })

    return (
        <>
            <ToasterMessage />
            <h1 className="text-xl text-center font-semibold leading-tight tracking-tight md:text-2xl">
                ورود با رمز عبور
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmitLoginPassword)}>
                <FormGroup
                    htmlFor={'password'}
                    label={'Password'}
                    type={'password'}
                    Icon={RiLockPasswordLine}
                    name={'password'}
                    id={'password'}
                    className={'bg-gray-900'}
                    placeholder={'رمز عبور'}
                    register={register}
                    errors={errors.password}
                />
                <Button text={'ادامه'} />
            </form>
            <div className='flex justify-start text-slate-500 pt-2'>
                <Link to='/forget-password' className='flex justify-center items-center gap-2'>
                    <p>فراموشی رمز عبور</p>
                    <FaAngleLeft />
                </Link>
            </div>
        </>
    )
}

export default LoginPassword