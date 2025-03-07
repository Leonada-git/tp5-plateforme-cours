import React, { useState, useEffect } from 'react';
import studentApi from '../api/studentApi';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', courses: [] });
  const [enrollCourseId, setEnrollCourseId] = useState('');

  useEffect(() => {
    studentApi.get('/students/all')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the students!", error);
      });
  }, []);

  const handleAddStudent = () => {
    studentApi.post('/students/add', newStudent)
      .then(response => {
        setStudents([...students, response.data.newStudent]);
        setNewStudent({ name: '', email: '', courses: [] });
      })
      .catch(error => {
        console.error("There was an error adding the student!", error);
      });
  };

  const handleEnrollStudent = (studentId) => {
    studentApi.post(`/students/enroll/${studentId}/${enrollCourseId}`)
      .then(response => {
        setStudents(students.map(student => 
          student._id === studentId ? { ...student, courses: [...student.courses, enrollCourseId] } : student
        ));
        setEnrollCourseId('');
      })
      .catch(error => {
        console.error("There was an error enrolling the student!", error);
      });
  };

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            {student.name} - {student.email}
            <ul>
              {student.courses.map(course => (
                <li key={course}>{course}</li>
              ))}
            </ul>
            <input 
              type="text" 
              placeholder="Course ID" 
              value={enrollCourseId} 
              onChange={(e) => setEnrollCourseId(e.target.value)}
            />
            <button onClick={() => handleEnrollStudent(student._id)}>Enroll in Course</button>
          </li>
        ))}
      </ul>

      <h3>Add New Student</h3>
      <input 
        type="text" 
        placeholder="Name" 
        value={newStudent.name} 
        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={newStudent.email} 
        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
      />
      <button onClick={handleAddStudent}>Add Student</button>
    </div>
  );
};

export default Student;
