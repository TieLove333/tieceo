// test-live-api.js
import fetch from 'node-fetch';

// Replace with your actual Vercel deployment URL
const BASE_URL = 'https://tieceo.vercel.app';

async function testEndpoint(endpoint) {
  console.log(`Testing ${endpoint}...`);
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Response data:', JSON.stringify(data, null, 2));
      return { success: true, data };
    } else {
      const text = await response.text();
      console.log('Error response:', text);
      return { success: false, error: text };
    }
  } catch (error) {
    console.error(`Error testing ${endpoint}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function testPostUpdate() {
  console.log('\nTesting POST to /api/updates...');
  try {
    const response = await fetch(`${BASE_URL}/api/updates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      body: JSON.stringify({
        title: 'Test Update ' + new Date().toISOString(),
        content: 'This is a test update created by the API test script.'
      })
    });
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Response data:', JSON.stringify(data, null, 2));
      return { success: true, data };
    } else {
      const text = await response.text();
      console.log('Error response:', text);
      return { success: false, error: text };
    }
  } catch (error) {
    console.error('Error posting update:', error.message);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('=== TESTING LIVE API ENDPOINTS ===');
  console.log(`Base URL: ${BASE_URL}\n`);
  
  // Test db-test endpoint
  await testEndpoint('/api/db-test');
  
  // Test setup-db endpoint
  await testEndpoint('/api/setup-db');
  
  // Test GET updates endpoint
  await testEndpoint('/api/updates');
  
  // Test POST to updates endpoint
  await testPostUpdate();
  
  console.log('\n=== TESTS COMPLETED ===');
}

runTests().catch(error => {
  console.error('Test script error:', error);
}); 