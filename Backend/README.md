# 📦 Movie Tracker API

Esta API permite a los usuarios gestionar y realizar un seguimiento de las películas que han visto.
Pueden agregar, consultar su historial y eliminarlas de su lista.

API REST construida con **Spring Boot**, protegida con **JWT** y documentada usando **Swagger**.

---


## 🚀 🛠️ Tecnologías utilizadas

![Maven](https://img.shields.io/badge/Maven-C71A36?logo=apachemaven&logoColor=white)
![Java](https://img.shields.io/badge/Java-%23ED8B00.svg?logo=openjdk&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?logo=springsecurity&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F?logo=spring&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=json-web-tokens&logoColor=white)
![Licencia GPL-3.0](https://img.shields.io/badge/licencia-GPL%20v3-blue)


- Java 21
- PostgreSQL 17
- Spring Boot 3.4.4
- Spring Security 3.4.4
- JWT (JSON Web Tokens)
- Swagger / OpenAPI 2.8.6
- Maven 4.0.0

---

## 🔐 Autenticación

Está protegida con **JWT**.

1. Autenticarse en `/auth/login` con credenciales válidas.
2. Recibirás un **token JWT**.
3. Usa ese token como **Bearer Token** en el header `Authorization` para las demás peticiones.


## 📚 Swagger

Puedes explorar y probar la API desde **Swagger UI**:

http://localhost:8080/swagger-ui.html

![Captura de pantalla de Swagger UI](src/main/resources/images/swagger-ui-screenshot.png)