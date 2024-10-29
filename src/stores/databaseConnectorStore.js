import { defineStore } from 'pinia';
import axiosInstance from '@/utils/axios';

export const useDatabaseConnectorStore = defineStore('databaseConnector', {
  state: () => ({
    allTablesMetadata: []
  }),

  actions: {
    async generateJwtToken(url, username, password) {
      const response = await axiosInstance.post('/database/generateJwtToken', {
        url: url,
        username: username,
        password: password
      });
      localStorage.setItem('jwtToken', response.data);
    },
    async fetchAllTablesMetaData() {
      const response = await axiosInstance.post('/database/getAllTablesMetaData', {}, {
        params: {
          jwtToken: localStorage.getItem('jwtToken')
        }}
      );
      this.allTablesMetadata = response.data;
    }
  }
});
