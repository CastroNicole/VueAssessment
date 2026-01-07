<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-modal">
      <div class="text-center">
        <!-- Warning Icon -->
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <!-- Title -->
        <h3 class="text-lg font-bold text-gray-900 mb-2">
          Delete Contact
        </h3>

        <!-- Message -->
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete 
          <span class="font-semibold">{{ contact?.name }}</span>? 
          This action cannot be undone.
        </p>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button
            @click="$emit('close')"
            class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleDelete"
            class="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useContactStore } from '../../../stores/contactStore'

const props = defineProps({
  contact: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const contactStore = useContactStore()

const handleDelete = async () => {
  try {
    await contactStore.deleteContact(props.contact.id)
    emit('close')
  } catch (error) {
    console.error('Error deleting contact:', error)
  }
}
</script>

<style scoped>
@keyframes modal {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-modal {
  animation: modal 0.2s ease-out;
}
</style>
