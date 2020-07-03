## Подключение
Создать базу данных mysql с именем api, внутри нее - таблицу data. 
Пример базы на скриншоте.
``` sql
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS `api` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `api`;

CREATE TABLE `data` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `name` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `distance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

TRUNCATE TABLE `data`;

ALTER TABLE `data`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;
```

В файле backend/config изменить хост на нужный, поменять пароль, логин для входа в бд. 
Поменять переменную host в файле App.js так, чтобы она вела на бэкенд.
