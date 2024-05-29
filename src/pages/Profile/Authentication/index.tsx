import { RiBankCardLine } from "react-icons/ri";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { PiIdentificationCard } from "react-icons/pi";
import { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { authenticationSchema } from '../../../schemas/schemas';
import Button from '../../../components/Button';
import FormGroup from '../../../components/FormGroup';

function Authentication() {
    const resolver = yupResolver(authenticationSchema)
    const { register, formState: { errors } } = useForm({ resolver })

    return (
        <div className="w-full">
            <div className="pt-7">
                <Toaster position="top-left" reverseOrder={false} />
                <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
                    <div className="w-full bg-gray-900 text-white border border-gray-700 rounded-2xl shadow md:mt-0 max-w-2xl xl:p-0 relative">
                        <div className="py-6 px-10 space-y-8 md:space-y-6 sm:py-8">
                            <div className='text-center text-lg'>
                                <h5>برای استفاده از کیف پول و برداشت وجه لازم است اطلاعات زیر را تکمیل کنید.</h5>
                            </div>
                            <form className="space-y-4 md:space-y-6 max-w-sm mx-auto">
                                <FormGroup
                                    htmlFor={'phoneNumber'}
                                    label={'Phone Number'}
                                    type={'text'}
                                    Icon={HiOutlineDevicePhoneMobile}
                                    name={'phoneNumber'}
                                    id={'phoneNumber'}
                                    className={'bg-gray-800'}
                                    placeholder={'شماره موبایل'}
                                    register={register}
                                    errors={errors.phoneNumber}
                                />
                                <FormGroup
                                    htmlFor={'identity'}
                                    label={'Identity'}
                                    type={'text'}
                                    Icon={PiIdentificationCard}
                                    name={'identity'}
                                    id={'identity'}
                                    className={'bg-gray-800'}
                                    placeholder={'کد ملی'}
                                    register={register}
                                    errors={errors.identity}
                                />
                                <FormGroup
                                    htmlFor={'creditCard'}
                                    label={'Credit Card'}
                                    type={'text'}
                                    Icon={RiBankCardLine}
                                    name={'creditCard'}
                                    id={'creditCard'}
                                    className={'bg-gray-800'}
                                    placeholder={'شماره کارت'}
                                    register={register}
                                    errors={errors.creditCard}
                                />
                                <Button text={'بررسی اطلاعات'} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Authentication