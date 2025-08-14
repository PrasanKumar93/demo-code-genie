# Folder Structure Overview

This project follows a standard Express TypeScript structure with clear separation of concerns and industry best practices.

## Quick Directory Structure

```
project-root/
├── src/                             # Source code directory
│   ├── api/                         # API layer
│   │   ├── routes/                  # Route definitions
│   │   │   ├── users.ts             # Example : User management routes
│   │   │   └── index.ts             # Route aggregation
│   │   ├── controllers/             # HTTP request/response handlers
│   │   │   ├── user-controller.ts   # Example : User management controller
│   │   │   └── index.ts             # Controller exports
│   │   ├── services/                # Business logic layer
│   │   │   ├── user-service.ts      # Example : User management service
│   │   │   └── index.ts             # Service exports
│   │   └── validators/              # Request validation schemas
│   │       ├── user-validators.ts   # Example : User validation schema
│   │       └── index.ts             # Validator exports
│   ├── config/                  # Configuration files
│   │   ├── database.ts          # Database configuration
│   │   ├── app.ts               # Application configuration
│   │   ├── environment.ts       # Environment settings
│   │   └── index.ts
│   ├── constants/               # Application constants
│   │   ├── api.ts               # API constants
│   │   ├── messages.ts          # Example : Error/success messages
│   │   └── index.ts
│   ├── middleware/              # Custom Express middleware
│   │   ├── auth.ts              # Example: Authentication middleware
│   │   └── index.ts
│   ├── models/                  # Data models
│   │   ├── user.ts              # Example : User model
│   │   └── index.ts             # Model exports
│   ├── utils/                   # Pure utility functions
│   │   ├── date-utils.ts        # Example: Date manipulation
│   │   ├── crypto-utils.ts      # Example: Cryptographic functions
│   │   └── index.ts
│   ├── types/                   # TypeScript definitions
│   │   ├── user.ts              # Example : User type
│   │   ├── api.ts               # Example : API type
│   │   └── index.ts
│   ├── database/                # Database files
│   │   ├── connection.ts        # Database connection
│   │   ├── migrations/          # Database migrations
│   │   └── seeds/               # Database seeders
│   ├── shared/                  # Shared business logic
│   │   ├── business-logic/      # Shared business functions
│   │   ├── helpers/             # Project helpers
│   │   └── index.ts
│   └── app.ts                   # Express app setup
├── tests/                       # Test files
│   ├── unit/                    # Unit tests
│   │   ├── utils/
│   │   │   └── date-utils.test.ts
│   │   └── services/
│   │       └── user-service.test.ts
│   ├── integration/             # Integration tests
│   │   └── api/
│   │       └── users.test.ts
│   └── e2e/                     # End-to-end tests
│       └── auth-flow.test.ts
├── docs/                        # Documentation
│   ├── srs/                     # Software requirements
│   └── technical/               # Technical docs
├── scripts/                     # Build/deployment scripts
│   ├── build.sh
│   └── deploy.sh
├── .env.example                 # Environment template
├── .env                         # Environment variables (gitignored)
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.base.json
├── vitest.config.ts             # Vite test configuration
├── vitest.setup.ts              # Test setup file
└── README.md
```

## Key Rules & Conventions

### File Naming

- **Use kebab-case** for all files and folders (e.g., `user-controller.ts`, `date-utils.ts`)
- **Use PascalCase** for classes and interfaces
- **Use camelCase** for functions and variables

### Architecture Principles

- **Controllers**: Handle only HTTP requests/responses
- **Services**: Contain all business logic
- **Utils**: Pure functions with no business logic dependencies
- **One class/interface per file**
- Imports/ Exports
  - **Use barrel exports** (index.ts files) for clean imports
  - Use absolute imports for better maintainability
- Tests
  - Don't mock any external/ internal dependencies in unit tests (as separate test environment is configured)
  - Use vitest for testing

### Directory Purposes

- **`/api`**: Grouped API components for better organization
- **`/utils`**: Technical helper functions reusable across projects
- **`/shared`**: Project-specific business logic and helpers
- **`/middleware`**: Cross-cutting concerns (auth, validation, error handling)
