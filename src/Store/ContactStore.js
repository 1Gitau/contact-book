
import { create } from 'zustand';

const useContactStore = create((set) => ({
  contacts: [],
  addContact: (contact) =>
    set((state) => ({
      contacts: [...state.contacts, { ...contact, disabled: false }],
    })),
  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
  disableContact: (id) =>
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === id ? { ...contact, disabled: !contact.disabled } : contact
      ),
    })),
}));

export default useContactStore;
