import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, [refreshToggle]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/contacts`
      );
      const data = await response.json();
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = () => {
    setRefreshToggle((s) => !s);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Contact Management</h1>
      </header>

      <main className="app-grid">
        <ContactForm onSubmit={handleFormSubmit} />
        <ContactList
          contacts={contacts}
          onDelete={handleFormSubmit}
          loading={loading}
        />
      </main>
    </div>
  );
}

export default App;
