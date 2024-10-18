# Usar una imagen ligera de Python
FROM python:3.9-slim

# Instalar las dependencias del sistema, incluyendo el cliente de PostgreSQL
RUN apt-get update && apt-get install -y postgresql-client

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo de dependencias (requirements.txt)
COPY requirements.txt .

# Instalar las dependencias de Python/Django
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente de la aplicación Django
COPY . .

# Exponer el puerto 8000 en el contenedor
EXPOSE 8000

# Comando para iniciar el servidor Django cuando el contenedor arranque
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
