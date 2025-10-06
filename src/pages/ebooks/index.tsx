import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { useHistory } from '@docusaurus/router';
import './index.css';

interface Ebook {
  id: string;
  title: string;
  description: string;
  contentLink: string;
  category: string;
}

// Sample Ebook Data
const ebooks: Ebook[] = [
  {
    id: '1',
    title: 'Mastering Data Science with Python',
    description: 'Learn Data Science with examples and real-world projects.',
    contentLink: 'https://learn.recodehive.com/datascience',
    category: 'Programming',
  },

];

// --------------------------
// Ebook Card Component
// --------------------------
const EbookCard: React.FC<{ ebook: Ebook }> = ({ ebook }) => {
  const history = useHistory();

  const handleClick = () => {
    if (ebook.contentLink.startsWith('http')) {
      window.open(ebook.contentLink, '_blank');
    } else {
      history.push(ebook.contentLink);
    }
  };

  return (
    <div className="ebook-card" onClick={handleClick}>
     
      <div className="ebook-content">
        <h3 className="ebook-card-title">{ebook.title}</h3>
        <p className="ebook-card-desc">{ebook.description}</p>
        <div className="ebook-category">{ebook.category}</div>
        <button className="ebook-read-btn">📖 Read Now</button>
      </div>
    </div>
  );
};

// --------------------------
// Main Ebook Page
// --------------------------
export default function EbookPage(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEbooks = ebooks.filter((ebook) =>
    ebook.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Ebooks" description="Explore ebooks and learning resources">
      <div className="ebook-container">
        {/* Hero Section */}
        <div className="ebook-hero">
          <h1 className="ebook-title">📚 Explore Ebooks</h1>
          <p className="ebook-subtitle">
            Read high-quality ebooks on programming, tools, and development.
          </p>
          <input
            type="text"
            className="ebook-search"
            placeholder="Search ebooks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid Section */}
        <div className="ebook-grid">
          {filteredEbooks.length === 0 && (
            <div className="no-results">
              <p>No ebooks found. Try a different search.</p>
            </div>
          )}
          {filteredEbooks.map((ebook) => (
            <EbookCard key={ebook.id} ebook={ebook} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
