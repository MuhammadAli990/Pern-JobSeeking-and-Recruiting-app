import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    userInfo: null,
    loginState: false,
    loading:false,
    checkLogin: async () => {
        set({loading:true})
        try {
            const res = await fetch("http://127.0.0.1:3000/verifyCookie", {
                method: "GET",
                credentials: "include"
            })
            const result = await res.json();
            if(result.success){
                set({ userInfo: result.data, loginState: true });
            }
        }
        catch (err) {
            console.error(err.message);
        }
        finally{
            set({loading:false})
        }
    },
    resetLogin: ()=>{
        set({loginState:false,userInfo:null});
    }
}))