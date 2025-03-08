import React, { useState, useEffect } from 'react';
import profapi from '../api/professorApi';

const Professeur = () => {
  const [professors, setProfessors] = useState([]);
  const [newProfessor, setNewProfessor] = useState({ name: '', bio: '' });

  useEffect(() => {
    profapi.get('/professeurs/all')
      .then(response => {
        setProfessors(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the professors!", error);
      });
  }, []);

  const handleAddProfessor = () => {
    profapi.post('/professeurs/add', newProfessor)
      .then(response => {
        setProfessors([...professors, response.data.newProfesseur]);
        setNewProfessor({ name: '', bio: '' });
      })
      .catch(error => {
        console.error("There was an error adding the professor!", error);
      });
  };

  // Styles
  const styles = {
    container: { textAlign: 'center', padding: '20px', maxWidth: '600px', margin: 'auto' },
    listContainer: { textAlign: 'left', padding: '10px', background: '#f9f9f9', borderRadius: '10px' },
    listItem: { display: 'flex', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #ddd' },
    formContainer: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '15px', borderRadius: '10px', background: '#f0f0f0', maxWidth: '350px', margin: '20px auto' },
    input: { padding: '8px', border: '1px solid #ccc', borderRadius: '5px' },
    button: { padding: '10px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <h2>Professors</h2>
      <div style={styles.listContainer}>
        <ul>
          {professors.map((prof) => (
            <div>
              <li key={prof._id} style={styles.listItem}>
                <strong>{prof.name}</strong> {prof.bio}
              </li>
            </div>
          ))}
        </ul>
      </div>

      <h3>Add New Professor</h3>
      <div style={styles.formContainer}>
        <input 
          type="text" 
          placeholder="Name" 
          value={newProfessor.name} 
          onChange={(e) => setNewProfessor({ ...newProfessor, name: e.target.value })}
          style={styles.input}
        />
        <input 
          type="text" 
          placeholder="Bio" 
          value={newProfessor.bio} 
          onChange={(e) => setNewProfessor({ ...newProfessor, bio: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleAddProfessor} style={styles.button}>Add Professor</button>
      </div>
    </div>
  );
};

export default Professeur;
