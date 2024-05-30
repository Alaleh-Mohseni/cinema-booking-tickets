import { RiSecurePaymentLine } from "react-icons/ri";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { walletSchema } from '../../../schemas/schemas';
import Button from '../../../components/Button';
import FormGroup from '../../../components/FormGroup';
import ToasterMessage from "../../../components/ToasterMessage";

function Wallet() {
    const resolver = yupResolver(walletSchema)
    const { register, formState: { errors } } = useForm({ resolver })

    return (
        <div className="w-full">
            <div className="pt-7">
                <ToasterMessage />
                <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
                    <div className="w-full bg-gray-900 text-white border border-gray-700 rounded-2xl shadow md:mt-0 xl:p-0 max-w-2xl relative">
                        <div className="py-6 px-10 space-y-4 md:space-y-6 sm:py-8">
                            <div className='flex flex-col items-center gap-4 text-center'>
                                <h5 className="text-xl font-bold">افزایش موجودی کیف پول</h5>
                                <p>موجودی فعلی: 0 تومان</p>
                                <p className="leading-relaxed">برای افزایش موجودی کیف پول، مبلغ مورد نظر خود را "به تومان" وارد کنید.</p>
                            </div>
                            <form className="space-y-4 md:space-y-6 max-w-sm mx-auto">
                                <FormGroup
                                    htmlFor={'payment'}
                                    label={'Payment'}
                                    type={'text'}
                                    Icon={RiSecurePaymentLine}
                                    name={'payment'}
                                    id={'payment'}
                                    className={'bg-gray-800'}
                                    placeholder={"••••••••"}
                                    register={register}
                                    errors={errors.payment}
                                />
                                <Button text={'پرداخت مبلغ'} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet