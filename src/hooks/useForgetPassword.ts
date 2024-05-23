import { forgetPassword } from '../services/auth';
import { lsSet } from '../utils/localStorage';
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function useForgetPassword() {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('')

    const handleSubmitForgetPassword = (e: any) => {
        e.preventDefault();
        const phone = e.target.phoneNumber.value;

        forgetPassword({ phone_number: phone })
            .then((data) => {
                lsSet('user', data, true);
                console.log('forgetPass successful:', data);

                const phone = data.data.data.phone_number
                setPhoneNumber(phone)
                return navigate(`/verify/${data.data.data.phone_number}`);
            })
            .catch((err) => {
                console.log(err)
                toast.error(err.response.data.message);
            });
    };

    return { handleSubmitForgetPassword }
}