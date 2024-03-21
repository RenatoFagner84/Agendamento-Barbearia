
CREATE DATABASE barbearia;

CREATE TABLE Cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    telefone VARCHAR(20) UNIQUE,
    senha VARCHAR(100)
);


CREATE TABLE Servicos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100)
);


INSERT INTO Servicos (nome) VALUES 
('Corte de Cabelo'),
('Barba'),
('Pigmentação'),
('Pintura');


CREATE TABLE Agendamentos (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES Cliente(id),
    servico_id INT REFERENCES Servicos(id),
    data_hora TIMESTAMP
);
