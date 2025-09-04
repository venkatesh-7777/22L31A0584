import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItemForm from '../components/ItemForm';
import { getItemById, updateItem } from '../services/api';
import type { Item } from '../types';
import { Log } from '../../../LoggingMiddleware/src/logger';

const EditItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) {
        setError('Item ID is missing');
        setLoading(false);
        return;
      }

      try {
        Log('frontend', 'info', 'page', `Edit page: Fetching item ${id}`);
        const data = await getItemById(id);
        setItem(data);
      } catch (err) {
        setError('Failed to fetch item details');
        Log('frontend', 'error', 'page', `Edit page error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (data: Partial<Item>) => {
    if (!id) return;
    
    Log('frontend', 'info', 'page', `Updating item ${id}`);
    await updateItem(id, data);
  };

  if (loading) {
    return <div className="loading">Loading item details...</div>;
  }

  if (error || !item) {
    return (
      <div className="error-container">
        <div className="error-message">{error || 'Item not found'}</div>
        <button onClick={() => navigate('/')} className="back-button">Go Back</button>
      </div>
    );
  }

  return (
    <div className="edit-item-page">
      <ItemForm 
        initialData={item} 
        onSubmit={handleSubmit} 
        isEditing={true} 
      />
    </div>
  );
};

export default EditItemPage;