import { changePassword } from '../services/auth';
import { lsSet, lsGet } from '../utils/localStorage';
import { toast } from "react-hot-toast";

interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export function useChangePassword() {
    const onSubmitChangePassword = async (data: ChangePasswordData) => {
        const { oldPassword, newPassword, confirmNewPassword } = data;
        const userToken = lsGet('access_token');

        try {
            const response = await changePassword(
                {
                    password: newPassword,
                    re_password: confirmNewPassword,
                    old_password: oldPassword
                },
                userToken
            );

            lsSet('user', response.data, true);
            console.log('ChangePass successful:', response.data);
            toast.success(response.data.message);
        } catch (err) {
            console.error('ChangePass failed:', err);
            const errorMessage = err.response?.data?.message;
            toast.error(errorMessage);
        }
    };

    return { onSubmitChangePassword };
}