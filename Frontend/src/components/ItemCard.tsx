import React from 'react';
import { Link } from 'react-router-dom';
import type {Item} from '../types';
import { Log } from '../../../LoggingMiddleware/src/logger';

interface ItemCardProps {
  item: Item;
  onDelete: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete }) => {
  const handleDelete = () => {
    Log('frontend', 'info', 'component', `Delete button clicked for item ${item.id}`);
    onDelete(item.id);
  };

  return (
    <div className="item-card">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <div className="item-actions">
        <Link to={`/items/${item.id}`} className="view-button">
          View
        </Link>
        <Link to={`/items/edit/${item.id}`} className="edit-button">
          Edit
        </Link>
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItemCard;