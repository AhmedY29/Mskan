import {create} from 'zustand';
import axios from 'axios';

 const API_URL = import.meta.mode === 'development' ? 'http://localhost:5000/api/auth' : '/api/auth';

 axios.defaults.withCredentials = true; 
export const useAuthStore = create((set)=>({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,
    message:null,

    register: async (email , password , name) => {
        set({isLoading:true, error:null})
        try {
            const response = await axios.post(`${API_URL}/register`, {email, password, name})
            set({user:response.data.user, isAuthenticated: true , isLoading:false})
        } catch (error) {
            set({error:error.response.data.message || "Error in  Registering ", isLoading:false})
            throw error
        }
    },

    verifyEmail: async (code)=>{
        set({isLoading:true, error:null})
        try {
            const response = await axios.post(`${API_URL}/verifyEmail`, {code});
            set({user:response.data.user, isAuthenticated: true, isLoading:false})
            return response.data;
        } catch (error) {
            set({error:error.response.data.message || "Error in verifying email ", isLoading:false})
            throw error;
        }
    },
    checkAuth: async () =>{
        set({isCheckingAuth:true , error:null});
        try {
            const response = await axios.get(`${API_URL}/checkAuth `);
            set({user:response.data.user , isAuthenticated: true, isCheckingAuth:false});   
        } catch (error) {
            set({error:null, isCheckingAuth:false, isAuthenticated:false});
            
        }
    },
    login: async (email, password) => {
        set({isLoading:true, error:null})
        try {
            const response = await axios.post(`${API_URL}/login` , {email, password});
            set({user:response.data.user, isAuthenticated: true, isLoading:false,error:null});
        } catch (error) {
            set({error:error.response?.data?.message || "Error Logging in " , isLoading:false});
            throw error;
        }
    },
    logout: async () =>{
        set({isLoading:true , error:null});
        
        try {
        await axios.post(`${API_URL}/logout`);
        set({user:null, isAuthenticated: false, isLoading:false, error:null});
        } catch (error) {
            set({error:"Error logging out" , isLoading:false});
            throw error;
        }
    },
    forgotPassword: async (email)=>{
        set({isLoading:true, error:null, message:null})
        try {
            const response = await axios.post(`${API_URL}/forgotPassword`, {email});
            set({message:response.data.message, isLoading:false});
        } catch (error) {
            set({ isLoading:false , error:error.response.data.message || "Error Sending reset password email"});
            throw error;
        }
    },
    resetPassword: async (token , newPassword) => {
        set({isLoading:true, error:null})
        try {
            const response = await axios.post(`${API_URL}/resetPassword/${token}`, {newPassword});
            set({message:response.data.message, isLoading:false});
        } catch (error) {
            set({ isLoading:false, error:error.response.data.message || "Error resetting password"});
            throw error;
        }
    }

}));