import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addContact, updateContact, deleteContact } from '../redux/contactsSlice';
import { v4 as uuidv4 } from 'uuid';

const ContactsPage: React.FC = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateContact({ id: editingId, name, email, phone }));
      setEditingId(null);
    } else {
      dispatch(addContact({ id: uuidv4(), name, email, phone }));
    }
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleEdit = (contact: { id: string, name: string, email: string, phone: string }) => {
    setName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone);
    setEditingId(contact.id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Contacts</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block border p-2 mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block border p-2 mb-2"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="block border p-2 mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editingId ? 'Update' : 'Add'} Contact
        </button>
      </form>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id} className="border p-2 mb-2 flex justify-between items-center">
            <div>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(contact)} className="bg-yellow-500 text-white p-2 mr-2">Edit</button>
              <button onClick={() => dispatch(deleteContact(contact.id))} className="bg-red-500 text-white p-2">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsPage;
