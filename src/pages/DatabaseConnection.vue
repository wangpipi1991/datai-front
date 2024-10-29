<template>
  <div class="database-connection-container">
    <h2>Database Connection</h2>
    <v-form v-model="form" @submit.prevent="connectToDatabase">
      <v-text-field v-model="url" label="Database Url" placeholder="e.g.: jdbc:mysql://localhost:3306/your_database" :rules="[rules.required]" clearable></v-text-field>
      <v-text-field v-model="username" label="Username" placeholder="e.g.: root" :rules="[rules.required]" clearable></v-text-field>
      <v-text-field v-model="password" label="Password" placeholder="e.g.: admin" :rules="[rules.required]" clearable></v-text-field>
      <v-btn :disabled="!form" color="success" size="large" type="submit" variant="elevated" block>Connect</v-btn>
    </v-form>
    <br>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { useDatabaseConnectorStore } from "@/stores/databaseConnectorStore";
import { mapStores } from 'pinia';

export default {
  data() {
    return {
      url: '',
      username: '',
      password: '',
      error: '',
      form: false,
      rules: {
        required: value => !!value || 'Field is required'
      }
    };
  },
  computed: {
    ...mapStores(useDatabaseConnectorStore)
  },
  methods: {
    async connectToDatabase() {
      if (!this.form) return;
      try {
        await this.databaseConnectorStore.generateJwtToken(this.url, this.username, this.password);
        this.$router.push({ name: 'DatabaseTableMetadata'});
      } catch (error) {
        this.error = `Failed to connect to database due to ${error.response.data}`;
      }
    }
  }
};
</script>

<style scoped>
/* Add some basic styling */
.database-connection-container {
  max-width: 500px;
  margin: auto;
  padding: 2em;
  text-align: center;
  position: relative;
  top: 30%;
  border: 1px solid #ddd;
}
.error {
  color: red;
}
</style>
