USE employeeTracker_db;
/* creates department data */
INSERT INTO department (name)
    VALUES ('Legal'),
           ('Sales');
/* creates the role data */
INSERT INTO role (title, salary, department_id)
    VALUES ('Sales Lead', 100000, 1),
           ('Salesperson', 80000, 1),
           ('Lawyer', 300000, 2),
           ('Legal Team Lead', 250000, 2);
/* creates employee data */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('Derek', 'Dang', 1, NULL),
           ('John', 'Doe', 4, NULL),
           ('Sarah', 'Emerson', 3, 2),
           ('Jared', 'Allen', 3, 2),
           ('Malia', 'Brown', 2, 1),
           ('Mike', 'Chan', 2, 1);
