FROM php:7.4-apache

# Instalar dependencias necesarias para PostgreSQL
RUN apt-get update && apt-get install -y \
       libpq-dev \
       && docker-php-ext-configure pgsql --with-pgsql=/Libraries/PostgreSQL/16 \
       && docker-php-ext-configure pdo_pgsql --with-pdo-pgsql=/Libraries/PostgreSQL/16 \
       && docker-php-ext-install pdo pdo_pgsql pgsql

# Instalar extensiones de PHP
RUN docker-php-ext-install pdo pdo_pgsql pgsql

# Copiar el código PHP
COPY . /var/www/html/

# Exponer el puerto en el que Apache está escuchando
EXPOSE 80