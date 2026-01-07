<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 px-8 py-6">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold mb-2">{{ viewMode === 'card' ? 'Contacts Information' : 'Customer Information' }}</h1>
        <p class="text-gray-600">
          Your list of {{ viewMode === 'card' ? 'contacts' : 'customers' }} appear here. To add a new contact, click on the 
          Add New {{ viewMode === 'card' ? 'Contact' : 'Customer' }} button.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-8 py-6">
      <!-- Action Bar -->
      <div class="flex justify-between items-center mb-6">
        <div></div>
        <div class="flex items-center gap-4">
          <button
            @click="openAddModal"
            class="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full font-semibold transition-colors"
          >
            Add New {{ viewMode === 'card' ? 'Contact' : 'Customer' }}
          </button>
          
          <!-- View Toggle -->
          <div class="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              @click="viewMode = 'card'"
              :class="[
                'p-2 transition-colors',
                viewMode === 'card' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'
              ]"
              title="Card View"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              @click="viewMode = 'table'"
              :class="[
                'p-2 transition-colors',
                viewMode === 'table' ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'
              ]"
              title="Table View"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Contact List -->
      <ContactCard v-if="viewMode === 'card'" @edit="openEditModal" @delete="openDeleteModal" />
      <ContactTable v-else @edit="openEditModal" @delete="openDeleteModal" />
    </div>

    <!-- Modals -->
    <FormModal
      v-if="showFormModal"
      :contact="selectedContact"
      :mode="formMode"
      @close="closeFormModal"
    />

    <DeleteModal
      v-if="showDeleteModal"
      :contact="selectedContact"
      @close="closeDeleteModal"
    />

    <!-- Alert -->
    <div
      v-if="contactStore.alert"
      class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in"
    >
      <div
        :class="[
          'flex items-center gap-3 px-6 py-3 rounded-lg shadow-lg',
          contactStore.alert.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        ]"
      >
        <svg v-if="contactStore.alert.type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span class="font-medium">{{ contactStore.alert.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useContactStore } from '../../stores/contactStore'
import ContactCard from '../ContactCard/contactCard.vue'
import ContactTable from '../ContactTable/contactTable.vue'
import FormModal from '../Modals/FormModal/formModal.vue'
import DeleteModal from '../Modals/DeleteModal/deleteModal.vue'

const contactStore = useContactStore()
const viewMode = ref('card')
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const selectedContact = ref(null)
const formMode = ref('add')

onMounted(() => {
  contactStore.fetchContacts()
})

const openAddModal = () => {
  selectedContact.value = null
  formMode.value = 'add'
  showFormModal.value = true
}

const openEditModal = (contact) => {
  selectedContact.value = contact
  formMode.value = 'edit'
  showFormModal.value = true
}

const closeFormModal = () => {
  showFormModal.value = false
  selectedContact.value = null
}

const openDeleteModal = (contact) => {
  selectedContact.value = contact
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedContact.value = null
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translate(-50%, 20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
