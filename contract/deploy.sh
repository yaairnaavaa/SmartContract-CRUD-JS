#!/bin/sh

echo "¿Quieres desplegar el contrato?"
select yn in "Si" "No"; 
do
    case $yn in
        Si ) 
                echo Ingrese la cuenta:
                read account
                near deploy $account build/contract.wasm; break;;
        No ) exit;;
    esac
done