import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Item } from '../types';
import { Log } from '../../../LoggingMiddleware/src/logger';

interface ItemFormProps {
  initialData?: Item;
  onSubmit: (data: Omit<Item, 'id'> | Partial<Item>) => Promise<void>;
  isEditing?: boolean;
}

const ItemForm: React.FC<ItemFormProps> = ({ initialData, onSubmit, isEditing = false }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ name: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      Log('frontend', 'debug', 'component', `Form initialized with item data: ${initialData.id}`);
      setName(initialData.name);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors = { name: '', description: '' };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    Log('frontend', 'info', 'component', `Form submission attempt for ${isEditing ? 'editing' : 'creating'} item`);

    if (!validate()) {
      Log('frontend', 'warn', 'component', 'Form validation failed');
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({ name, description });
      Log('frontend', 'info', 'component', `Form submitted successfully for ${isEditing ? 'editing' : 'creating'} item`);
      navigate('/');
    } catch (error) {
      Log('frontend', 'error', 'component', `Form submission error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    Log('frontend', 'info', 'component', 'Form canceled');
    navigate('/');
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Item' : 'Create New Item'}</h2>
      
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isSubmitting}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          disabled={isSubmitting}
        />
        {errors.description && <span className="error">{errors.description}</span>}
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="submit-button" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : isEditing ? 'Update Item' : 'Create Item'}
        </button>
        <button 
          type="button" 
          className="cancel-button" 
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ItemForm;