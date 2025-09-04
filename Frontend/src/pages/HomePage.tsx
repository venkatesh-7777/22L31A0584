import React, { useState, useEffect } from 'react';
import { getItems, deleteItem } from '../services/api';
import ItemCard from '../components/ItemCard';
import type { Item } from '../types';
import { Log } from '../../../LoggingMiddleware/src/logger';

const HomePage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch items. Please try again later.');
      Log('frontend', 'error', 'page', `Homepage error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Log('frontend', 'info', 'page', 'Home page mounted');
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      Log('frontend', 'info', 'page', `Successfully deleted item ${id}`);
      // Refresh items after deletion
      fetchItems();
    } catch (error) {
      Log('frontend', 'error', 'page', `Error deleting item: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setError('Failed to delete item. Please try again.');
    }
  };

  if (loading) {
    return <div className="loading">Loading items...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-page">
      <h2>All Items</h2>
      {items.length === 0 ? (
        <p className="no-items">No items found. Add some items to get started.</p>
      ) : (
        <div className="items-grid">
          {items.map((item,index) => (
            <ItemCard key={index} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;