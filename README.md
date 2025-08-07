# demo-code-genie

## Utility Function Guidelines

- **Check Existing Functionality**: Always check the `src/utils/` directory for existing functionality before adding new utility functions.
- **Write Small Functions**: Write small, composable, and well-named functions with a single responsibility.
- **Follow Clean Code Principles**: Avoid writing large functions. Prefer small, modular ones with clear names.
- **Technical Functions**: Place purely technical functions with no business logic in utility files for reusability.
- **Separation of Concerns**: Maintain separation of concerns between business logic, technical helpers, and configuration.
- **TypeScript Best Practices**: Stick to TypeScript best practices: use strict types, avoid `any`, prefer `const` and `readonly`, and add JSDoc comments where useful.
- **Lint and Format**: Run `npm run lint` and `npm run format` before committing to enforce ESLint and Prettier rules.
- **Commit Standards**: Do not commit failing tests or unformatted code.
