import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById, deleteItem } from '../services/api';
import type { Item } from '../types';
import { Log } from '../../../LoggingMiddleware/src/logger';

const ItemDetailPage: React.FC = () => {
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
        Log('frontend', 'info', 'page', `Detail page: Fetching item ${id}`);
        const data = await getItemById(id);
        setItem(data);
      } catch (err) {
        setError('Failed to fetch item details');
        Log('frontend', 'error', 'page', `Detail page error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !item) return;

    try {
      Log('frontend', 'info', 'page', `Attempting to delete item ${id}`);
      await deleteItem(id);
      Log('frontend', 'info', 'page', `Successfully deleted item ${id}`);
      navigate('/');
    } catch (err) {
      setError('Failed to delete item');
      Log('frontend', 'error', 'page', `Delete error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleBack = () => {
    Log('frontend', 'info', 'page', 'Navigating back to home');
    navigate('/');
  };

  const handleEdit = () => {
    if (!id) return;
    Log('frontend', 'info', 'page', `Navigating to edit item ${id}`);
    navigate(`/items/edit/${id}`);
  };

  if (loading) {
    return <div className="loading">Loading item details...</div>;
  }

  if (error || !item) {
    return (
      <div className="error-container">
        <div className="error-message">{error || 'Item not found'}</div>
        <button onClick={handleBack} className="back-button">Go Back</button>
      </div>
    );
  }

  return (
    <div className="item-detail-page">
      <button onClick={handleBack} className="back-button">
        Back to List
      </button>
      
      <div className="item-detail-content">
        <h2>{item.name}</h2>
        <p className="item-description">{item.description}</p>
        <div className="item-metadata">
          <span>Item ID: {item.id}</span>
        </div>
        
        <div className="item-actions">
          <button onClick={handleEdit} className="edit-button">
            Edit
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;