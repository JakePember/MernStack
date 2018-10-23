cd "C:\Program Files\MongoDB\Server"
cd $(ls) #Changes directory to dynamic version folder
MONGOD="$(PWD)\bin\mongod.exe"

"MONGOD" #Execute mongod.exe
read -n 1 -s -r -p "Press any key to continue"