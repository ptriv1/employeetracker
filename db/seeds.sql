USE employee_db;


INSERT INTO department (id, name)
VALUE (1, "Engineering");

INSERT INTO role (id, title, salary, department_id)
VALUE (101, "manager", 50000, 1);