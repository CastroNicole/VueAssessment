<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div
      v-for="contact in contactStore.contacts"
      :key="contact.id"
      class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
    >
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-lg font-bold text-gray-900">{{ contact.name }}</h3>
        <div class="flex gap-2">
          <button
            @click="$emit('edit', contact)"
            class="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Edit"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            @click="$emit('delete', contact)"
            class="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Delete"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div class="space-y-2">
        <p class="text-gray-700">{{ contact.email }}</p>
        <p class="text-gray-700">{{ contact.phone }}</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="contactStore.loading" class="col-span-full text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="mt-4 text-gray-600">Loading contacts...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="contactStore.contacts.length === 0" class="col-span-full text-center py-12">
      <p class="text-gray-600">No contacts found. Add your first contact to get started!</p>
    </div>
  </div>
</template>

<script setup>
import { useContactStore } from '../../stores/contactStore'

const contactStore = useContactStore()

defineEmits(['edit', 'delete'])
</script>
