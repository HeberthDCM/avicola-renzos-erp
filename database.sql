USE avicola_erp;

-- PERMISOS
CREATE TABLE permissions (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
module VARCHAR(50),
action VARCHAR(50)
);

INSERT INTO permissions (name,module,action) VALUES

('Ver Dashboard','dashboard','view'),

('Ver Usuarios','users','view'),
('Crear Usuarios','users','create'),
('Editar Usuarios','users','edit'),
('Eliminar Usuarios','users','delete'),

('Ver Roles','roles','view'),
('Crear Roles','roles','create'),
('Editar Roles','roles','edit'),
('Eliminar Roles','roles','delete'),

('Ver Caja','caja','view'),
('Crear Caja','caja','create'),
('Cerrar Caja','caja','close');

-- RELACION ROLES PERMISOS

CREATE TABLE role_permissions(

role_id INT,
permission_id INT,

PRIMARY KEY(role_id,permission_id)

);

-- ROOT tiene todos los permisos

INSERT INTO role_permissions
SELECT 1,id FROM permissions;

-- BITACORA

CREATE TABLE audit_log(

id INT AUTO_INCREMENT PRIMARY KEY,

user_id INT,
action VARCHAR(50),
table_name VARCHAR(50),
record_id INT,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


--- caja ----
-- TABLA CAJAS

CREATE TABLE cajas (

id INT AUTO_INCREMENT PRIMARY KEY,
company_id INT,
name VARCHAR(100),
status INT DEFAULT 1

);

INSERT INTO cajas (company_id,name) VALUES (1,'Caja Principal');

-- APERTURAS

CREATE TABLE caja_aperturas (

id INT AUTO_INCREMENT PRIMARY KEY,

caja_id INT,
user_id INT,

fecha DATE,

monto_inicial DECIMAL(10,2),

estado ENUM('abierta','cerrada') DEFAULT 'abierta',

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- MOVIMIENTOS

CREATE TABLE caja_movimientos (

id INT AUTO_INCREMENT PRIMARY KEY,

apertura_id INT,

tipo ENUM('ingreso','egreso'),

concepto VARCHAR(255),

monto DECIMAL(10,2),

user_id INT,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- CIERRES

CREATE TABLE caja_cierres (

id INT AUTO_INCREMENT PRIMARY KEY,

apertura_id INT,

monto_final DECIMAL(10,2),

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);