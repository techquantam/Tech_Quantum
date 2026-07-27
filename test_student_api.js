// Using Node's native fetch API (v18+)
const API_URL = 'http://localhost:5000';

async function runTests() {
  console.log('--- STARTING CERTIFICATE API TESTS ---');
  try {
    // 1. Admin Login
    console.log('1. Testing Admin Login...');
    const loginRes = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'cyvanta@123' })
    });
    
    if (!loginRes.ok) {
      throw new Error(`Login failed with status ${loginRes.status}`);
    }
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('✔ Login successful. Token obtained:', token);

    // 2. Create Student
    console.log('\n2. Testing Create Student...');
    const studentData = {
      certificateNumber: 'TQ-TEST-2026',
      studentName: 'Alex Mercer',
      college: 'Empire State University',
      branch: 'Biotechnology',
      course: 'Web Development',
      internshipProgram: 'Advanced Web Development Program',
      duration: '6 Weeks',
      issueDate: 'July 27, 2026',
      status: 'Completed'
    };

    const createRes = await fetch(`${API_URL}/api/admin/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(studentData)
    });

    if (!createRes.ok) {
      const err = await createRes.json();
      throw new Error(`Create student failed: ${JSON.stringify(err)}`);
    }
    const createdStudent = await createRes.json();
    console.log('✔ Student created successfully:', createdStudent);

    // 3. Get Student List
    console.log('\n3. Testing Get Student List...');
    const listRes = await fetch(`${API_URL}/api/admin/students?search=Alex`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const listData = await listRes.json();
    console.log(`✔ Found ${listData.students.length} student(s) matching search.`);
    if (listData.students.length === 0) {
      throw new Error('Student was not found in the search list');
    }

    // 4. Public Verify Endpoint
    console.log('\n4. Testing Public Verify Endpoint (Valid Code)...');
    const verifyRes = await fetch(`${API_URL}/api/verify/TQ-TEST-2026`);
    if (!verifyRes.ok) {
      throw new Error(`Verification failed for TQ-TEST-2026: ${verifyRes.status}`);
    }
    const verifiedData = await verifyRes.json();
    console.log('✔ Public verification successful:', verifiedData);

    // 5. Public Verify Endpoint (Invalid Code)
    console.log('\n5. Testing Public Verify Endpoint (Invalid Code)...');
    const verifyInvalidRes = await fetch(`${API_URL}/api/verify/XYZ-999`);
    console.log(`✔ Public verification for invalid code returned status: ${verifyInvalidRes.status} (Expected: 404)`);
    if (verifyInvalidRes.status !== 404) {
      throw new Error(`Expected 404 for invalid certificate, got ${verifyInvalidRes.status}`);
    }

    // 6. Update Student
    console.log('\n6. Testing Update Student (Changing status to Revoked)...');
    const updateRes = await fetch(`${API_URL}/api/admin/students/${createdStudent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: 'Revoked' })
    });
    const updatedStudent = await updateRes.json();
    console.log('✔ Student updated successfully:', updatedStudent);

    // 7. Verify Updated Status
    console.log('\n7. Checking Updated Status via Public Verify API...');
    const verifyUpdatedRes = await fetch(`${API_URL}/api/verify/TQ-TEST-2026`);
    const verifiedUpdatedData = await verifyUpdatedRes.json();
    console.log('✔ Current Status on Verification:', verifiedUpdatedData.status);
    if (verifiedUpdatedData.status !== 'Revoked') {
      throw new Error(`Expected status to be Revoked, got ${verifiedUpdatedData.status}`);
    }

    // 8. Delete Student
    console.log('\n8. Testing Delete Student...');
    const deleteRes = await fetch(`${API_URL}/api/admin/students/${createdStudent.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const deleteData = await deleteRes.json();
    console.log('✔ Delete response:', deleteData);

    // 9. Verify Deleted
    console.log('\n9. Checking Deleted Record via Public Verify API...');
    const verifyDeletedRes = await fetch(`${API_URL}/api/verify/TQ-TEST-2026`);
    console.log(`✔ Public verification for deleted code returned status: ${verifyDeletedRes.status} (Expected: 404)`);
    if (verifyDeletedRes.status !== 404) {
      throw new Error(`Expected 404 for deleted certificate, got ${verifyDeletedRes.status}`);
    }

    console.log('\n🎉 ALL API TESTS PASSED SUCCESSFULLY! 🎉');
  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
  }
}

runTests();
