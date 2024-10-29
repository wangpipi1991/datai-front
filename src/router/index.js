// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import DatabaseConnection from '../pages/DatabaseConnection.vue';
import DatabaseTableMetadata from '../pages/DatabaseTableMetadata.vue';
import { isTokenValid } from '@/utils/auth';
import { useDatabaseConnectorStore } from "@/stores/databaseConnectorStore";
const routes = [
  {
    path: '/',
    name: 'DatabaseConnection',
    component: DatabaseConnection
  },
  {
    path: '/databaseTableMetadata',
    name: 'DatabaseTableMetadata',
    component: DatabaseTableMetadata,
    meta: { requiresAuth: true },
    beforeEnter: async () => {
      const dataStoreConnectorStore = useDatabaseConnectorStore();
      await dataStoreConnectorStore.fetchAllTablesMetaData();
      return true;
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = isTokenValid();
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // If the route requires authentication and no token is present, redirect to login page
    next({ name: 'DatabaseConnection' });
  } else {
    next();
  }
});

export default router
