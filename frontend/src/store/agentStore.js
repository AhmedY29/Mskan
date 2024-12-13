import {create} from 'zustand';
import axios from 'axios';

 const API_URL = import.meta.mode === 'development' ? 'http://localhost:5000/api/agent' : '/api/agent';

 axios.defaults.withCredentials = true; 
export const useAgentStore = create((set)=>({
    agents:[],
    agent:[],
    error:null,
    isLoading:false,
    message:null,

    getAgents: async () => {
        set({isLoading:true, error:null})
        try {
            const response = await axios.get(`${API_URL}/agents`)
            console.log(response.data.agents)
            set({agents:response.data.agents , isLoading:false})
        } catch (error) {
            set({error:error.response.data.message || "Error in  Getting agent ", isLoading:false})
            throw error
        }
    },
    getAgent: async (name) => {
        set({isLoading:true, error:null})
        try {
            const response = await axios.get(`${API_URL}/agent/${name}`)
            set({agent:response.data.agent , isLoading:false})
        } catch (error) {
            set({error:error.response.data.message || "Error in  Getting agent ", isLoading:false})
            throw error
        }
    },
    addAgent: async (data) => {
        set({isLoading:true, error:null})
        try {
            const response = await axios.post(`${API_URL}/agents`, data)
            set((state) => ({agents:[...state.agents, response.data.agent] , isLoading:false}));
        } catch (error) {
            set({error:error.response.data.message || "Error in  Getting agent ", isLoading:false})
            throw error
        }
    },
    addEmpToAgent: async (id,name) => {
        set({isLoading:true, error:null})
        console.log(name,'in store')
        try {
            const response = await axios.post(`${API_URL}/agents/${id}/employees`, {name})
            set({agent: response.data.agent, isLoading:false})
        } catch (error) {
            set({error:error.response.data.message || "Error in  Getting agent ", isLoading:false})
            throw error
        }
    },
    editEmpOnAgent: async (id,userId , role) => {
        set({isLoading:true, error:null})
        try {
            const response = await axios.put(`${API_URL}/agents/${id}/employees/${userId}`,{role} )
            set({agent: response.data.agent, isLoading:false})
        } catch (error) {
            set({error:error.response.data.message || "Error in  Getting agent ", isLoading:false})
            throw error
        }
    },
    deleteEmpFromAgent: async (id,userId) => {
        set({isLoading:true, error:null})
        try {
            const response = await axios.delete(`${API_URL}/agents/${id}/employees/${userId}` )
            set({agent: response.data.agent, isLoading:false})
        } catch (error) {
            set({error:error.response.data.message || "Error in  Getting agent ", isLoading:false})
            throw error
        }
    },
    editAgent: async (id, data) => {
        set({isLoading:true, error:null})
        try {
            const response = await axios.put(`${API_URL}/agents/${id}`,data )
            set({agent:response.data.agent , isLoading:false})
        } catch (error) {
            set({error:error.response.data.message || "Error in  Getting agent ", isLoading:false})
            throw error
        }
    },
    deleteAgent: async (id) => {
        set({isLoading:true, error:null})
        try {
            const response = await axios.delete(`${API_URL}/agents/${id}` )
            set({isLoading:false})
        } catch (error) {
            set({error:error.response.data.message || "Error in  Getting agent ", isLoading:false})
            throw error
        }
    },

}));
