# ServiceDesk Core Data Model

## Overview

This document defines the initial data entities, their responsibilities, and relationships for the ServiceDesk application.

This is a conceptual design. Actual PostgreSQL tables and Prisma models will be implemented in a later phase.

## 1. User

Represents a registered ServiceDesk user.

**Core fields:**

- `id`: Unique identifier
- `name`: Full name
- `email`: Unique email address
- `role`: User permission level
- `createdAt`: Account creation timestamp
- `updatedAt`: Last modification timestamp

**Roles:**

- REQUESTER: Creates tickets and views authorized tickets
- TECHNICIAN: Manages and resolves assigned support tickets
- ADMIN: Manages users, permissions, and application settings

**Relationships:**

- One user can create multiple tickets
- One user can be assigned multiple tickets
- One user can write multiple ticket comments
- One user can be assigned multiple assets

## 2. Ticket

Represents an IT support request.

**Core fields:**

- `id`: Unique identifier
- `title`: Short issue description
- `description`: Detailed issue description
- `status`: Current ticket status
- `priority`: Importance of the request
- `requesterId`: User who created the ticket
- `assigneeId`: Assigned technician, optional
- `categoryId`: Associated ticket category
- `assetId`: Related asset, optional
- `createdAt`: Creation timestamp
- `updatedAt`: Last modification timestamp
- `resolvedAt`: Resolution timestamp, optional

**Statuses:**

- OPEN
- IN_PROGRESS
- RESOLVED
- CLOSED

**Priorities:**

- LOW
- MEDIUM
- HIGH
- CRITICAL

**Relationships:**

- Each ticket belongs to one requester
- Each ticket can be assigned to one technician
- Each ticket belongs to one category
- Each ticket can reference one asset
- Each ticket can contain multiple comments

## 3. TicketComment

Represents a comment or response within a ticket.

**Core fields:**

- `id`: Unique identifier
- `ticketId`: Associated ticket
- `authorId`: User who submitted the comment
- `content`: Comment body
- `createdAt`: Creation timestamp

**Relationships:**

- Each comment belongs to one ticket
- Each comment belongs to one author
- One ticket can have multiple comments

## 4. Asset

Represents an IT asset tracked by the organization.

**Core fields:**

- `id`: Unique identifier
- `assetTag`: Unique inventory identifier
- `name`: Asset name
- `serialNumber`: Manufacturer serial number, optional
- `status`: Current asset status
- `assignedToId`: Assigned user, optional
- `createdAt`: Creation timestamp
- `updatedAt`: Last modification timestamp

**Statuses:**

- AVAILABLE
- ASSIGNED
- MAINTENANCE
- RETIRED

**Relationships:**

- Each asset can be assigned to one user
- One user can have multiple assets
- One asset can be referenced by multiple tickets

## 5. TicketCategory

Represents a classification for support tickets.

**Core fields:**

- `id`: Unique identifier
- `name`: Category name
- `description`: Optional category description

**Example categories:**

- Hardware
- Software
- Network
- Account Access
- Other

**Relationships:**

- One category can contain multiple tickets
- Each ticket belongs to one category

## Future Considerations

The following entities and features may be added in later phases:

- Ticket activity and audit history
- Ticket attachments
- Internal technician notes
- Asset assignment history
- Notifications
- Organizations or departments
- Service-level agreements (SLAs)
- Password or external authentication account records

These are deliberately excluded from the initial data model to keep the first implementation manageable.
