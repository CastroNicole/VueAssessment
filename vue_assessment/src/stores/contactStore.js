import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3000/contacts'

export const useContactStore = defineStore('contact', {
  state: () => ({
    contacts: [],
    loading: false,
    error: null,
    alert: null
  }),

  getters: {
    getContactById: (state) => (id) => {
      return state.contacts.find(contact => contact.id === parseInt(id))
    },
    contactsCount: (state) => state.contacts.length
  },

  actions: {
    async fetchContacts() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(API_URL)
        this.contacts = response.data
      } catch (error) {
        this.error = 'Failed to fetch contacts'
        console.error('Error fetching contacts:', error)
      } finally {
        this.loading = false
      }
    },

    async addContact(contact) {
      try {
        const response = await axios.post(API_URL, contact)
        this.contacts.push(response.data)
        this.showAlert('Successfully added a new contact!', 'success')
        return response.data
      } catch (error) {
        this.error = 'Failed to add contact'
        this.showAlert('Failed to add contact', 'error')
        throw error
      }
    },

    async updateContact(id, updatedContact) {
      try {
        const response = await axios.put(`${API_URL}/${id}`, updatedContact)
        const index = this.contacts.findIndex(c => c.id === id)
        if (index !== -1) {
          this.contacts[index] = response.data
        }
        this.showAlert('Changes saved', 'success')
        return response.data
      } catch (error) {
        this.error = 'Failed to update contact'
        this.showAlert('Failed to update contact', 'error')
        throw error
      }
    },

    async deleteContact(id) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        this.contacts = this.contacts.filter(c => c.id !== id)
        this.showAlert('Contact deleted successfully', 'success')
      } catch (error) {
        this.error = 'Failed to delete contact'
        this.showAlert('Failed to delete contact', 'error')
        throw error
      }
    },

    showAlert(message, type = 'success') {
      this.alert = { message, type }
      setTimeout(() => {
        this.alert = null
      }, 3000)
    },

    clearAlert() {
      this.alert = null
    }
  }
})
