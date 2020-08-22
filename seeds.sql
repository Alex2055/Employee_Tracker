
INSERT INTO Department (Department_name)
VALUES ("Sales"),
 ("Engineering"),
 ("Finance"),
("Legal");






INSERT INTO Role (title, salary, department_id)
VALUES ("Sales Lead", 90000, 1),
("Salesperson",70000 , 1),
("Lead Engineer",140000 , 2),
("Software Engineer",110000 , 2),
("Account Manager", 150000, 3),
("Accountant", 115000, 3),
("Legal Team Lead", 240000, 4),
("Lawyer", 180000, 4);



INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null),
("Mike", "Chan", 2, 1),
("Ashley", "Rodrigues", 3, null),
("Kevin", "Tupik", 4, 3),
("Kunal", "Singh", 5, null),
("Malia", "Brown", 6, 5),
("Sarah", "Lourd", 7, null),
("Tom", "Allen", 8, 7);



