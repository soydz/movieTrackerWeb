FROM maven:3.9.9-eclipse-temurin-21-alpine

EXPOSE 8080

WORKDIR /app

COPY ./pom.xml .

# descargamos las dependencias
RUN mvn dependency:go-offline

# codigo fuente
COPY ./src ./src

# contruimos la app
RUN mvn clean install -DskipTests

ENTRYPOINT ["java","-jar","/app/target/movie-tracker-api-1.0-SNAPSHOT.jar"]


