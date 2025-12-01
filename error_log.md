# Error Log

## Migration Errors

### 1. Backup Failure
- **Command**: `cp -r src astro.config.mjs tailwind.config.mjs package.json _backup/`
- **Error**: `cp: cannot stat 'tailwind.config.mjs': No such file or directory`
- **Cause**: `tailwind.config.mjs` did not exist.
- **Resolution**: Proceeded with backup of existing files.

### 2. Restoration Failure (Attempt 1)
- **Command**: `cp _backup/src/content/blog/japanese-sample.md src/content/blog/`
- **Error**: `cp: cannot create regular file 'src/content/blog/': No such file or directory`
- **Cause**: `src` directory was not found in the root.
- **Investigation**: `npm create astro` created a subdirectory `civil-crater`.

### 3. Move Failure (Attempt 1)
- **Command**: `mv civil-crater/* .`
- **Error**: `mv: cannot overwrite './public': Directory not empty`
- **Cause**: `public` directory already existed in the root.
- **Resolution**: Removing conflicting directories in root and retrying move.

### 4. Move Failure (Attempt 2)
- **Command**: `rm -rf public && mv civil-crater/public . && mv civil-crater/.* .`
- **Error**: `rmdir: failed to remove 'civil-crater': Directory not empty`
- **Cause**: `civil-crater` still contains files (likely hidden files or files that failed to move).

### 5. Restoration Failure (Attempt 2)
- **Command**: `cp _backup/src/content/blog/japanese-sample.md src/content/blog/`
- **Error**: `cp: cannot create regular file 'src/content/blog/': No such file or directory`
- **Cause**: `src/content/blog` path might be incorrect or directory structure is damaged.
