import React, { useState, useEffect } from 'react';
import studentApi from '../api/studentApi';
import coursApi from '../api/coursApi';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '', courses: [] });
  const [enrollCourseId, setEnrollCourseId] = useState('');
  const [courses, setCourses] = useState([]); 
  const [error, setError] = useState('');

  useEffect(() => {
    studentApi.get('/students/all')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        setError('There was an error fetching the students.');
        console.error(error);
      });

      coursApi.get('/courses/all') 
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        setError('There was an error fetching courses.');
        console.error(error);
      });
  }, []);

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email) {
      setError('Please fill in all fields.');
      return;
    }

    studentApi.post('/students/add', newStudent)
      .then(response => {
        setStudents([...students, response.data.newStudent]);
        setNewStudent({ name: '', email: '', courses: [] });
        setError('');
      })
      .catch(error => {
        setError('There was an error adding the student.');
        console.error(error);
      });
  };

  const handleEnrollStudent = (studentId) => {
    if (!enrollCourseId) {
      setError('Please enter a course ID to enroll.');
      return;
    }

    studentApi.post(`/students/enroll/${studentId}/${enrollCourseId}`)
      .then(response => {
        setStudents(students.map(student =>
          student.id === studentId ? { ...student, courses: [...student.courses, enrollCourseId] } : student
        ));
        setEnrollCourseId('');
        setError('');
      })
      .catch(error => {
        setError('There was an error enrolling the student.');
        console.error(error);
      });
  };
console.log(students)
  const styles = {
    container: { textAlign: 'center', padding: '20px', maxWidth: '600px', margin: 'auto' },
    listContainer: { textAlign: 'left', padding: '10px', background: '#f9f9f9', borderRadius: '10px' },
    listItem: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px', borderBottom: '1px solid #ddd' },
    formContainer: { display: 'flex', flexDirection: 'column', gap: '10px', padding: '15px', borderRadius: '10px', background: '#f0f0f0', maxWidth: '350px', margin: '20px auto' },
    input: { padding: '8px', border: '1px solid #ccc', borderRadius: '5px' },
    button: { padding: '10px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    enrollContainer: { display: 'flex', gap: '10px' },
    enrollInput: { padding: '5px', border: '1px solid #ccc', borderRadius: '5px', width: '120px' },
    enrollButton: { padding: '5px', background: '#28A745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    error: { color: 'red', marginBottom: '10px' }
  };
  return (
    <div style={styles.container}>
      <h2>Students</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.listContainer}>
        <ul>
          {students.map(student => (
            <li key={student._id} style={styles.listItem}>
              <span>{student.name} - {student.email}</span>
              <div style={styles.enrollContainer}>
                <select 
                  onChange={(e) => setEnrollCourseId(e.target.value)} 
                  style={styles.enrollInput}
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.titre}</option>
                  ))}
                </select>
                <button onClick={() => handleEnrollStudent(student.id)} style={styles.enrollButton}>
                  Enroll
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h3>Add New Student</h3>
      <div style={styles.formContainer}>
        <input 
          type="text" 
          placeholder="Name" 
          value={newStudent.name} 
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          style={styles.input}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={newStudent.email} 
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleAddStudent} style={styles.button}>Add Student</button>
      </div>
    </div>
  );
};

export default Student;
