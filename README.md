# Cuba Comunica

⚡  Este proyecto es una red social cubana, construido con Django Rest Framework, React, Tenstack y Tailwind CSS. Permite a los usuarios crear una cuenta, iniciar sesión y compartir publicaiones, con otros usuarios en línea, ademas de tener comentarios, likes, compartir, notifiaciones y chat privados con websockets



### Instalar y usar

- clona el repo y crea un ambiente virtual con python
```bash
git clone https://github.com/albertolicea00/CubaComunica-twitter-clone_practice.git
cd twitter-clone
python -m venv env
```
- activa el ambiente en LINUX y MACOS
```bash
source env/bin/activate
```

- activa el ambiente en WINDOWS
```bash
venv\Scripts\activate.bat
```

- instala dependencias
```bash
pip install -r requirements.txt

```
- correr las migraciones
```bash
python manage.py migrate
```

- crear super-usuario con privilegios de administrador
```bash
python manage.py createsuperuser
```

- corre el servidor
```bash
python manage.py runserver
```

- corre los tests
```bash
python manage.py test
```

- en una nueva terminal instala las dependencias de react y corre el servidor
```bash
cd CubaComunica-twitter-clone_practice/frontend
npm i
npm run dev
```

## Credits ⭐
### Código base :information_source: https://github.com/agustfricke/twitter-clone

### YouTube video :tv: https://www.youtube.com/watch?v=4l9N4ozhwFY&t=6273s

