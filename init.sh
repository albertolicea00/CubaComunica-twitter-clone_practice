#!/bin/bash

# Activar el entorno virtual de tu proyecto Python
if [[ "$OSTYPE" == "linux-gnu" ]]; then
    source env/bin/activate
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    source env/Scripts/activate
else
    echo "Sistema operativo o shell incompatible."
    exit 1