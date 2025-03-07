import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#333',
      color: '#fff',
    },
    logo: {
      margin: 0,
    },
    navLinks: {
      listStyle: 'none',
      display: 'flex',
      gap: '20px',
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '16px',
    },
    button: {
      background: "none",
      color: "white",
      border: "none",
      cursor: "pointer",
    }
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>School Management</h2>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/professors" style={styles.link}>Professors</Link></li>
        <li><Link to="/students" style={styles.link}>Students</Link></li>
        <li><Link to="/courses" style={styles.link}>Courses</Link></li>
        {user ? (
          <li><button onClick={logout} style={styles.button}>Logout</button></li>
        ) : (
          <div>
            <li><Link to="/login" style={styles.link}>Login</Link></li>
            <li><Link to="/register" style={styles.link}>Register</Link></li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Header;
