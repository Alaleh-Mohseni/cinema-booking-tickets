import { changePassword } from '../services/auth';
import { lsSet, lsGet } from '../utils/localStorage';
import { toast } from "react-hot-toast";

export function useChangePassword() {
    const handleSubmitChangePassword = (e: any) => {
        e.preventDefault();
        const oldPassword = e.target.oldPassword.value;
        const newPassword = e.target.newPassword.value;
        const confirmNewPassword = e.target.confirmNewPassword.value;
        const userToken = lsGet('access_token');

        changePassword({
            password: newPassword,
            re_password: confirmNewPassword,
            old_password: oldPassword
        },
            userToken
        )
            .then((data) => {
                lsSet('user', data, true);
                console.log('ChangePass successful:', data);
                toast.success(data.data.message);
            })
            .catch((err) => {
                console.error('ChangePass failed:', err);
                toast.error(err.response.data.detail);
            });
    };

    return { handleSubmitChangePassword }
}