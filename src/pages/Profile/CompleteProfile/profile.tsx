import { useForm, Controller } from "react-hook-form";
import { RiUserSmileLine, RiUser6Line } from "react-icons/ri";
import { profile } from '../../../services/auth';
import { lsSet, lsGet } from '../../../utils/localStorage';

import { useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext';


const user = lsGet('user', true);

function CompleteProfile() {
    const { phoneNumber, userId, accessToken } = useContext(AuthContext)
    console.log(accessToken)

    const { control, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            first_name: user?.complete_profile?.first_name || '',
            last_name: user?.complete_profile?.last_name || '',
            photo: '',
        }
    });

    const photo = watch('photo');
    const [avatarString, setAvatarString] = React.useState('');

    const onAvatarChangeString = async (event: any) => {
        if (event.target.files && event.target.files[0]) {
            setAvatarString(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleAvatarChange = (event: any) => {
        onAvatarChangeString(event);
        if (event.target.files && event.target.files[0]) {
            setValue('photo', event.target.files[0]);
        }
    };

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);

        if (data.photo) {
            formData.append('photo', data.photo);
        }

        try {
            const response = await profile(formData);
            user.complete_profile = {
                first_name: response.first_name,
                last_name: response.last_name,
                photo: response.photo,
            };

            lsSet('user', user, true);
            console.log('Complete profile successful:', user);
        } catch (err) {
            console.error('Complete profile failed:', err);
        }
    };

    return (
        <main className="w-full">
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-gray-800 text-white border border-gray-700 rounded-2xl shadow md:mt-0 sm:max-w-md xl:p-0 relative">
                        <div className="py-6 px-12 space-y-4 md:space-y-6 sm:py-8">
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div className="py-2">
                                    {photo && typeof photo !== 'string' ? (
                                        <img src={URL.createObjectURL(photo)} className="w-40 h-40 rounded-lg absolute" alt="chosen" />
                                    ) : (
                                        <div className="flex flex-col absolute items-center">
                                            <p className="text-gray-500">انتخاب تصویر پروفایل</p>
                                        </div>
                                    )}
                                    {avatarString && (
                                        <img
                                            className="w-28 h-28 mx-auto rounded-full"
                                            src={avatarString}
                                            alt="Profile"
                                        />
                                    )}
                                    <input
                                        type="file"
                                        className="w-full h-full cursor-pointer mb-0 opacity-0"
                                        id="photo"
                                        onChange={handleAvatarChange}
                                    />
                                </div>

                                <div className="flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-full bg-gray-900 rounded-3xl text-slate-500">
                                    <div className="flex gap-3 items-center">
                                        <RiUserSmileLine className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                                        <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                                        <Controller
                                            name="first_name"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    placeholder={user?.complete_profile?.first_name ? user?.complete_profile?.first_name : 'نام'}
                                                    className="self-stretch my-auto bg-transparent outline-none"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-5 justify-between py-5 pl-16 pr-6 mt-7 w-full bg-gray-900 rounded-3xl text-slate-500">
                                    <div className="flex gap-3 items-center">
                                        <RiUser6Line className="shrink-0 self-stretch aspect-[0.96]" size="24" />
                                        <div className="shrink-0 self-stretch my-auto w-px border border-solid aspect-[0.07] border-slate-500 stroke-[1px] stroke-slate-300"></div>
                                        <Controller
                                            name="last_name"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="text"
                                                    placeholder={user?.complete_profile?.last_name ? user?.complete_profile?.last_name : 'نام خانوادگی'}
                                                    className="self-stretch my-auto bg-transparent outline-none"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-[#ff8036] hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium gap-5 rounded-3xl mt-7 px-16 py-3.5 text-xl text-center"
                                >
                                    ذخیره تغییرات
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default CompleteProfile;
