INSERT INTO department (department.name)
VALUES ('Customer Service'),
       ('Admin'),
       ('Consulting'),
       ('Human Resources');

INSERT INTO role ( title, salary, department_id)
VALUES ('title1', 85000.00, 1),
       ('title2', 100000.00, 2),
       ('title3', 50000.00, 3),
       ('title4', 200000.00, 4),
       ('title5', 1500.00, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Thomas', 'Stenson', 1),
       ('Samantha', 'Sanchez', 2),
       ('Michael', 'Chaels', 3),
       ('Samuel', 'Jackson', 4),
       ('Daniella', 'Thompson', 5);
