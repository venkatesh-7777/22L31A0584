import { Log } from '../../../LoggingMiddleware/src/logger';
import { Item } from '../types';

let items: Item[] = [
  { id: '1', name: 'Item 1', description: 'Description for item 1' },
  { id: '2', name: 'Item 2', description: 'Description for item 2' },
  { id: '3', name: 'Item 3', description: 'Description for item 3' }
];


export const getItems = async (): Promise<Item[]> => {
  try {
    Log('backend', 'debug', 'controller', 'Getting all items');
    return items;
  } catch (error) {
    Log('backend', 'error', 'controller', `Error getting items: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};


export const getItemById = async (id: string): Promise<Item | undefined> => {
  try {
    Log('backend', 'debug', 'controller', `Getting item with id: ${id}`);
    const item = items.find(item => item.id === id);
    return item;
  } catch (error) {
    Log('backend', 'error', 'controller', `Error getting item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};


export const addItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
  try {
    Log('backend', 'debug', 'controller', 'Adding new item');
    const id = (items.length + 1).toString();
    const newItem: Item = { ...item, id };
    items.push(newItem);
    return newItem;
  } catch (error) {
    Log('backend', 'error', 'controller', `Error adding item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};


export const updateItem = async (id: string, itemData: Partial<Item>): Promise<Item | undefined> => {
  try {
    Log('backend', 'debug', 'controller', `Updating item with id: ${id}`);
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) {
      return undefined;
    }
    
    items[index] = { ...items[index], ...itemData };
    return items[index];
  } catch (error) {
    Log('backend', 'error', 'controller', `Error updating item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};


export const deleteItem = async (id: string): Promise<boolean> => {
  try {
    Log('backend', 'debug', 'controller', `Deleting item with id: ${id}`);
    const initialLength = items.length;
    items = items.filter(item => item.id !== id);
    return items.length < initialLength;
  } catch (error) {
    Log('backend', 'error', 'controller', `Error deleting item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
};