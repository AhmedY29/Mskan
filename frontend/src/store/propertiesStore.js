import {create} from 'zustand';
import axios from 'axios';
import { useState } from 'react';

 const API_URL =import.meta.mode === 'development' ? 'http://localhost:5000/api/property': '/api/property';
 // production
 axios.defaults.withCredentials = true; 
export const usePropertiesStore= create((set)=>({
    properties:[],
    setProperties:(properties) => set({properties}),
    
    createProperty: async (newProperty) => {
        try {
            const response = await axios.post(API_URL, newProperty);
            set((state) => ({properties:[...state.properties, response.data]}));
        } catch (error) {
            console.error('Error in create property', error.message)
        }
    },
    getProperties: async () => {
        try {
            const response = await axios.get(API_URL);
            set(({properties:response.data.data}));
        } catch (error) {
            console.error('Error in gets properties', error.message)
        }
    }
}));
