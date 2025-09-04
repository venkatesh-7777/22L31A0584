const { Log } = require('./LoggingMiddleware/dist/logger');

async function testLogger() {
  try {
    console.log('Starting logger test...');
    
    // Make sure all required fields are explicitly provided
    const result = await Log(
      'backend',  // stack
      'info',     // level
      'utils',    // package
      'Test log message' // message
    );
    
    console.log('Log result:', result);
  } catch (error) {
    console.error('Error testing logger:', error);
  }
}

testLogger();