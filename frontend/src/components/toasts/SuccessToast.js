import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const showSuccessToast = (message)=>{
    toast.success(message, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}