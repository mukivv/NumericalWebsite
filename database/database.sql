-- ลบตารางเก่า(กันข้อมูลเก่ายังค้าง)
DROP TABLE IF EXISTS example;

CREATE TABLE example (
    id SERIAL PRIMARY KEY,
    method VARCHAR(50) NOT NULL,
    data JSONB NOT NULL
);

ALTER TABLE example OWNER TO batman;

INSERT INTO example (method, data) VALUES
-- Linear Algebra
('matrix', '{"aDB": [[2, 1], [-1, 3]], "bDB": [8, 7] , "n" : 2, "xInitial": [0, 0]}'),
('matrix', '{"aDB": [[1, -2, 3], [2, 1, 1], [-3, 2, -2]], "bDB": [7, 4, -10], "n" : 3, "xInitial": [0, 0, 0]}'),
('matrix', '{"aDB": [[10, -1, 2, 0], [-1, 11, -1, 3], [2, -1, 10, -1], [0, 3, -1, 8]], "bDB": [6, 25, -11, 15], "n" : 4, "xInitial": [0, 0, 0, 0]}'),
('matrix', '{"aDB": [[1, 1, 1], [0, 2, 5], [2, 5, -1]], "bDB": [6, -4, 27] , "n" : 3, "xInitial": [0, 0, 0]}'),
('matrix', '{"aDB": [[5, -2, 3], [-3, 9, 1], [2, -1, -7]], "bDB": [-1, 2, 3], "n" : 3, "xInitial": [0, 0, 0]}'),
('matrix', '{"aDB": [[1, 2], [3, 4]], "bDB": [5, 6] , "n" : 2, "xInitial": [0, 0]}'),
-- (symmetric matrix)
('matrix', '{"aDB": [[4, 1], [1, 3]], "bDB": [5, 5], "n": 2, "xInitial": [0, 0]}'),
('matrix', '{"aDB": [[2, -1, 0], [-1, 2, -1], [0, -1, 2]], "bDB": [1, 0, 1], "n": 3, "xInitial": [0, 0, 0]}'),
('matrix', '{"aDB": [[9, 6, 3], [6, 5, 2], [3, 2, 6]], "bDB": [18, 13, 11], "n": 3, "xInitial": [0, 0, 0]}'),
('matrix', '{"aDB": [[4, -1, 0, 3], [-1, 8, 5, 2], [0, 5, 6, -1], [3, 2, -1, 9]], "bDB": [8, 14, 10, 13], "n": 4, "xInitial": [0, 0, 0, 0]}'),

-- Bisection - False position
('root1', '{"xL": 1, "xR": 2, "fx": "x^3 - 7", "error": 0.00001}'),
('root1', '{"xL": 0, "xR": 1, "fx": "cos(x) - x*exp(x)", "error": 0.00001}'),
('root1', '{"xL": 1, "xR": 2, "fx": "x^2 - 2", "error": 0.00001}'),
('root1', '{"xL": 0.1, "xR": 0.5, "fx": "log(x) + 1", "error": 0.00001}'),
('root1', '{"xL": 2.5, "xR": 3.5, "fx": "x^3 - 6*x^2 + 11*x - 6.1", "error": 0.00001}'),
('root1', '{"xL": 1, "xR": 2, "fx": "x + 2 - exp(x)", "error": 0.00001}'),

-- One-Point
('onepoint', '{"xInitial": 0.5, "fx": "cos(x)", "error": 0.00001}'),
('onepoint', '{"xInitial": 1, "fx": "(x+1)^(1/3)", "error": 0.00001}'),
('onepoint', '{"xInitial": 4, "fx": "sqrt(2*x + 3)", "error": 0.00001}'),
('onepoint', '{"xInitial": 3, "fx": "log(x) + 2", "error": 0.00001}'),
('onepoint', '{"xInitial": 2, "fx": "(x^2 + 5) / (2*x)", "error": 0.00001}'),
('onepoint', '{"xInitial": 0.5, "fx": "exp(1-x)", "error": 0.00001}'),

-- Newton Raphson
('newton', '{"xInitial": 0.5, "fx": "cos(x)", "error": 0.00001}'),
('newton', '{"xInitial": 1, "fx": "x^3 + x - 3", "error": 0.00001}'),
('newton', '{"xInitial": 0.5, "fx": "cos(x) - x", "error": 0.00001}'),
('newton', '{"xInitial": 2, "fx": "x^2 - 5", "error": 0.00001}'),
('newton', '{"xInitial": 1, "fx": "exp(x) - 3", "error": 0.00001}'),
('newton', '{"xInitial": 0.5, "fx": "exp(1-x)", "error": 0.00001}'),

-- Secant Method
('secant', '{"xInitial": 2, "x": 3, "fx": "x^3 - 20", "error": 0.00001}'),
('secant', '{"xInitial": 1, "x": 2, "fx": "sin(x) - x/2", "error": 0.00001}'),
('secant', '{"xInitial": 0, "x": 1, "fx": "exp(x) - 3*x", "error": 0.00001}'),
('secant', '{"xInitial": 1.5, "x": 2, "fx": "x^4 - x - 10", "error": 0.00001}'),
('secant', '{"xInitial": 0.5, "x": 1, "fx": "log(x) + x", "error": 0.00001}'),
('secant', '{"xInitial": 2, "x": 4, "fx": "x^2 - 2*x - 3", "error": 0.00001}'),

-- Linear Regression
('regression', '{"n": 4, "m": 1, "X": [1, 2, 3, 4], "Y": [2, 4, 6, 8], "findX": 5}'),
('regression', '{"n": 5, "m": 1, "X": [0, 1, 2, 3, 4], "Y": [1, 3, 5, 7, 9], "findX": 2.5}'),
('regression', '{"n": 3, "m": 1, "X": [10, 20, 30], "Y": [30, 20, 10], "findX": 15}'),
('regression', '{"n": 5, "m": 1, "X": [1, 2, 3, 4, 5], "Y": [1.1, 1.9, 3.0, 4.2, 4.9], "findX": 3.5}'),
('regression', '{"n": 4, "m": 2, "X": [0, 1, 2, 3], "Y": [1, 2, 5, 10], "findX": 1.5}'),

-- Integration
('integration', '{"a": 0, "b": 1, "fx": "x^2", "n": 2}'),
('integration', '{"a": 0, "b": 3.14159, "fx": "sin(x)", "n": 4}'),
('integration', '{"a": 1, "b": 3, "fx": "1/x", "n": 6}'),
('integration', '{"a": 0, "b": 2, "fx": "exp(x^2)", "n": 8}'),
('integration', '{"a": 0, "b": 4, "fx": "sqrt(1 + x^3)", "n": 10}')

