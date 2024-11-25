import {create} from 'zustand';
import axios from 'axios';

 const API_URL =import.meta.mode === 'development' ?'http://localhost:5000/api/property' : '/api/property';
 // 
 // 
 // production
 axios.defaults.withCredentials = true; 
export const usePropertiesStore= create((set)=>({
    properties:[],
    property:[],
    isLoading:false,
    setProperties:(properties) => set({properties}),
    setProperty:(property) => set({property}),
    
    createProperty: async (newProperty) => {
        set({isLoading:true})
        try {
            const response = await axios.post(API_URL, newProperty);
            set((state) => ({properties:[...state.properties, response.data.data] , isLoading:false}));
        } catch (error) {
            console.error('Error in create property', error.message)
        }
    },
    getProperties: async () => {
        set({isLoading:true})
        try {
            const response = await axios.get(API_URL);
            set(({properties:response.data.data , isLoading:false}));
        } catch (error) {
            console.error('Error in gets properties', error.message)
        }
    },
    getProperty: async (id) => {
        set({isLoading:true})
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            set(({property:response.data.data , isLoading:false,}));
        } catch (error) {
            console.error('Error in get property', error.message)
        }
    },
    deleteProperty: async (id) => {
        set({isLoading:true})
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            set(({isLoading:false,}));
        } catch (error) {
            console.error('Error in delete property', error.message)
        }
    },
    updateProperty: async (propertyId, updatedData) => {
        set({ isLoading: true });
        try {
            const response = await axios.put(`${API_URL}/${propertyId}`, updatedData);
            set({ property: response.data, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
}));
