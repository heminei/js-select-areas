# js-select-areas

Plugin that let you select multiple areas of an image, move them and resize them.

## Demo:

http://heminei.github.io/js-select-areas/demo/

## Installation:

```bash
npm install js-select-areas
```

## How to use:

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

## Keyboard keys:

-   Arrows - move selected area
-   Del - remove selected area

## Default options:

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

## Methods:

```javascript
$(function () {
    var jsSelectArea = new JSSelectAreas(document.querySelector(".js-select-areas"));

    jsSelectArea.getSelectedArea();
    jsSelectArea.getSelections();
    jsSelectArea.getAreas();
    jsSelectArea.destroy();

    jsSelectArea.generateArea();
    jsSelectArea.on();
    jsSelectArea.trigger();
});
```
