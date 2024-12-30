import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

let id;

export const showLoadingToast = (text)=>{
    id = toast.loading(text,{theme:"dark"});
    return id;
}

export const loadingToastSuccess = (text,id)=>{
    toast.update(id, { render: text, type: "success", isLoading: false, autoClose:3000 });
}

export const loadingToastFail = (text,id)=>{
    toast.update(id, { render: text, type: "error", isLoading: false, autoClose:3000 });
}