import { useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from '../../../schemas/schemas';
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { Toaster } from 'react-hot-toast';
import Button from '../../../components/Button';
import FormGroup from '../../../components/FormGroup';

function Login() {
    const { onSubmitLogin } = useContext(AuthContext)
    const resolver = yupResolver(loginSchema)
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver })

    return (
        <>
            {/* <Toaster>
                {(t) => (
                    <ToastBar
                        toast={t}
                        style={{
                            ...t.style,
                            animation: t.visible ? 'custom-enter 0.5s ease' : 'custom-exit 3s ease',
                            position: 'relative',
                            top: 0,
                            left: 0
                        }}
                    />
                )}
            </Toaster> */}
            <Toaster
                position="top-left"
                reverseOrder={false}
                toastOptions={{
                    error: {
                        style: {
                            fontSize: '13px'
                        }
                    },
                }}
            />
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