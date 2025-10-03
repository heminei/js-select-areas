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

Programmatically adds a new selection area at the specified position and dimensions. The method automatically applies constraints (min/max width/height) and ensures the area stays within boundaries.

```javascript
// Add a selection area at position (50, 50) with size 100x80
var area = jsSelectArea.addSelection({ 
    x: 50, 
    y: 50, 
    width: 100, 
    height: 80 
});
```

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
