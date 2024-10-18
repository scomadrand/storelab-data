import json
import psycopg2

# Conectar a la base de datos PostgreSQL
conn = psycopg2.connect(
    dbname="postgres",      # Cambia 'mydb' por el nombre de tu base de datos
    user="postgres",        # Tu usuario de PostgreSQL
    password="76773321", # Tu contraseña de PostgreSQL
    host="localhost",   # O la IP de tu servidor
    port="5432"         # Puerto predeterminado de PostgreSQL
)

cursor = conn.cursor()

# Cargar el archivo JSON
with open('/Users/sergio.comadran/Documents/MONSTARLAB/00_PROYECTOS/BOTRISTA/storelab-data/botrista-data-app/data/chain_data.json') as f:
    chain_data = json.load(f)

# Insertar los datos en las columnas correctas de la tabla chain_data
for entry in chain_data:
    cursor.execute()

# Confirmar los cambios en la base de datos
conn.commit()

# Cerrar el cursor y la conexión
cursor.close()
conn.close()
