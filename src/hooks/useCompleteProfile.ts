import { profile } from '../services/auth';
import { lsSet, lsGet } from '../utils/localStorage';
import { toast } from "react-hot-toast";
import { useState } from 'react';

export function useCompleteProfile() {
    const [userPhoto, setUserPhoto] = useState('')
    const [photo, setPhoto] = useState(false)

    const handleSubmitProfile = (e: any) => {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const photo = e.target.photo.file;
        const userToken = lsGet('access_token');

        profile({
            first_name: firstName,
            last_name: lastName,
            photo: photo
        }, userToken)
            .then((data) => {
                lsSet('user', data, true);
                setUserPhoto(data.data.data.photo)
                setPhoto(true)
                console.log('Complete profile successful:', data);
                toast.error(data.data.message);
            })
            .catch((err) => {
                console.error('Complete profile failed:', err);
                toast.error(err.response.data.message);
            });
    };

    return { handleSubmitProfile, photo, userPhoto }
}