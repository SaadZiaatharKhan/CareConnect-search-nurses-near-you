import React from 'react';

export default function PatientRequest({ status, onRequestNurse }) {
  return (
    <div>
      <h2>Request a Nurse</h2>
      <button onClick={onRequestNurse}>Request Nearest Nurse</button>
      <p>Status: {status}</p>
    </div>
  );
}
