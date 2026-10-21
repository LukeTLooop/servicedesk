# ServiceDesk Architecture

## 1. Overview

ServiceDesk is a full-stack IT help desk and asset management application built using a monorepo architecture.

The application consists of 3 primary layers:

- Frontend: Next.js, React, and TypeScript
- Backend: Express, Node.js, and TypeScript
- Database: PostgreSQL, accessed through Prisma ORM

## 2. Monorepo Structure

```
servicedesk/
|-- apps/
|   |-- api/               # Express backend
|   |-- web/               # Next.js frontend
|-- docs/                  # Project documentation
|-- .github/workflows/     # CI workflows
|-- compose.yaml           # Docker infrastructure
|-- package.json           # Workspace configuration
```

npm workspaces manage the frontend and backend within the same repository.

## 3. Frontend Architecture

The frontend uses Next.js with React and TypeScript

Responsibilities include:

- Rendering application pages and UI components
- Managing client-side interactions
- Communicating with the backend through HTTP requests
- Displaying server responses and errors

Local development runs at http://localhost:3000.

The backend URL is configured through NEXT_PUBLIC_API_URL in apps/web/.env.local

## 4. Backend Architecture

The backend uses Express with Node.js and TypeScript.

Responsibilities include:

- Providing REST API endpoints
- Validating incoming requests
- Enforcing authentication and authorization
- Implementing application business logic
- Accessing PostgreSQL through Prisma
- Returning structured JSON responses

Local development runs at http://localhost:4000.

Current endpoints:

- GET /health: Verifies the API is running
- GET /health/db: Development endpoint that verifies PostgreSQL connectivity

The backend currently allows cross-origin requests from http://localhost:3000.

Future development will introduce dedicated routes, controllers, and services, as required.

## 5. Database Architecture

PostgreSQL 17 runs inside Docker using Docker Compose.

- Database: servicedesk
- Database user: servicedesk
- Host: 127.0.0.1
- Port: 5432
- Persistence: Docker-managed volume

Prisma ORM provides type-safe database access.

The API's reusable Prisma Client is defined in apps/api/src/db.ts.

Database credentials are stored in local environment variables and excluded from Git.

Core entities planned for Phase 2 include User, Ticket, TicketComment, Asset, and TicketCategory.
TicketActivity and audit history are future considerations.

## 6. Application Data Flow

1. User interacts with the Next.js frontend.
2. Frontend sends HTTP request to Express.
3. Express processes and validates request.
4. If database access is required, Express calls Prisma.
5. Prisma communicates with PostgreSQL.
6. Backend returns JSON response.
7. Frontend updates UI.

Not every request requires database access.

## 7. Development and Infrastructure

Docker Compose manages the local PostgreSQL container.

npm workspaces provide independent development and build commands for the frontend and backend.

GitHub Actions performs automated checks including:

- Dependency installation
- Prisma Client generation
- ESLint checks
- TypeScript validation
- Frontend and backend production builds
- Database integration tests are not currently part of CI.

## 8. Future Architecture

Planned future improvements include:

- Authentication and authorization
- Ticket and asset management APIs
- Request validation and centralized error handling
- Database migrations
- Ticket activity and audit history
- Automated application tests
- Production deployment configuration

These features will be implemented in later development phases.
