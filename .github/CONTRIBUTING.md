# Contributing to TIE CEO Project

Thank you for your interest in contributing to the TIE CEO project. This document provides a quick reference for contribution guidelines.

## Important: Read the Project Guidelines First

**Before making any contributions, please thoroughly read the [TIE-CEO-GUIDELINES.md](../TIE-CEO-GUIDELINES.md) document in the root of the repository.**

This comprehensive document contains critical information about:
- The project's code stack and architecture
- Database connections (Supabase, not Neon)
- Environment variable management
- API development standards
- Code organization
- Error handling
- Security practices

## Critical Rules Summary

1. **Always push to GitHub first**, never directly to Vercel
2. **Always ask for permission before pushing to GitHub**
3. Use the `db.js` utility module for all database operations
4. Do NOT use `@vercel/postgres` or any Neon DB related services
5. Store sensitive information in environment variables:
   - Local development: `.env.local`
   - Production: Vercel environment variables
6. Run the development server on port 3335

## Pull Request Process

1. Ensure your code follows the guidelines in TIE-CEO-GUIDELINES.md
2. Update documentation as necessary
3. Test your changes thoroughly
4. Submit your pull request with a clear description of the changes

## Questions?

If you have any questions about contributing, please contact the project maintainer. 