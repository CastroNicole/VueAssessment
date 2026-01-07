<template>
  <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div v-if="contactStore.loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="mt-4 text-gray-600">Loading contacts...</p>
    </div>

    <div v-else-if="contactStore.contacts.length === 0" class="text-center py-12">
      <p class="text-gray-600">No contacts found. Add your first contact to get started!</p>
    </div>

    <table v-else class="w-full">
      <thead>
        <tr class="bg-purple-900 text-white">
          <th class="px-6 py-4 text-left font-semibold">Name</th>
          <th class="px-6 py-4 text-left font-semibold">Contact Number</th>
          <th class="px-6 py-4 text-left font-semibold">Email Address</th>
          <th class="px-6 py-4 text-center font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(contact, index) in contactStore.contacts"
          :key="contact.id"
          :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
          class="hover:bg-gray-100 transition-colors"
        >
          <td class="px-6 py-4 border-b border-gray-200">
            <button
              @click="goToContact(contact.id)"
              class="text-gray-900 hover:text-primary font-medium underline"
            >
              {{ contact.name }}
            </button>
          </td>
          <td class="px-6 py-4 border-b border-gray-200 text-gray-700">
            {{ contact.phone }}
          </td>
          <td class="px-6 py-4 border-b border-gray-200 text-gray-700">
            {{ contact.email }}
          </td>
          <td class="px-6 py-4 border-b border-gray-200">
            <div class="flex justify-center gap-3">
              <button
                @click="$emit('edit', contact)"
                class="p-2 hover:bg-gray-200 rounded transition-colors"
                title="Edit"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button
                @click="$emit('delete', contact)"
                class="p-2 hover:bg-gray-200 rounded transition-colors"
                title="Delete"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useContactStore } from '../../stores/contactStore'

const contactStore = useContactStore()
const router = useRouter()

defineEmits(['edit', 'delete'])

const goToContact = (id) => {
  router.push({ name: 'ContactInfo', params: { id } })
}
</script>
