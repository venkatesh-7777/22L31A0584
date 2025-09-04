import React from 'react';
import ItemForm from '../components/ItemForm';
import { createItem } from '../services/api';
import { Log } from '../../../LoggingMiddleware/src/logger';
import type { Item } from '../types';

const CreateItemPage: React.FC = () => {
  React.useEffect(() => {
    Log('frontend', 'info', 'page', 'Create item page mounted');
  }, []);

  const handleSubmit = async (data: Omit<Item, 'id'> | Partial<Item>): Promise<void> => {
    Log('frontend', 'info', 'page', 'Submitting new item data');
    await createItem(data as Omit<Item, 'id'>);
  };

  return (
    <div className="create-item-page">
      <ItemForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateItemPage;