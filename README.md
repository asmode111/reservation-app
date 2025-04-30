# Reservation APP with Node.js, Angular.js, Typescript, and PostgreSQL.

## Design Choices

- The application is fully Dockerized, ensuring consistent behavior across various environments, including local, staging, and production. As long as Docker is installed and accessible on the local machine, the application can be launched seamlessly.

- The solution consists of four Docker containers:

  `reservation-app-api`: Handles the API implementation using Node.js and TypeScript.

  `reservation-app-web`: Hosts the web application, built with AngularJS and TypeScript.

  `reservation-app-db`: Runs the PostgreSQL database server.

  `pgadmin`: Provides a graphical interface for managing the PostgreSQL database.

- The folder structure is based on a proven setup used in a previous project, promoting consistency and maintainability.

- `Express` is utilized for a clean and efficient request/response handling experience.

- `Sequelize` is used as the ORM to standardize database models, queries, and interactions. Having worked with Sequelize in other projects—both with LiteSQL and PostgreSQL—I've found it to be highly effective and reliable.

- Configuration via environment variables is centralized in the `.env` file, allowing for easy adjustments based on the deployment environment.

- The API architecture is designed for clarity and scalability:

  Business logic is organized under the services directory.

  Type definitions and contracts are located in the interfaces folder.

  Import-related scripts and utilities are grouped under the import directory for better organization.
  Database models reside in the models folder, while database access logic is encapsulated within the repositories directory.

  Middleware components such as auth and request-logger are included to handle cross-cutting concerns. While authentication is not yet implemented, the system is flexible and can easily accommodate OAuth or basic authentication as needed.

## Requirements

- Docker

## Run the application

```bash 
docker-compose up --build
```

Use the command below to remove the DB volume.
```bash
docker-compose down -v
```

It will run the containers in the same projects.

- Visit `http://localhost:4200/` to run the `web` application. 

- No need to visit `api` application since `web` app interract the `api` directly. However, if you still want to run it via Swagger use this link. `http://localhost:3000`

### Initiate the data

```bash
docker exec reservation-app-api npm run generate-data
docker exec reservation-app-api npm run import-data
```

### Open the database on pgAdmin

1 - Visit `http://localhost:5050/` to open pgAdmin on browser. Follow the steps below to see the database on the pgAdmin.

2 - Click "Add New Server"

In the General tab:

Name: `reservation-app-db`

3 - In the Connection tab:

Host name/address: `reservation-app-db` (this must match the container_name or service name)

Port: `5432`

Username: `postgres` (or your ${DB_USER})

Password: `postgres` (or your ${DB_PASSWORD})

✅ Check "Save Password"

4 - Click Save, and you should see your reservation-app database listed!

### Open the container on the bash

Get the container name and run the command below in case you want to run the commands inside the containers:

```bash
docker exec -it reservation-app-api /bin/bash
```

## Future development

- Move application to cloud with CI/CD pipelines.
- Merge `first_name`, `middle_name`, and `last_name` into one field like full_name. 
- Use Swagger or Postmane workspace to share the API endpoints and guideline.
- Tests will be added under the tests folder for both web and api.
- On the web application, when filter is done, URL would be updated by the filtered data. It improves the UX and make the link sharing possible between the colleagues.

## Known issues or limitations

- Search by `reservation.status` is a bit slow. It can be improved by adding index.
- Filter query performance can be improved.

## Success Criteria

Your solution should:

- ✅ Load and store 1,000,000 guest records
- ✅ Display the dataset with infinite or virtual scroll
- ✅ Support filtering on guest name, email, phone number, and booking reference
- ✅ Return filtered results with sub-second response times

## API Guideline

`GET api/guests`

Initial request:

```bash
http://localhost:3000/api/guests
```

Filter request:

```bash
http://localhost:3000/api/guests?email_address=aaron.aaron.carson@example.com
```

Success response
```bash
{
    "status": "success",
    "data": {
        "limit": 100,
        "guests": [
            {
                "id": 26,
                "first_name": "Aaron",
                "middle_name": "Aaron",
                "last_name": "Carson",
                "email_address": "aaron.aaron.carson@example.com",
                "phone_number": "+1-000-500-0026",
                "createdAt": "2025-04-21T11:50:50.046Z",
                "updatedAt": "2025-04-21T11:50:50.046Z",
                "reservations": [
                    {
                        "id": 26,
                        "booking_reference": "BB-000026-01",
                        "guest_id": 26,
                        "status": "Confirmed",
                        "createdAt": "2025-04-21T11:50:50.048Z",
                        "updatedAt": "2025-04-21T11:50:50.048Z"
                    },
                    {
                        "id": 27,
                        "booking_reference": "BB-000026-02",
                        "guest_id": 26,
                        "status": "CheckedIn",
                        "createdAt": "2025-04-21T11:50:50.048Z",
                        "updatedAt": "2025-04-21T11:50:50.048Z"
                    }
                ]
            }
        ]
    }
}
```

Error response
```bash
{
    "status": "error",
    "error": {
        "message": "Failed to get data",
        "details": {}
    }
}
```