import type { Item } from '../types';
import { Log } from '../../../LoggingMiddleware/src/logger';

const API_URL = 'http://localhost:3000/api';

export const getItems = async (): Promise<Item[]> => {
  try {
    Log('frontend', 'info', 'api', 'Fetching all items');
    const response = await fetch(`${API_URL}/items`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    Log('frontend', 'debug', 'api', `Retrieved ${data.length} items successfully`);
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    Log('frontend', 'error', 'api', `Failed to fetch items: ${errorMessage}`);
    throw error;
  }
};

export const getItemById = async (id: string): Promise<Item> => {
  try {
    Log('frontend', 'info', 'api', `Fetching item with id: ${id}`);
    const response = await fetch(`${API_URL}/items/${id}`);
    
    if (response.status === 404) {
      Log('frontend', 'warn', 'api', `Item not found with id: ${id}`);
      throw new Error('Item not found');
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    Log('frontend', 'debug', 'api', `Retrieved item with id: ${id} successfully`);
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    Log('frontend', 'error', 'api', `Failed to fetch item: ${errorMessage}`);
    throw error;
  }
};

export const createItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
  try {
    Log('frontend', 'info', 'api', 'Creating a new item');
    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    Log('frontend', 'debug', 'api', `Created item successfully with id: ${data.id}`);
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    Log('frontend', 'error', 'api', `Failed to create item: ${errorMessage}`);
    throw error;
  }
};

export const updateItem = async (id: string, item: Partial<Item>): Promise<Item> => {
  try {
    Log('frontend', 'info', 'api', `Updating item with id: ${id}`);
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    
    if (response.status === 404) {
      Log('frontend', 'warn', 'api', `Item not found for update with id: ${id}`);
      throw new Error('Item not found');
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    Log('frontend', 'debug', 'api', `Updated item with id: ${id} successfully`);
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    Log('frontend', 'error', 'api', `Failed to update item: ${errorMessage}`);
    throw error;
  }
};

export const deleteItem = async (id: string): Promise<void> => {
  try {
    Log('frontend', 'info', 'api', `Deleting item with id: ${id}`);
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'DELETE',
    });
    
    if (response.status === 404) {
      Log('frontend', 'warn', 'api', `Item not found for deletion with id: ${id}`);
      throw new Error('Item not found');
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    Log('frontend', 'debug', 'api', `Deleted item with id: ${id} successfully`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    Log('frontend', 'error', 'api', `Failed to delete item: ${errorMessage}`);
    throw error;
  }
};