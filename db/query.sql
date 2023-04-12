SELECT department.name AS department, role.title, FORMAT(salary, 2) AS sallary
FROM role
JOIN department ON role.department_id = department.id;
