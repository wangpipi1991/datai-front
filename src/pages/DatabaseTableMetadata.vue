<template>
  <div class="database-table-metadata-container">
    <h2 class="title">All Tables' Metadata</h2>
    <div>
      <v-data-table
        density="compact"
        :headers="tableHeaders"
        :items="filteredTablesMetadata"
      >
        <template v-slot:body.prepend>
          <tr>
            <td>
              <v-text-field v-model="tableNameFilter" type="text" label="Search By Table Name" variant="outlined" density="compact"></v-text-field>
            </td>
            <td>
              <v-text-field v-model="columnNameFilter" type="text" label="Search By Column Name" variant="outlined" density="compact"></v-text-field>
            </td>
          </tr>
        </template>
        <template v-slot:item.tableName="{ item }">
          <h3 class="table-name">
            <span v-if="tableNameFilter && item.tableName.toLowerCase().includes(tableNameFilter.toLowerCase())" v-for="s in [item.tableName.slice(0, item.tableName.indexOf(tableNameFilter.toLowerCase())), tableNameFilter.toLowerCase(), item.tableName.slice(item.tableName.indexOf(tableNameFilter.toLowerCase()) + tableNameFilter.toLowerCase().length)]">
            <span v-if="s === tableNameFilter.toLowerCase()" style="color: #04AA6D">{{ s }}</span>
            <span v-else>{{ s }}</span>
          </span>
            <span v-else>{{ item.tableName }}</span>
          </h3>
        </template>
        <template v-slot:item.columns="{ item }">
          <v-data-table
            density="compact"
            :headers="columnHeaders"
            :items="item.columns"
            :key="item.tableName"
          >
            <template v-slot:item.columnName="{ item }">
              <div>
                <span v-if="columnNameFilter && item.columnName.toLowerCase().includes(columnNameFilter.toLowerCase())" v-for="s in [item.columnName.slice(0, item.columnName.indexOf(columnNameFilter.toLowerCase())), columnNameFilter.toLowerCase(), item.columnName.slice(item.columnName.indexOf(columnNameFilter.toLowerCase()) + columnNameFilter.toLowerCase().length)]">
                  <span v-if="s === columnNameFilter.toLowerCase()" style="color: #04AA6D; font-weight: bold;">{{ s }}</span>
                  <span v-else>{{ s }}</span>
                </span>
                <span v-else>{{ item.columnName }}</span>
                <span v-if="item.primaryKey">(<b style="color: red">PK</b>)</span>
                <span v-if="item.foreignKeyMetadata">(<b style="color: blue">FK</b> map to <b>{{ item.foreignKeyMetadata.pkTableName }}</b>.{{ item.foreignKeyMetadata.pkColumnName }})</span>
              </div>
            </template>
          </v-data-table>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>

import { mapStores } from "pinia";
import { useDatabaseConnectorStore } from "@/stores/databaseConnectorStore";

export default {
  data: () => ({
    tableNameFilter: '',
    columnNameFilter: ''
  }),
  computed: {
    ...mapStores(useDatabaseConnectorStore),
    filteredTablesMetadata() {
      let result = this.databaseConnectorStore.allTablesMetadata;
      if (this.tableNameFilter) {
        result = this.databaseConnectorStore.allTablesMetadata.filter(t => t.tableName.toLowerCase().includes(this.tableNameFilter.toLowerCase()));
      }
      if (this.columnNameFilter) {
        result = result.filter(t => t.columns.some(c => c.columnName.toLowerCase().includes(this.columnNameFilter.toLowerCase())));
      }
      return result;
    },
    tableHeaders() {
      return [
        { title: 'Table', key: 'tableName', align: 'start', width: '20%', sortable: true },
        { title: 'Columns', key: 'columns', align: 'start', width: '80%', sortable: false }
      ]
    },
    columnHeaders() {
      return [
        { title: 'Column Name', key: 'columnName', align: 'start', width: '20%', sortable: true },
        { title: 'Column Type', key: 'columnType', align: 'start', width: '20%', sortable: true },
        { title: 'Column Size', key: 'columnSize', align: 'start', width: '20%', sortable: true },
        { title: 'Column Default Value', key: 'columnDefaultValue', align: 'start', width: '20%', sortable: true }
      ]
    }
  }
};
</script>

<style scoped>
/* Add some basic styling */
.database-table-metadata-container {
  .title {
    text-align: center;
    margin-bottom: 1em;
    margin-top: 1em;
  }
  .v-data-table {
    border: 1px solid #ddd;
  }
  .table-name {
    text-align: center;
  }
}
</style>
