import { Router } from 'express';
import * as controllers from '../controllers';
import { Log } from '../../../LoggingMiddleware/src/logger';

const router = Router();

router.get('/items', async (req, res) => {
  try {
    Log('backend', 'info', 'route', 'Fetching all items');
    const items = await controllers.getItems();
    res.json(items);
  } catch (error) {
    Log('backend', 'error', 'route', `Failed to fetch items: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

router.get('/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    Log('backend', 'info', 'route', `Fetching item with id: ${id}`);
    const item = await controllers.getItemById(id);
    
    if (!item) {
      Log('backend', 'warn', 'route', `Item not found with id: ${id}`);
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    Log('backend', 'error', 'route', `Failed to fetch item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

router.post('/items', async (req, res) => {
  try {
    Log('backend', 'info', 'route', 'Adding new item');
    const newItem = req.body;
    
    if (!newItem.name || !newItem.description) {
      Log('backend', 'warn', 'route', 'Missing required fields for new item');
      return res.status(400).json({ error: 'Name and description are required' });
    }
    
    const item = await controllers.addItem(newItem);
    res.status(201).json(item);
  } catch (error) {
    Log('backend', 'error', 'route', `Failed to add item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

router.put('/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    Log('backend', 'info', 'route', `Updating item with id: ${id}`);
    const updatedItem = await controllers.updateItem(id, req.body);
    
    if (!updatedItem) {
      Log('backend', 'warn', 'route', `Item not found for update with id: ${id}`);
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(updatedItem);
  } catch (error) {
    Log('backend', 'error', 'route', `Failed to update item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

router.delete('/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    Log('backend', 'info', 'route', `Deleting item with id: ${id}`);
    const success = await controllers.deleteItem(id);
    
    if (!success) {
      Log('backend', 'warn', 'route', `Item not found for deletion with id: ${id}`);
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.status(204).end();
  } catch (error) {
    Log('backend', 'error', 'route', `Failed to delete item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

export default router;