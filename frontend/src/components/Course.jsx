import React, { useState, useEffect } from 'react';
import coursApi from '../api/coursApi';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ titre: '', description: '', professeur_id: '', prix: '' });

  useEffect(() => {
    getAllCourses()
  }, []);
  const getAllCourses=()=>{
    coursApi.get('/courses/all')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the courses!", error);
      });
  }
  const handleAddCourse = () => {
    coursApi.post('/courses/add', newCourse)
      .then(response => {
        setCourses([...courses, response.data.newCourse]);
        setNewCourse({  titre: '', description: '', professeur_id: '', prix: '' });
      })
      .catch(error => {
        console.error("There was an error adding the course!", error);
      });
  };
  const handleDelete = (id) => {
    coursApi.delete(`/courses/delete/${id}`)
      .then(response => {
        getAllCourses()
      })
      .catch(error => {
        console.error("There was an error adding the course!", error);
      });
  };

  const styles = {
    container: { textAlign: 'center', padding: '20px', maxWidth: '600px', margin: 'auto' },
    listContainer: { textAlign: 'left', padding: '10px', background: '#f9f9f9', borderRadius: '10px' },
    listItem: { display: 'flex', justifyContent: 'space-between',padding: '8px', borderBottom: '1px solid #ddd' },
    formContainer: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '15px', borderRadius: '10px', background: '#f0f0f0', maxWidth: '350px', margin: '20px auto' },
    input: { padding: '8px', border: '1px solid #ccc', borderRadius: '5px' },
    button: { padding: '10px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <h2>Courses</h2>
      <div style={styles.listContainer}>
        <ul>
          {courses.map(course => (
            <li key={course.id} style={styles.listItem}>
              <strong>{course.titre}</strong> - {course.description} - <strong>${course.prix}</strong>
              <button onClick={()=>handleDelete(course.id)}>supprimer</button>

            </li>
          ))}
        </ul>
      </div>

      <h3>Add New Course</h3>
      <div style={styles.formContainer}>
        <input 
          type="text" 
          placeholder="Title" 
          value={newCourse.titre} 
          onChange={(e) => setNewCourse({ ...newCourse, titre: e.target.value })}
          style={styles.input}
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={newCourse.description} 
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          style={styles.input}
        />
        <input 
          type="text" 
          placeholder="Teacher ID" 
          value={newCourse.professeur_id} 
          onChange={(e) => setNewCourse({ ...newCourse, professeur_id: e.target.value })}
          style={styles.input}
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={newCourse.prix} 
          onChange={(e) => setNewCourse({ ...newCourse, prix: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleAddCourse} style={styles.button}>Add Course</button>
      </div>
    </div>
  );
};

export default Course;
