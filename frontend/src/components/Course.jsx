import React, { useState, useEffect } from 'react';
import coursApi from '../api/coursApi';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ id: '', titre: '', description: '', professeur_id: '', prix: '' });

  useEffect(() => {
    coursApi.get('/courses/all')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const handleAddCourse = () => {
    coursApi.post('/courses/add', newCourse)
      .then(response => {
        setCourses([...courses, response.data.newCourse]);
        setNewCourse({ id: '', titre: '', description: '', professeur_id: '', prix: '' });
      })
      .catch(error => {
        console.error("There was an error adding the course!", error);
      });
  };

  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {course.titre} - {course.description} - ${course.prix}
          </li>
        ))}
      </ul>

      <h3>Add New Course</h3>
      <input 
        type="text" 
        placeholder="Course ID" 
        value={newCourse.id} 
        onChange={(e) => setNewCourse({ ...newCourse, id: e.target.value })}
      />
      <input 
        type="text" 
        placeholder="Title" 
        value={newCourse.titre} 
        onChange={(e) => setNewCourse({ ...newCourse, titre: e.target.value })}
      />
      <input 
        type="text" 
        placeholder="Description" 
        value={newCourse.description} 
        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
      />
      <input 
        type="text" 
        placeholder="Teacher ID" 
        value={newCourse.professeur_id} 
        onChange={(e) => setNewCourse({ ...newCourse, professeur_id: e.target.value })}
      />
      <input 
        type="number" 
        placeholder="Price" 
        value={newCourse.prix} 
        onChange={(e) => setNewCourse({ ...newCourse, prix: e.target.value })}
      />
      <button onClick={handleAddCourse}>Add Course</button>
    </div>
  );
};

export default Course;
