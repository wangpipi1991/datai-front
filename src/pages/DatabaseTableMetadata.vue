<template>
  <div class="database-table-metadata-container">
    <h2>All Tables' Metadata</h2>
    <div v-if="allTablesMetadata && allTablesMetadata.length > 0">
      <v-data-table
        :headers="tableHeaders"
        :items="allTablesMetadata">
        <template v-slot:item.columns="{ item }">
          <v-data-table
            :headers="columnHeaders"
            :items="item.columns">
            <template v-slot:item.columnName="{ item }">
              <div>
                <div>{{ item.columnName }}</div>
                <div v-if="item.primaryKey">(<b>PK</b>)</div>
                <div v-if="item.foreignKeyMetadata">(<b>FK</b> reference to <b>{{ item.foreignKeyMetadata.pkTableName }}.{{ item.foreignKeyMetadata.pkColumnName }}</b>)</div>
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
    tableHeaders: [
      { title: 'Table Name', key: 'tableName', align: 'center', width: '10%', sortable: true },
      { title: 'Table Columns', key: 'columns', align: 'center', width: '90%', sortable: false },
    ],
    columnHeaders: [
      { title: 'Column Name', key: 'columnName', align: 'center' },
      { title: 'Column Type', key: 'columnType', align: 'center' },
      { title: 'Column Size', key: 'columnSize', align: 'center' },
      { title: 'Column Default Value', key: 'columnDefaultValue', align: 'center'}
    ]
  }),
  computed: {
    ...mapStores(useDatabaseConnectorStore),
    allTablesMetadata() {
      return this.databaseConnectorStore.allTablesMetadata;
    }
  }
};
</script>

<style scoped>
/* Add some basic styling */
.database-table-metadata-container {
  margin: auto;
  text-align: center;
  .v-data-table {
    border: 1px solid #ddd;
  }
}
</style>
