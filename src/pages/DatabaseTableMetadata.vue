<template>
  <div class="database-table-metadata-container">
    <h2 class="title">All Tables' Metadata</h2>
    <div v-if="allTablesMetadata && allTablesMetadata.length > 0">
      <v-data-table
        density="compact"
        :headers="tableHeaders"
        :items="allTablesMetadata"
      >
        <template v-slot:item.tableName="{ item }">
          <h3>{{ item.tableName }}</h3>
        </template>
        <template v-slot:item.columns="{ item }">
          <v-data-table
            density="compact"
            :headers="columnHeaders"
            :items="item.columns"
          >
            <template v-slot:item.columnName="{ item }">
              <div>
                <span>{{ item.columnName }}</span>
                <span v-if="item.primaryKey">(<b style="color: red">PK</b>)</span>
                <span v-if="item.foreignKeyMetadata">(<b style="color: blue">FK</b> reference to <b>{{ item.foreignKeyMetadata.pkTableName }}</b>.{{ item.foreignKeyMetadata.pkColumnName }})</span>
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
      { title: 'Table Name', key: 'tableName', align: 'center', width: '20%', sortable: true },
      { title: 'Table Columns', key: 'columns', align: 'start', width: '80%', sortable: false },
    ],
    columnHeaders: [
      { title: 'Column Name', key: 'columnName', align: 'start', width: '20%' },
      { title: 'Column Type', key: 'columnType', align: 'start', width: '20%' },
      { title: 'Column Size', key: 'columnSize', align: 'start', width: '20%' },
      { title: 'Column Default Value', key: 'columnDefaultValue', align: 'start', width: '20%'}
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
  .title {
    text-align: center;
    margin-bottom: 1em;
    margin-top: 1em;
  }
  .v-data-table {
    border: 1px solid #ddd;
  }
}
</style>
