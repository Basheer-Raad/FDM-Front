import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const userRole = ref(localStorage.getItem('role') || '');

  const setUserRole = (role: string) => {
    userRole.value = role;
    localStorage.setItem('role', role);
  };

  const isAdmin = computed(() => {
    return userRole.value !== '"technician"';
  });

  return {
    userRole,
    setUserRole,
    isAdmin
  };
}); 