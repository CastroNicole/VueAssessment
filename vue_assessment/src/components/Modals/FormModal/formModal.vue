<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative animate-modal">
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Name Field -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            :class="errors.name ? 'border-red-500' : 'border-gray-300'"
            placeholder="Enter name"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Contact Number Field -->
        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">
            Contact Number
          </label>
          <input
            id="phone"
            v-model="formData.phone"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            :class="errors.phone ? 'border-red-500' : 'border-gray-300'"
            placeholder="Enter contact number"
          />
          <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
        </div>

        <!-- Email Address Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            :class="errors.email ? 'border-red-500' : 'border-gray-300'"
            placeholder="Enter email address"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-purple-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-semibold transition-colors"
          >
            {{ mode === 'add' ? 'Add Contact' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useContactStore } from '../../../stores/contactStore'

const props = defineProps({
  contact: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'add' // 'add' or 'edit'
  }
})

const emit = defineEmits(['close'])

const contactStore = useContactStore()

const formData = reactive({
  name: '',
  phone: '',
  email: ''
})

const errors = reactive({
  name: '',
  phone: '',
  email: ''
})

// Initialize form data if editing
if (props.mode === 'edit' && props.contact) {
  formData.name = props.contact.name || ''
  formData.phone = props.contact.phone || ''
  formData.email = props.contact.email || ''
}

// Validate form
const validateForm = () => {
  let isValid = true
  
  // Reset errors
  errors.name = ''
  errors.phone = ''
  errors.email = ''

  // Validate name
  if (!formData.name.trim()) {
    errors.name = 'Please enter a name.'
    isValid = false
  }

  // Validate phone
  if (!formData.phone.trim()) {
    errors.phone = 'Please enter a contact number.'
    isValid = false
  }

  // Validate email
  if (!formData.email.trim()) {
    errors.email = 'Please enter an email address.'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address.'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  try {
    if (props.mode === 'add') {
      await contactStore.addContact({
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      })
    } else {
      await contactStore.updateContact(props.contact.id, {
        ...props.contact,
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      })
    }
    emit('close')
  } catch (error) {
    console.error('Error submitting form:', error)
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
