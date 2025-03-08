# 🍽️ Plateforme de Cours en Ligne (Microservices)

## 📖 Description
Ce projet consiste à créer une plateforme de cours en ligne basée sur une architecture microservices. Chaque microservice gère une fonctionnalité spécifique de la plateforme. Les services incluent l'authentification des utilisateurs, la gestion des cours, la gestion des étudiants et la gestion des enseignants. L'objectif est de permettre aux utilisateurs de s'inscrire à des cours, de consulter les cours disponibles, et de gérer les informations des utilisateurs de manière sécurisée avec JWT pour l'authentification.

## ✨ Fonctionnalités

### 🔒 Authentification (auth-service)
- **Inscription d'un utilisateur** 📋  
  Route `/register` (POST) : Inscription d'un utilisateur avec un mot de passe et des informations de profil.

- **Connexion d'un utilisateur** 🔑  
  Route `/login` (POST) : Connexion avec un email et un mot de passe pour obtenir un token JWT.

- **Récupération du profil utilisateur** 👤  
  Route `/profile` (GET) : Récupérer les informations de l'utilisateur connecté (authentification avec JWT).

### 📚 Cours (course-service)
- **Lister tous les cours** 📖  
  Route `/all` (GET) : Récupérer tous les cours.

- **Ajouter un nouveau cours** ✍️  
  Route `/add` (POST) : Ajouter un cours avec un titre, une description, un professeur, et un prix.

- **Mettre à jour un cours** 🔄  
  Route `/update/:id` (PUT) : Modifier un cours existant.

- **Supprimer un cours** 🗑️  
  Route `/delete/:id` (DELETE) : Supprimer un cours.

- **Rechercher des cours** 🔍  
  Route `/search` (GET) : Rechercher des cours par mot-clé.

### 👨‍🎓 Étudiant (student-service)
- **Lister tous les étudiants** 🎓  
  Route `/all` (GET) : Récupérer tous les étudiants.

- **Ajouter un nouvel étudiant** 🧑‍🎓  
  Route `/add` (POST) : Ajouter un étudiant avec des informations de base.

- **Inscrire un étudiant à un cours** 📝  
  Route `/enroll/:etudiant_id/:cours_id` (POST) : Inscrire un étudiant à un cours. (Vérification de la disponibilité du cours)

- **Récupérer les cours d’un étudiant** 📜  
  Route `/enrolledCourses/:etudiant_id` (GET) : Retourne les cours dans lesquels l'étudiant est inscrit.

### 👨‍🏫 Professeur (teacher-service)
- **Lister tous les professeurs** 👩‍🏫  
  Route `/all` (GET) : Récupérer tous les professeurs.

- **Ajouter un professeur** ✍️  
  Route `/add` (POST) : Ajouter un nouveau professeur avec un nom, une biographie et les cours associés.

- **Attribuer un cours à un professeur** 📚  
  Route `/assign/:professeur_id/:cours_id` (POST) : Assigner un cours à un professeur (vérification de la disponibilité du cours).

- **Lister les étudiants inscrits à un cours** 🧑‍🎓  
  Route `/enrolledStudents/:cours_id` (GET) : Retourne la liste des étudiants inscrits à un cours donné.
