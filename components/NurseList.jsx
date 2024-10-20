import React from 'react';

export default function NurseList({ nurses }) {
  return (
    <div>
      <h2>Available Nurses</h2>
      <ul>
        {nurses.map(nurse => (
          <li key={nurse.id}>
            {nurse.name} - Location: {nurse.lat}, {nurse.lng}
          </li>
        ))}
      </ul>
    </div>
  );
}
