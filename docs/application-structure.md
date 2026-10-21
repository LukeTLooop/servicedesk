# ServiceDesk Application Structure

## Overview

ServiceDesk is a full-stack IT help desk and asset management application.

## Core Modules

### Dashboard
- Ticket statistics
- Recent activity
- Assigned tickets
- Overview of support operations

### Tickets
- Create and manage tickets
- Ticket details and status tracking
- Ticket assignments and priorities
- Comments and activity history

### Assets
- Asset inventory
- Asset details
- Assign assets to users
- Track asset status

### Users
- User directory
- User profiles
- User ticket and asset history

### Administration
- User roles and permissions
- Ticket categories
- Application configuration

### Authentication
- User login and logout
- Protected application routes
- Role-based access control

## Technology Stack

Frontend: Next.js, React, TypeScript
Backend: Node.js, Express, TypeScript
Database: PostgreSQL
ORM: Prisma
Infrastructure: Docker Compose
CI: GitHub Actions