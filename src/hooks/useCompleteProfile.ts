import { profile } from '../services/auth';
import { lsSet, lsGet } from '../utils/localStorage';
import { toast } from "react-hot-toast";
import { useState } from 'react';

interface ProfileFormInputs {
    firstName: string;
    lastName: string;
    photo: FileList;
}

interface CompleteProfileHook {
    handleSubmitProfile: (data: ProfileFormInputs) => Promise<void>;
    photo: boolean;
    userPhoto?: string;
    handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    preview: string;
}


export function useCompleteProfile(): CompleteProfileHook {
    const [userPhoto, setUserPhoto] = useState<string>();
    const [photo, setPhoto] = useState<boolean>(false);
    const [preview, setPreview] = useState<string>('');

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setPhoto(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitProfile = async (data: ProfileFormInputs) => {
        const formData = new FormData();
        formData.append('first_name', data.firstName);
        formData.append('last_name', data.lastName);
        formData.append('photo', data.photo[0]);

        const userToken = lsGet('access_token');

        try {
            const response = await profile(formData, userToken);
            lsSet('user', response.data, true);
            setUserPhoto(response.data.data.photo);
            setPhoto(true);
            console.log('Complete profile successful:', response.data);
            toast.success(response.data.message);
        } catch (err: any) {
            console.error('Complete profile failed:', err);
            toast.error(err.response ? err.response.data.message : 'خطایی رخ داده است.');
        }
    };

    return {
        handleSubmitProfile,
        photo,
        userPhoto,
        handlePhotoChange,
        preview
    };
}