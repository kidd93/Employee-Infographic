USE employees;

INSERT INTO department(name)
VALUES
    ('Finance'),
    ('Legal'),
    ('Resources');

INSERT INTO role(title, salary, department_id)
VALUES 
    ('Account Manager', 120000, 1),
    ('Accountant', 80000, 1),
    ('Funpolice Manager', 140000, 2),
    ('Funpolice Deputy', 70000, 2),
    ('HR Supervisor', 140000, 3),
    ('HR Secretary', 70000, 3);

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES 
    ('Hailey','Christianson', 1, NULL), 
    ('Kelsie', 'Kidd', 2, 1),
    ('Luna', 'Pitbull', 3, NULL),
    ('Mannie', 'Dopeydog', 4, 3),
    ('Riley', 'Queencat', 5, NULL),
    ('Rocco', 'Sneezyboy', 6, 5);