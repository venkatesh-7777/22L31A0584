import { Log } from '../../../LoggingMiddleware/src/logger';
import { Item } from '../types';

// This would be where you'd put business logic before passing to controllers
export const validateItem = (item: Partial<Item>): boolean => {
  try {
    Log('backend', 'debug', 'service', 'Validating item');
    
    if (!item.name || item.name.length < 3) {
      Log('backend', 'warn', 'service', 'Item name is missing or too short');
      return false;
    }
    
    if (!item.description || item.description.length < 10) {
      Log('backend', 'warn', 'service', 'Item description is missing or too short');
      return false;
    }
    
    return true;
  } catch (error) {
    Log('backend', 'error', 'service', `Error validating item: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return false;
  }
};