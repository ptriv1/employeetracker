USE employee_db;

INSERT INTO department (id, name)
VALUE (1, "Engineering");

INSERT INTO role (id, title, salary, department_id)
VALUE  (1000, "Assistant", 30000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUE (10000, "John", "Richards", 1000, null);  
       