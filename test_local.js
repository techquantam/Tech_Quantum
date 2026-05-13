async function test() {
  try {
    const res = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test Local',
        email: 'test@example.com',
        phone: '1234567890',
        service: 'Test Service',
        message: 'Testing API'
      })
    });
    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();
