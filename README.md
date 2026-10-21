# ServiceDesk

A full-stack IT help desk and asset management application built with Next.js, Express, PostgreSQL, and Prisma.

ServiceDesk is a portfolio project designed to demonstrate full-stack application development, database design, API development, authentication, and modern software engineering practices.

## Project Status

**Current stage: Phase 1, Foundation and Infrastructure**

The initial project structure and development infrastructure are operational.

**Implemented:**

- npm workspaces monorepo
- Next.js frontend with TypeScript
- Express REST API with TypeScript
- PostgreSQL 17 running through Docker Compose
- Prisma ORM with PostgreSQL driver adapter
- Frontend-to-backend communication
- API and database health checks
- ESLint and Prettier configuration
- GitHub Actions continuous integration

**Planned functionality:**

- User authentication and role-based authorization
- Support ticket creation, assignment, and resolution
- Ticket comments and activity history
- IT asset inventory and user assignments
- Administrative dashboard and reporting

## Technology Stack

| Layer           | Technology                               |
| --------------- | ---------------------------------------- |
| Frontend        | Next.js, React, TypeScript, Tailwind CSS |
| Backend         | Node.js, Express, TypeScript             |
| Database        | PostgreSQL 17                            |
| ORM             | Prisma 7                                 |
| Infrastructure  | Docker Compose                           |
| Code Quality    | ESLint, Prettier                         |
| CI              | GitHub Actions                           |
| Version Control | Git and GitHub                           |

## Project Structure

```text
servicedesk/
|-- apps/
|   |-- api/                    # Express backend
|   |   |-- prisma/             # Prisma schema
|   |   |-- src/                # Backend source code
|   |   |-- prisma7.config.ts   # Prisma configuration
|   |-- web/                    # Next.js frontend
|       |-- src/
|-- docs/                       # Architecture and design documentation
|-- .github/
|   |-- workflows/
|       |-- ci.yml              # CI pipeline
|-- compose.yaml                # PostgreSQL container configuration
|-- .env.example                # Backend/database environment template
|-- package.json                # Root workspace configuration
|-- package-lock.json
```

## Prerequisites

Before running ServiceDesk locally, install:

- Node.js 24 and npm
- Git
- Docker Desktop with Docker Compose
- Visual Studio Code or another code editor (recommended)

Docker Desktop must be running before starting PostgreSQL.

## Getting Started

The following commands use PowerShell on Windows. Run them from the project root unless otherwise specified.

### 1. Clone the Repository

```powershell
git clone https://github.com/LukeTLooop/servicedesk.git
cd servicedesk
```

### 2. Install Dependencies

```powershell
npm ci
```

This installs frontend, backend, and root development dependencies using the committed `package-lock.json`.

### 3. Configure Environment Variables

Create the root environment file:

```powershell
Copy-Item .env.example .env
```

Open `.env` and replace the placeholder password with your own local development password.

The `POSTGRES_PASSWORD` value must match the password embedded in `DATABASE_URL`. URL-encode special characters in the connection string.

Create the frontend environment file:

```powershell
Copy-Item apps/web/.env.example apps/web/.env.local
```

Its contents should include:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**Security:** Actual `.env` and `.env.local` files are excluded from Git. Never commit credentials or other secrets.

### 4. Start PostgreSQL

Make sure Docker Desktop is running.

```powershell
docker compose up -d
```

Check the database container:

```powershell
docker compose ps
```

Wait until the PostgreSQL service reports a healthy status.

The local database is available on `127.0.0.1:5432`.

Docker uses a named volume to persist PostgreSQL data between container restarts.

### 5. Generate Prisma Client

```powershell
.\node_modules\.bin\prisma.cmd generate --config .\apps\api\prisma7.config.ts
```

This generates the TypeScript Prisma Client from the current Prisma schema.

Generated Prisma Client files are excluded from Git and must be regenerated after cloning.

Database models and migrations will be introduced during later development phases.

### 6. Start the Backend

Open a terminal in the project root:

```powershell
npm run dev:api
```

The Express API runs at:

http://localhost:4000

### 7. Start the Frontend

Open a second terminal:

```powershell
npm run dev:web
```

The Next.js frontend runs at:

http://localhost:3000

Keep both development servers running while testing the application.

## API Endpoints

The following endpoints are currently implemented:

| Method | Endpoint     | Description                         |
| ------ | ------------ | ----------------------------------- |
| GET    | `/health`    | Confirms the Express API is running |
| GET    | `/health/db` | Checks connectivity to PostgreSQL   |

The database health endpoint is intended for local development and should be restricted or removed before production deployment.

The frontend currently displays the API connection status using the `/health` endpoint.

## Development Commands

Run commands from the monorepo root.

### Linting

Backend:

```powershell
npm run lint --workspace=apps/api
```

Frontend:

```powershell
npm run lint --workspace=apps/web
```

### Type Checking

Backend:

```powershell
npm run typecheck --workspace=apps/api
```

Frontend:

```powershell
npx tsc --noEmit -p apps/web/tsconfig.json
```

### Production Builds

Backend:

```powershell
npm run build --workspace=apps/api
```

Frontend:

```powershell
npm run build --workspace=apps/web
```

### Docker Commands

Start the database:

```powershell
docker compose up -d
```

View container status:

```powershell
docker compose ps
```

Stop the database container:

```powershell
docker compose down
```

The `down` command preserves the named PostgreSQL data volume. Avoid `docker compose down -v` unless you intentionally want to delete the database's stored data.

## Continuous Integration

GitHub Actions automatically validates pushes and pull requests targeting the `main` branch.

The CI pipeline performs:

1. Dependency installation
2. Prisma Client generation
3. Backend ESLint validation
4. Backend TypeScript checking
5. Backend production build
6. Frontend ESLint validation
7. Frontend production build

A successful workflow indicates that the application passes these automated checks. Database integration testing is not yet included.

## Documentation

Additional project documentation is available in the `docs/` directory:

- [Application Structure](docs/application-structure.md): Planned pages and features
- [Application Architecture](docs/architecture.md): Technical architecture and data flow
- [Data Model](docs/data-model.md): Planned entities and relationships

## Development Roadmap

The development process is organized into phases.

| Phase        | Focus                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------- |
| Phase 1      | Project foundation, infrastructure, and documentation                                          |
| Phase 2      | Database models and core backend functionality                                                 |
| Later phases | Authentication, frontend features, ticket workflows, asset management, testing, and deployment |

The application is under active development. Planned features and architecture may evolve as development progresses.

## License

No open-source license has been selected for this project.
