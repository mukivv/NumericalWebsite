-- ลบตารางเก่า(กันข้อมูลเก่ายังค้าง)
DROP TABLE IF EXISTS example;

CREATE TABLE example (
    id SERIAL PRIMARY KEY,
    method VARCHAR(50) NOT NULL,
    data JSONB NOT NULL
);

ALTER TABLE example OWNER TO batman;

INSERT INTO example (method, data) VALUES
('matrix', '{"aDB": [[2, 1], [-1, 3]], "bDB": [8, 7] , "n" : 2}'),
('matrix', '{"aDB": [[1, -2, 3], [2, 1, 1], [-3, 2, -2]], "bDB": [7, 4, -10], "n" : 3}'),
('matrix', '{"aDB": [[10, -1, 2, 0], [-1, 11, -1, 3], [2, -1, 10, -1], [0, 3, -1, 8]], "bDB": [6, 25, -11, 15], "n" : 4}'),
('matrix', '{"aDB": [[1, 1, 1], [0, 2, 5], [2, 5, -1]], "bDB": [6, -4, 27] , "n" : 3}'),
('matrix', '{"aDB": [[5, -2, 3], [-3, 9, 1], [2, -1, -7]], "bDB": [-1, 2, 3], "n" : 3}'),
('matrix', '{"aDB": [[1, 2], [3, 4]], "bDB": [5, 6] , "n" : 2}')