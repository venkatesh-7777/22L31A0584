const axios = require('axios');

async function getToken() {
  const credentials = {
    email: "venkateshkarri854@gmail.com",
    name: "karri v s m d satish",
    rollNo: "22l31a0584",
    accessCode: "YzuJeU",
    clientID: "8e699ce5-9b81-47a0-9739-bd0c3a2ca97f",
    clientSecret: "RdcVukwKYyquFbVY"
  };

  try {
    const response = await axios.post('http://20.244.56.144/evaluation-service/auth', credentials);
    console.log('Auth successful!');
    return response.data.access_token;
  } catch (error) {
    console.error('Auth failed:', error.response?.data || error.message);
    throw error;
  }
}

async function directLogTest() {
  try {
    // Get a fresh token
    const token = await getToken();
    console.log('Token received:', token.substring(0, 15) + '...');

    // Construct the exact payload format required
    const payload = {
      stack: 'backend',
      level: 'info',
      package: 'utils',
      message: 'Direct test message'
    };

    console.log('Sending payload:', payload);

    // Make the request
    const response = await axios({
      method: 'post',
      url: 'http://20.244.56.144/evaluation-service/logs',
      data: payload,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Log success!', response.data);
  } catch (error) {
    console.error('Log failed:', error.response?.data || error.message);
  }
}

directLogTest();