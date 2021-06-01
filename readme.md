# Acerca del proyecto
Este repositorio contiene el código backend de una web con las funcionalidades CRUD para reportes de gastos de una empresa, para ver el código frontend visitar este [repositorio.](https://github.com/josangelATM/ExpenseReports-frontend)
# Endpoints (API) 

 - /users/login [POST]
 - /users/register [POST]
 - /reports [GET,POST]
 - /reports/search [GET]
 - /reports/ID [GET,PATCH,DELETE]
# Autenticación 
Para la autenticación de usuarios se utilizo el middleware Passport con la estrategia local, es decir usuario y contraseña. 

