<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 px-8 py-6">
      <div class="max-w-7xl mx-auto">
        <button
          @click="goBack"
          class="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span class="font-medium">Customer Information</span>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-8 py-8">
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p class="mt-4 text-gray-600">Loading contact information...</p>
      </div>

      <div v-else-if="!contact" class="text-center py-12">
        <p class="text-gray-600">Contact not found</p>
        <button
          @click="goBack"
          class="mt-4 text-primary hover:text-primary-hover font-semibold"
        >
          Go back to contacts
        </button>
      </div>

      <div v-else class="bg-white rounded-lg border border-gray-200 p-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- First Name -->
          <div>
            <h3 class="text-sm text-gray-500 mb-1">First Name</h3>
            <p class="text-lg font-semibold text-gray-900">{{ contact.name }}</p>
          </div>

          <!-- Email Address -->
          <div>
            <h3 class="text-sm text-gray-500 mb-1">Email Address</h3>
            <p class="text-lg font-semibold text-gray-900">{{ contact.email }}</p>
          </div>

          <!-- Contact Number -->
          <div>
            <h3 class="text-sm text-gray-500 mb-1">Contact Number</h3>
            <p class="text-lg font-semibold text-gray-900">{{ contact.phone }}</p>
          </div>
        </div>

        <!-- Additional Information if available -->
        <div v-if="contact.username || contact.website || contact.company" class="mt-8 pt-8 border-t border-gray-200">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Additional Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-if="contact.username">
              <h3 class="text-sm text-gray-500 mb-1">Username</h3>
              <p class="text-lg font-semibold text-gray-900">{{ contact.username }}</p>
            </div>

            <div v-if="contact.website">
              <h3 class="text-sm text-gray-500 mb-1">Website</h3>
              <p class="text-lg font-semibold text-gray-900">{{ contact.website }}</p>
            </div>

            <div v-if="contact.company?.name">
              <h3 class="text-sm text-gray-500 mb-1">Company</h3>
              <p class="text-lg font-semibold text-gray-900">{{ contact.company.name }}</p>
            </div>
          </div>
        </div>

        <!-- Address if available -->
        <div v-if="contact.address" class="mt-8 pt-8 border-t border-gray-200">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Address</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-if="contact.address.street">
              <h3 class="text-sm text-gray-500 mb-1">Street</h3>
              <p class="text-lg font-semibold text-gray-900">{{ contact.address.street }}</p>
            </div>

            <div v-if="contact.address.suite">
              <h3 class="text-sm text-gray-500 mb-1">Suite</h3>
              <p class="text-lg font-semibold text-gray-900">{{ contact.address.suite }}</p>
            </div>

            <div v-if="contact.address.city">
              <h3 class="text-sm text-gray-500 mb-1">City</h3>
              <p class="text-lg font-semibold text-gray-900">{{ contact.address.city }}</p>
            </div>

            <div v-if="contact.address.zipcode">
              <h3 class="text-sm text-gray-500 mb-1">Zipcode</h3>
              <p class="text-lg font-semibold text-gray-900">{{ contact.address.zipcode }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useContactStore } from '../../stores/contactStore'

const router = useRouter()
const route = useRoute()
const contactStore = useContactStore()

const loading = ref(true)

const contact = computed(() => {
  return contactStore.getContactById(route.params.id)
})

onMounted(async () => {
  if (contactStore.contacts.length === 0) {
    await contactStore.fetchContacts()
  }
  loading.value = false
})

const goBack = () => {
  router.push({ name: 'Home' })
}
</script>
