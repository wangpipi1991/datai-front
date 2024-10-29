import { defineStore } from 'pinia';
import axios from "axios";

export const useDatabaseConnectorStore = defineStore('databaseConnector', {
  state: () => ({
    allTablesMetadata: []
  }),

  actions: {
    async getDatabaseJwtToken(url, username, password) {
      const response = await axios.post('http://localhost:8080/database/getDatabaseJwtToken', {
        url: url,
        username: username,
        password: password
      });
      localStorage.setItem('jwtToken', response.data);
    },
    async fetchDatabaseAllTablesMetaData() {
      const response = await axios.post('http://localhost:8080/database/getDatabaseAllTablesMetaData', {}, {
        params: {
          jwtToken: localStorage.getItem('jwtToken')
        }}
      );
      this.allTablesMetadata = response.data;
    }
  }
});
