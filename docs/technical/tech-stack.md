# Technology Stack Overview

**Express.js + TypeScript + MongoDB** stack. **Do not suggest alternatives** - use this stack.

## Core Stack

- **Backend**: Express.js, TypeScript, Node.js
- **Database**: MongoDB (primary), Redis (caching)
- **ORM**: Prisma
- **Testing**: Vitest, Supertest
- **Validation**: Yup schemas
- **Auth**: JWT + bcrypt
- **Tools**: ESLint, Prettier, Husky

## Key Rules

1. **Use existing stack only** - no alternatives
2. **Check config files** for exact versions/settings
3. **Use Prisma** for all database operations
4. **Use Yup** for validation schemas
5. **Use Vitest** for all tests

## Imports

- use modern import syntax for all files

```ts
import { MongoClient } from "mongodb";
import TEST from "../../some-file.js"; //new syntax needs js extension
```

## Config Files

- `package.json` - Dependencies & scripts
- `tsconfig.json` - TypeScript config
- `vitest.config.ts` - Test config
- `.env.example` - Environment template
