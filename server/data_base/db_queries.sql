CREATE DATABASE app_store;

DROP TABLE IF EXISTS  categories;
DROP TABLE IF EXISTS  users;
DROP TABLE IF EXISTS  purchases;
DROP TABLE IF EXISTS  apps;
DROP TABLE IF EXISTS  purchases_apps;

CREATE TABLE categories (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL
);

INSERT  INTO  categories  VALUES (1,'LIFESTYLE'),(2,'SOCIAL MEDIA'), (3,'UTILITY'), (4,'GAMES/ENTERTAINMENT'), (5,'PRODUCTIVITY'), (6,'NEWS/INFORMATION');

CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  email VARCHAR(60) NOT NULL,
  password VARCHAR(60) NOT NULL,
  isDev BOOLEAN NOT NULL
);
INSERT  INTO  users  VALUES (1,'clienttest@gmail.com', 'clienttest', 0),(2,'devtest@gmail.com','devtest',1);

CREATE TABLE purchases (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  price float NOT NULL,
  id_user INT NOT NULL,
  KEY  fk_id_user_id  (id_user),
  CONSTRAINT fk_id_user_id FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE apps (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
  id_category INT NOT NULL,
  id_dev INT NOT NULL,
  name VARCHAR(60) NOT NULL,
  price FLOAT NOT NULL,
  img_url VARCHAR(255) NOT NULL,
  KEY  fk_id_category_id  (id_category),
  KEY  fk_id_dev_id  (id_dev),
  CONSTRAINT fk_id_category_id FOREIGN KEY (id_category) REFERENCES categories (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_id_dev_id FOREIGN KEY (id_dev) REFERENCES users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT  INTO  apps  VALUES (1, 1, 2, 'test app 1', 50.00, 'url.com'), (2, 2, 2, 'test app 2', 9.99, 'url.com');

CREATE TABLE purchases_apps (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  id_purchase INT NOT NULL,
  id_app INT NOT NULL,
  KEY  fk_id_purchase_id  (id_purchase),
  KEY  fk_id_app_id  (id_app),
  CONSTRAINT fk_id_app_id FOREIGN KEY (id_app) REFERENCES apps (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_id_purchase_id FOREIGN KEY (id_purchase) REFERENCES purchases (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);