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
  const styles = {
    container: { textAlign: 'center', margin: '20px', maxWidth: "350px", border:'black dashed 1px', margin: "auto" },
    form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px", margin: "auto" },
  };
  return (
    <div>
      <h2>Professors</h2>
      <ul>
        {professors.map((prof) => (
          <li key={prof._id}>{prof.name} - {prof.bio}</li>
        ))}
      </ul>
        <div style={styles.container}>
          <h3>Add New Professor</h3>
          <div style={styles.form}>
            <input 
              type="text" 
              placeholder="Name" 
              value={newProfessor.name} 
              onChange={(e) => setNewProfessor({ ...newProfessor, name: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="Bio" 
              value={newProfessor.bio} 
              onChange={(e) => setNewProfessor({ ...newProfessor, bio: e.target.value })}
            />
            <button onClick={handleAddProfessor}>Add Professor</button>
          </div>  
        </div>
    </div>
  );
};

export default Professeur;
