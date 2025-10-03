# js-select-areas Development Guide

## Project Overview

A vanilla TypeScript library for selecting, moving, and resizing multiple areas on images. The project compiles TypeScript to ES2015 modules with accompanying CSS styles.

## Architecture

### Source Files (`src/`)
- **`js-select-areas.ts`**: Single-file TypeScript class implementation (~330 lines)
  - `JSSelectAreas` class: Main plugin with event-driven architecture
  - Interfaces: `JSSelectAreasOptions`, `JSSelectAreasEventItem`, `JSSelectAreasSelectionItem`
  - No external runtime dependencies (pure DOM manipulation)

### Build Output (`dist/`)
- `js-select-areas.js` + `.js.map`: Compiled ES2015 module
- `js-select-areas.d.ts`: TypeScript declarations
- `js-select-areas.scss` → `js-select-areas.css`: SCSS source and compiled CSS

### Demo (`demo/`)
- `index.html`: Live example with Bootstrap styling
- Uses compiled `dist/` files (not source)

## Development Workflow

### Build System
- **TypeScript Compiler**: Watch mode enabled by default in `tsconfig.json`
- **Manual Compilation**: Run `tsc` directly (no npm scripts defined)
- **CSS**: SCSS manually compiled to CSS (not automated)
- **No bundler**: Direct ES2015 module output

### Starting Development
```bash
# Install dependencies
npm install

# Start TypeScript watch mode
tsc --watch

# Open demo (use any local server)
# The demo/index.html references ../dist/ files
```

### Testing
- No test framework configured
- Manual testing via `demo/index.html`
- Open browser console to see event logs from demo implementation

## Code Patterns & Conventions

### DOM Manipulation Strategy
- **Pure vanilla JS**: No jQuery or frameworks despite Bootstrap in demo
- **Wrapper pattern**: Original element wrapped in `.js-select-areas-holder` div
- **Event delegation**: Global window/document listeners for mouse/keyboard events
- **Data attributes**: Use `dataset.jsSelectAreasX1/Y1` for tracking drawing state

### Event System
Custom event emitter pattern with `on()` and `trigger()` methods:
```typescript
jsSelectArea.on("area.created", (element) => { /* ... */ });
jsSelectArea.on("area.resizing", (element) => { /* ... */ }); // Fires during drag
jsSelectArea.on("area.resized", (element) => { /* ... */ }); // Fires on complete
jsSelectArea.on("area.moving", (element) => { /* ... */ });
jsSelectArea.on("area.moved", (element) => { /* ... */ });
jsSelectArea.on("area.removed", (element) => { /* ... */ });
```

### State Management
- **Instance state**: `isDrawing`, `currentArea` private properties
- **CSS classes for state**: `js-select-areas-drawing`, `js-select-areas-moving`, `js-select-areas-area-selected`
- **Single selection**: Only one area selected at a time (tracked via CSS class)

### Coordinate System
- **Ratio calculation**: For images, calculates `originalWidth/originalHeight` based on natural vs displayed dimensions
- **Boundary constraints**: All movements/resizes constrained to holder dimensions
- **Min/max enforcement**: `options.area.{minWidth, minHeight, maxWidth, maxHeight}` applied during resize

### CSS Architecture (SCSS)
- **BEM-like naming**: `.js-select-areas-holder > .js-select-areas-area > .js-select-areas-area-resize-handler`
- **State classes**: `-drawing`, `-moving`, `-selected` modifiers
- **Position handlers**: 8 resize handles (tl, tc, tr, ml, mr, bl, bc, br) with cursor styles
- **z-index strategy**: Selected/active areas use `z-index: 100`

## Key Technical Details

### TypeScript Configuration
- **Target**: ES2015 (supports modern browsers only)
- **Module**: ES2015 (not CommonJS)
- **Watch mode**: Enabled by default with `useFsEvents` for performance
- **Output**: `dist/` with source maps and declarations

### Options Structure
Default options in constructor show all customization points:
```typescript
{
    multiple: false,           // Allow multiple selections
    area: {
        minWidth: "10px",
        minHeight: "10px",
        maxWidth: null,        // null = no limit
        maxHeight: null,
        allowMove: true,
        allowResize: true
    }
}
```

### Public API Methods
- `getSelectedArea()`: Returns currently selected HTMLElement or null
- `getAreas()`: Returns NodeListOf all area elements
- `getSelections()`: Returns array of selection data with both displayed and original coordinates
- `generateArea()`: Programmatically create new area element
- `destroy()`: Unwrap and clean up plugin
- `on(name, callback)`: Subscribe to events
- `trigger(name, ...params)`: Internal event dispatch

## Common Tasks

### Adding New Features
1. Modify `src/js-select-areas.ts` (single source file)
2. Update interfaces if adding options or data structures
3. Emit events at appropriate lifecycle points for extensibility
4. Test manually in `demo/index.html` with console logging

### Styling Changes
1. Edit `dist/js-select-areas.scss` (source is in dist/, not src/)
2. Manually compile SCSS to CSS
3. Preserve vendor prefixes for cross-browser compatibility

### Keyboard Shortcuts
Hardcoded in keydown listener:
- Arrow keys: Move selected area by 1px
- Delete: Remove selected area
