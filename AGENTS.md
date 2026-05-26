# AGENTS.md

## Project Overview
React + Vite application for tracking memorization progress (e.g., Quran, vocabulary). Uses CSS Modules for component styling.

## Developer Commands
```bash
npm run dev    # Start dev server (default port 5173, may shift to 5174 if in use)
npm run build  # Production build to dist/
npm run lint   # ESLint check
```

## Windows Environment Note
PowerShell execution policy may block npm scripts. Use `cmd /c` prefix:
```bash
cmd /c "npm run dev"
cmd /c "npm run build"
```

## Architecture
- State managed in `App.jsx` with `useState`/`useEffect`, passed down via props
- Custom `useLocalStorage` hook in `src/hooks/useLocalStorage.js` for persistence
- Utility functions in `src/utils/hitungProgress.js`
- Dark mode via CSS custom properties on `:root` and `.dark` class toggled on `<html>`

## Key Conventions
- All components use CSS Modules (`.module.css` files alongside `.jsx`)
- Indonesian naming for state handlers (e.g., `tambahHafalan`, `updateProgress`)
- Inline confirmations for destructive actions (hapus/reset) — no `window.confirm`
- Sample data loads on first run if localStorage is empty
