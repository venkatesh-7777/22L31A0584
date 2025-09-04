import axios from 'axios';
import { LogLevel, LogStack, LogPackage } from './types';

interface LogResponse {
  logID: string;
  message: string;
}

class Logger {
  private authToken: string | null = null;
  private baseUrl = 'http://20.244.56.144/evaluation-service';
  
  constructor() {
    this.initialize();
  }
  
  private async initialize() {
    try {
      await this.authenticate();
    } catch (error) {
      console.error('Failed to initialize logger:', error);
    }
  }
  
  private async authenticate() {
    const credentials = {
      email: "venkateshkarri854@gmail.com",
      name: "karri v s m d satish",
      rollNo: "22l31a0584",
      accessCode: "YzuJeU",
      clientID: "8e699ce5-9b81-47a0-9739-bd0c3a2ca97f",
      clientSecret: "RdcVukwKYyquFbVY"
    };

    try {
      const response = await axios.post(`${this.baseUrl}/auth`, credentials);
      this.authToken = response.data.access_token;
      console.log('Logger authenticated successfully');
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  }
  
  async log(stack: LogStack, level: LogLevel, packageName: LogPackage, message: string): Promise<LogResponse | null> {
    if (!this.authToken) {
      await this.authenticate();
    }
    
    // Create the exact payload structure the API requires
    const payload = {
      stack,
      level,
      package: packageName, // Note: API expects 'package' not 'packageName'
      message
    };
    
    console.log('Sending log payload:', payload);
    
    try {
      const response = await axios({
        method: 'post',
        url: `${this.baseUrl}/logs`,
        data: payload, // Send as JSON
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;

    } catch (error: any) {
      console.error('Log request failed:', error.response?.data || error.message);
      
      // Try to re-authenticate if unauthorized
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await this.authenticate();
        
        try {
          const retryResponse = await axios({
            method: 'post',
            url: `${this.baseUrl}/logs`,
            data: payload,
            headers: {
              'Authorization': `Bearer ${this.authToken}`,
              'Content-Type': 'application/json'
            }
          });
          
          return retryResponse.data;
        } catch (retryError) {
          console.error('Log retry failed:', retryError);
        }
      }
      
      return null;
    }
  }
}

// Create a singleton instance
const loggerInstance = new Logger();

// Export the log function for easy usage
export const Log = (
  stack: LogStack, 
  level: LogLevel, 
  packageName: LogPackage, 
  message: string
): Promise<LogResponse | null> => {
  return loggerInstance.log(stack, level, packageName, message);
};

export default Log;