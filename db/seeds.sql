USE employee_db;

INSERT INTO department (id, name)
VALUE (1, "manager");

INSERT INTO role (id, title, salary, department_id)
VALUE  (1000, "manager", 50000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (10000, "John", "Richards", 1000)
        