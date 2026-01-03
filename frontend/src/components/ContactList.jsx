import React, { useState, useMemo } from 'react';

function ContactList({ contacts = [], onDelete, loading = false }) {
  const [deletingId, setDeletingId] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedContacts = useMemo(() => {
    if (!contacts.length) return [];
    
    // First filter by search term
    let filtered = contacts;
    if (searchTerm) {
      filtered = contacts.filter((contact) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          contact.name?.toLowerCase().includes(searchLower) ||
          contact.email?.toLowerCase().includes(searchLower) ||
          contact.phone?.toLowerCase().includes(searchLower) ||
          contact.message?.toLowerCase().includes(searchLower)
        );
      });
    }
    
    // Then sort the filtered results
    return [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        // Sort by created date (newest first)
        const dateA = new Date(a.createdAt || a._id);
        const dateB = new Date(b.createdAt || b._id);
        return dateB - dateA;
      } else {
        // Sort alphabetically
        const aValue = a[sortBy]?.toLowerCase() || '';
        const bValue = b[sortBy]?.toLowerCase() || '';
        return aValue.localeCompare(bValue);
      }
    });
  }, [contacts, sortBy, searchTerm]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to delete');
      }
      onDelete();
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert(error.message || 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <section className="card contact-list">
        <h2 className="card-title">Contacts</h2>
        <div className="empty-state">Loading contacts…</div>
      </section>
    );
  }

  return (
    <section className="card contact-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2 className="card-title" style={{ margin: 0 }}>Contacts</h2>
        {contacts.length > 0 && (
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{ 
              padding: '6px 10px', 
              borderRadius: '6px', 
              border: '1px solid #e5e7eb',
              fontSize: '0.85rem'
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="phone">Sort by Phone</option>
            <option value="date">Sort by Date</option>
          </select>
        )}
      </div>
      
      {contacts.length > 0 && (
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            marginBottom: '12px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontSize: '0.95rem'
          }}
        />
      )}

      {contacts.length === 0 ? (
        <div className="empty-state">
          <p>No contacts yet.</p>
          <small>Use the form to add your first contact.</small>
        </div>
      ) : filteredAndSortedContacts.length === 0 ? (
        <div className="empty-state">
          <p>No contacts found.</p>
          <small>Try a different search term.</small>
        </div>
      ) : (
        <div className="list-grid">
          {filteredAndSortedContacts.map((c) => (
            <article key={c._id} className="contact-card">
              <div className="contact-main">
                <div className="contact-name">{c.name}</div>
                <div className="contact-phone">{c.phone}</div>
                <div className="contact-email">{c.email}</div>
              </div>
              <div className="contact-message">{c.message}</div>
              <div className="contact-actions">
                <button className="btn danger" onClick={() => handleDelete(c._id)} disabled={deletingId === c._id}>
                  {deletingId === c._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ContactList;
