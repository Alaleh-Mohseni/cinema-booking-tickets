import { setPassword } from '../services/auth';
import { lsSet, lsGet } from '../utils/localStorage';
import { toast } from "react-hot-toast";

export function useSetPassword() {
    const handleSubmitSetPassword = (e: any) => {
        e.preventDefault();
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const userToken = lsGet('access_token');

        setPassword({ password: password, re_password: confirmPassword }, userToken)
            .then((data) => {
                lsSet('user', data, true);
                console.log('SetPass successful:', data);
                toast.success(data.data.message);
            })
            .catch((err) => {
                console.error('SetPass failed:', err);
                toast.error(err.response.data.detail);
            });
    };

    return { handleSubmitSetPassword }
}