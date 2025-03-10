# Project Cleanup Plan

## Current Issues
1. **Duplicate Next.js App Structure**:
   - `/app` - Main app directory (App Router)
   - `/src/app` - Second app directory (duplicate)
   - `/pages` - Legacy Pages Router directory with just API folder

2. **Duplicate Component Structure**:
   - `/app/components`
   - `/src/components`

3. **External Dashboard Template**:
   - `/temp-dashboard` - Independent project with its own structure

4. **Builder.io Integration Issues**:
   - Route conflict between `/app/builder/page.tsx` and `/app/builder/[[...path]]/page.tsx`
   - Oversized builder registry file at `/src/builder-registry.ts` (625KB)

5. **Duplicate Assets**:
   - Assets in both `/public` and potentially in `/temp-dashboard/public`

## Cleanup Actions

### 1. Resolve Immediate Routing Conflicts
- ✅ Delete `/app/builder/[[...path]]/page.tsx` to resolve the catch-all route conflict

### 2. Standardize on a Single App Structure
- **Decision**: Use `/app` as the main application directory (Next.js App Router)
- Actions:
  - ✅ Evaluate if any content in `/src/app` needs to be migrated to `/app`
  - ✅ After migration, delete `/src/app`
  - ✅ Move any needed components from `/src/components` to `/app/components`
  - ✅ After migration, delete `/src/components`
  - Keep `/pages/api` if used, otherwise consolidate to `/app/api`

### 3. Handle Dashboard Components
- Option A: If `/temp-dashboard` is used as a reference only, extract what you need and delete it
- Option B: If dashboard is actively used, properly integrate it:
  - Move assets from `/temp-dashboard/public` to `/public`
  - Move components to `/app/components/dashboard`
  - Update imports and references

### 4. Clean Up Builder.io Registration
- ✅ Consolidate all Builder.io registration in `/app/components/BuilderComponentRegistration.tsx`
- ✅ Delete `/src/builder-registry.ts` if redundant
- ✅ Ensure only one builder page at `/app/builder/page.tsx` exists

### 5. Asset Organization
- Audit assets in `/public` to ensure all are needed
- Organize into logical subfolders (icons, images, etc.)

### 6. Dependency Clean Up
- Review `package.json` to remove unused dependencies
- Ensure no duplicate dependencies from merged projects

## Post-Cleanup Verification
1. Verify Next.js builds without errors
2. Confirm all routes work correctly
3. Verify Builder.io integration functions properly
4. Ensure all UI components render correctly

## Long-term Maintenance
- Document project structure in README.md
- Set up linting rules to maintain clean code
- Implement Git hooks to prevent future structure issues 