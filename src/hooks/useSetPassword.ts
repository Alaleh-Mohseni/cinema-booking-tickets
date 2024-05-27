import { setPassword } from '../services/auth';
import { lsSet, lsGet } from '../utils/localStorage';
import { toast } from "react-hot-toast";
interface SetPasswordData {
    password: string;
    confirmPassword: string;
}

export function useSetPassword() {
    const onSubmitSetPassword = async (data: SetPasswordData) => {
        const { password, confirmPassword } = data;
        const userToken = lsGet('access_token');

        try {
            const response = await setPassword(
                {
                    password,
                    re_password: confirmPassword
                }, userToken);
            lsSet('user', response.data, true);
            console.log('Set password successful:', response.data);
            toast.success(response.data.message);
        } catch (err) {
            console.error('Set password failed:', err);
            const errorMessage = err.response?.data?.detail || 'خطایی رخ داده است.';
            toast.error(errorMessage);
        }
    };

    return { onSubmitSetPassword };
}
