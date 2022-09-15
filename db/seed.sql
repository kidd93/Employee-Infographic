USE employees;

INSERT INTO employee 

(first_name,last_name,role_id,manager_id)

VALUES 
('Hailey','Christianson', 1, NULL), 
('Kelsie', 'Kidd', 2, 1),
('Luna', 'Pitbull', 3, NULL),
('Mannie', 'Dopeydog', 4, 3),
('Riley', 'Queencat', 5, NULL),
('Rocco', 'Sneezyboy', 6, 5),

INSERT INTO role

(title, salary, department_id)

VALUES 
('Account Manager', 120000, 1),
('Accountant', 80000, 2),
('Funpolice Manager', 140000, 3),
('Funpolice Deputy', 70000, 4),
('HR Supervisor', 140000, 5),
('HR Secretary', 70000, 6),

INSERT INTO department

('Finance'),
('Legal'),
('Resources');