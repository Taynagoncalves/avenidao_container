-- RESET
DROP DATABASE IF EXISTS avenidao_container;
CREATE DATABASE avenidao_container
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE avenidao_container;

-- =========================
-- USUÁRIOS
-- =========================
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  telefone VARCHAR(20),
  senha VARCHAR(255),
  termos_aceitos TINYINT(1) DEFAULT 0,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- GRUPOS DE ADICIONAIS
-- =========================
CREATE TABLE grupos_adicionais (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  ativo TINYINT(1) DEFAULT 1
);

-- =========================
-- CATEGORIAS
-- =========================
CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,

  contem_adicionais TINYINT(1) DEFAULT 0,
  grupo_adicional_id INT NULL,

  FOREIGN KEY (grupo_adicional_id)
    REFERENCES grupos_adicionais(id)
    ON DELETE SET NULL
);

-- =========================
-- PRODUTOS
-- =========================
CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2) NOT NULL,
  imagem VARCHAR(255),

  categoria_id INT NOT NULL,
  ativo TINYINT(1) DEFAULT 1,

  FOREIGN KEY (categoria_id)
    REFERENCES categorias(id)
    ON DELETE CASCADE
);

-- =========================
-- ADICIONAIS
-- =========================
CREATE TABLE adicionais (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  valor DECIMAL(10,2) NOT NULL,

  grupo_id INT NOT NULL,
  ativo TINYINT(1) DEFAULT 1,

  FOREIGN KEY (grupo_id)
    REFERENCES grupos_adicionais(id)
    ON DELETE CASCADE
);

-- =========================
-- PEDIDOS
-- =========================
CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  total DECIMAL(10,2),
  status ENUM('novo','preparo','entrega','concluido') DEFAULT 'novo',
  tipo_pagamento ENUM('online','entrega'),
  tipo_entrega ENUM('entrega','retirar'),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)
    ON DELETE SET NULL
);

-- =========================
-- ITENS DO PEDIDO
-- =========================
CREATE TABLE pedido_itens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT,
  produto_id INT,
  quantidade INT,

  FOREIGN KEY (pedido_id)
    REFERENCES pedidos(id)
    ON DELETE CASCADE,

  FOREIGN KEY (produto_id)
    REFERENCES produtos(id)
    ON DELETE CASCADE
);

-- =========================
-- ADICIONAIS DO ITEM
-- =========================
CREATE TABLE pedido_item_adicionais (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_item_id INT,
  adicional_id INT,

  FOREIGN KEY (pedido_item_id)
    REFERENCES pedido_itens(id)
    ON DELETE CASCADE,

  FOREIGN KEY (adicional_id)
    REFERENCES adicionais(id)
    ON DELETE CASCADE
);