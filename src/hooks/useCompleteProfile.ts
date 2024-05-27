import { profile } from '../services/auth';
import { lsSet, lsGet } from '../utils/localStorage';
import { toast } from "react-hot-toast";
import { useState } from 'react';

export function useCompleteProfile() {
    const [userPhoto, setUserPhoto] = useState('');
    const [photo, setPhoto] = useState(false);

    const handleSubmitProfile = async (e: any) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('first_name', e.target.firstName.value);
        formData.append('last_name', e.target.lastName.value);
        formData.append('photo', e.target.photo.files[0]);
        
        const userToken = lsGet('access_token');

        try {
            const { data } = await profile(formData, userToken);
            lsSet('user', data, true);
            setUserPhoto(data.data.photo);
            setPhoto(true);
            console.log('Complete profile successful:', data);
            toast.success(data.message);
        } catch (err) {
            console.error('Complete profile failed:', err);
            toast.error(err.response ? err.response.data.message : 'خطایی رخ داده است.');
        }
    };

    return { handleSubmitProfile, photo, userPhoto };
}