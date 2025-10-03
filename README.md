# js-select-areas

Plugin that let you select multiple areas of an image, move them and resize them.

## Demo

<http://heminei.github.io/js-select-areas/demo/>

## Installation

```bash
npm install js-select-areas
```

## How to use

```html
<link href="/dist/js-select-areas.css" rel="stylesheet" type="text/css" />
<script src="/dist/js-select-areas.js" type="text/javascript"></script>
```

```javascript
(function () {
    var jsSelectArea = new JSSelectAreas(document.querySelector(".js-select-areas"), {
        multiple: true,
    });
})();
```

## Keyboard keys

- Arrows - move selected area
- Del - remove selected area

## Default options

```javascript
(function () {
    var jsSelectArea = new JSSelectAreas(document.querySelector(".js-select-areas"), {
        multiple: false,
        area: {
            minWidth: "10px",
            minHeight: "10px",
            maxWidth: null,
            maxHeight: null,
            allowMove: true,
            allowResize: true,
        },
    });
})();
```

## Methods

### `getSelectedArea()`

Returns the currently selected area element or `null` if no area is selected.

```javascript
var selectedArea = jsSelectArea.getSelectedArea();
```

### `getSelections()`

Returns an array of all selection areas with their coordinates and dimensions (both displayed and original for images).

```javascript
var selections = jsSelectArea.getSelections();
// Returns: [{ x, y, width, height, originalX, originalY, originalWidth, originalHeight }, ...]
```

### `getAreas()`

Returns a NodeList of all area elements.

```javascript
var areas = jsSelectArea.getAreas();
```

### `addSelection({ x, y, width, height })`

Programmatically adds a new selection area using **original image coordinates** (for images, this uses the natural/full-size image dimensions). The method automatically converts these to displayed coordinates, applies constraints (min/max width/height), and ensures the area stays within boundaries.

```javascript
// For images: Add a selection using original image coordinates
// If the image is 2000x1500 pixels but displayed at 1000x750, 
// these coordinates will be automatically scaled down
var area = jsSelectArea.addSelection({ 
    x: 100,      // Original image coordinates
    y: 100, 
    width: 400,  // Original image size
    height: 300 
});
```

**Note:** This method uses the same coordinate system as the `originalX`, `originalY`, `originalWidth`, `originalHeight` values returned by `getSelections()`.

### `addSelectionOriginal({ x, y, width, height })`

Programmatically adds a new selection area using **displayed/screen coordinates** (pixel coordinates as they appear on screen). The method applies constraints (min/max width/height) and ensures the area stays within boundaries.

```javascript
// Add a selection using screen coordinates (pixels as displayed)
var area = jsSelectArea.addSelectionOriginal({ 
    x: 50,      // Screen pixel coordinates
    y: 50, 
    width: 100, // Screen pixel size
    height: 80 
});
```

**Note:** This method uses the same coordinate system as the `x`, `y`, `width`, `height` values returned by `getSelections()`.

### `destroy()`

Removes the plugin and restores the original element.

```javascript
jsSelectArea.destroy();
```

### Event Methods

#### `on(eventName, callback)`

Subscribe to events emitted by the plugin.

```javascript
jsSelectArea.on("area.created", function (element) {
    console.log("Area created:", element);
});

jsSelectArea.on("area.resizing", function (element) {
    console.log("Area resizing:", element);
});

jsSelectArea.on("area.resized", function (element) {
    console.log("Area resized:", element);
});

jsSelectArea.on("area.moving", function (element) {
    console.log("Area moving:", element);
});

jsSelectArea.on("area.moved", function (element) {
    console.log("Area moved:", element);
});

jsSelectArea.on("area.removed", function (element) {
    console.log("Area removed:", element);
});
```

## Events

- `area.created` - Fired when a new area is created
- `area.resizing` - Fired while an area is being resized
- `area.resized` - Fired when area resize is complete
- `area.moving` - Fired while an area is being moved
- `area.moved` - Fired when area move is complete
- `area.removed` - Fired when an area is removed
