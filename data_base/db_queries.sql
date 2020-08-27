CREATE DATABASE app_store;

DROP TABLE IF EXISTS  fop;
DROP TABLE IF EXISTS  categories;
DROP TABLE IF EXISTS  users;
DROP TABLE IF EXISTS  purchases;
DROP TABLE IF EXISTS  apps;
DROP TABLE IF EXISTS  purchases_apps;
DROP TABLE IF EXISTS  dev_apps;

CREATE TABLE fop (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL
);

CREATE TABLE categories (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL
);

CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(60) NOT NULL,
  isDev BOOLEAN NOT NULL
);

CREATE TABLE purchases (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_fop INT NOT NULL,
  price float NOT NULL,
  id_user INT NOT NULL,
  KEY  fk_id_fop_id  (id_fop),
  KEY  fk_id_user_id  (id_user),
  CONSTRAINT fk_id_fop_id FOREIGN KEY (id_fop) REFERENCES fop (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_id_user_id FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE apps (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
  id_category INT NOT NULL,
  name VARCHAR(60) NOT NULL,
  price FLOAT NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  KEY  fk_id_category_id  (id_category),
  CONSTRAINT fk_id_category_id FOREIGN KEY (id_category) REFERENCES categories (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE purchases_apps (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_purchase INT NOT NULL,
  id_app INT NOT NULL,
  KEY  fk_id_purchase_id  (id_purchase),
  KEY  fk_id_app_id  (id_app),
  CONSTRAINT fk_id_app_id FOREIGN KEY (id_app) REFERENCES apps (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_id_purchase_id FOREIGN KEY (id_purchase) REFERENCES purchases (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE devs_apps (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_user INT NOT NULL,
  id_app INT NOT NULL,
  KEY  fk_id_users_id  (id_user),
  KEY  fk_id_apps_id  (id_app),
  CONSTRAINT fk_id_apps_id FOREIGN KEY (id_app) REFERENCES apps (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_id_users_id FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);