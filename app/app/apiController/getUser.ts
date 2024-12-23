// import { apiClient } from "./apiClient";

import axios from "axios";

const apiClient = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUser = async (token: string) => {
    try {
      const response = await apiClient.get(`/users/me?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };