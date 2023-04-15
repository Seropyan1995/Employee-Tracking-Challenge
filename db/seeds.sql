INSERT INTO department (department.name)
VALUES ('Customer Service'),
       ('Admin'),
       ('Consulting'),
       ('Human Resources');

INSERT INTO role ( title, salary, department_id)
VALUES ('Role 1', 85000.00, 1),
       ('Role 2', 100000.00, 2),
       ('Role 3', 50000.00, 3),
       ('Role 4', 200000.00, 4),
       ('Role 5', 1500.00, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Thomas', 'Stenson', 1),
       ('Samantha', 'Sanchez', 2),
       ('Michael', 'Chaels', 3),
       ('Samuel', 'Jackson', 4),
       ('Daniella', 'Thompson', 5);
