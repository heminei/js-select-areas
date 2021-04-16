"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSSelectAreas = void 0;
var JSSelectAreas = /** @class */ (function () {
    function JSSelectAreas(element, options) {
        // this.options = Object.assign(this.options, options);
        var _this = this;
        if (options === void 0) { options = {}; }
        this.element = element;
        this.options = {
            multiple: false,
            area: {
                minWidth: "20px",
                minHeight: "20px",
                maxWidth: null,
                maxHeight: null,
            },
        };
        this.isDrawing = false;
        this.holder = null;
        this.currentArea = null;
        this.events = [];
        this.getMousePosition = function (event) {
            var x = event.pageX - this.getElementOffset(this.holder).left;
            var y = event.pageY - this.getElementOffset(this.holder).top;
            return {
                x: x,
                y: y,
            };
        };
        this.holder = this.generateHolder();
        this.wrap(element, this.holder);
        this.holder.addEventListener("mousedown", function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.isDrawing = true;
            if (_this.currentArea === null) {
                _this.currentArea = _this.generateArea();
            }
            _this.currentArea.style.left = e.offsetX + "px";
            _this.currentArea.style.top = e.offsetY + "px";
            _this.currentArea.style.width = _this.options.area.minWidth;
            _this.currentArea.style.height = _this.options.area.minHeight;
            _this.currentArea.dataset.jsSelectAreasX1 = _this.getMousePosition(e).x.toString();
            _this.currentArea.dataset.jsSelectAreasY1 = _this.getMousePosition(e).y.toString();
            _this.currentArea.classList.add("js-select-areas-drawing");
            _this.holder.querySelectorAll(".js-select-areas-area").forEach(function (element) {
                element.classList.remove("js-select-areas-area-selected");
            });
            _this.currentArea.classList.add("js-select-areas-area-selected");
            _this.holder.appendChild(_this.currentArea);
        });
        window.addEventListener("mousemove", function (e) {
            if (_this.isDrawing === true) {
                // console.log("mousemove", e, this.getMousePosition(e));
                var x2 = _this.getMousePosition(e).x; //Update the current position X
                var y2 = _this.getMousePosition(e).y; //Update the current position Y
                var x3 = Math.min(parseFloat(_this.currentArea.dataset.jsSelectAreasX1), Math.max(x2, 0)); //Smaller X
                var x4 = Math.max(parseFloat(_this.currentArea.dataset.jsSelectAreasX1), x2); //Larger X
                var y3 = Math.min(parseFloat(_this.currentArea.dataset.jsSelectAreasY1), Math.max(y2, 0)); //Smaller Y
                var y4 = Math.max(parseFloat(_this.currentArea.dataset.jsSelectAreasY1), y2); //Larger Y
                var width = Math.max(x4 - x3, parseFloat(_this.options.area.minWidth));
                var height = Math.max(y4 - y3, parseFloat(_this.options.area.minHeight));
                if (typeof _this.options.area.maxWidth == "number") {
                    width = Math.min(width, _this.options.area.maxWidth);
                }
                if (typeof _this.options.area.maxHeight == "number") {
                    height = Math.min(height, _this.options.area.maxHeight);
                }
                if (x3 + width > _this.holder.offsetWidth) {
                    width = _this.holder.offsetWidth - x3;
                }
                if (y3 + height > _this.holder.offsetHeight) {
                    height = _this.holder.offsetHeight - y3;
                }
                _this.currentArea.style.left = x3 + "px";
                _this.currentArea.style.top = y3 + "px";
                _this.currentArea.style.width = width + "px";
                _this.currentArea.style.height = height + "px";
                _this.trigger("area.resizing", _this.currentArea);
            }
        });
        window.addEventListener("mouseup", function (e) {
            if (_this.isDrawing === true) {
                _this.isDrawing = false;
                _this.currentArea.classList.remove("js-select-areas-drawing");
                _this.trigger("area.resized", _this.currentArea);
                if (_this.options.multiple === true) {
                    _this.currentArea = null;
                }
            }
        });
        document.addEventListener("keydown", function (e) {
            // console.log("keypress", e);
            var selectedArea = _this.getSelectedArea();
            if (selectedArea) {
                e.preventDefault();
                switch (e.key) {
                    case "ArrowUp":
                        selectedArea.style.top = Math.max(parseFloat(selectedArea.style.top) - 1, 0) + "px";
                        _this.trigger("area.moving", selectedArea);
                        break;
                    case "ArrowDown":
                        selectedArea.style.top = Math.max(parseFloat(selectedArea.style.top) + 1, 0) + "px";
                        _this.trigger("area.moving", selectedArea);
                        break;
                    case "ArrowLeft":
                        selectedArea.style.left = Math.max(parseFloat(selectedArea.style.left) - 1, 0) + "px";
                        _this.trigger("area.moving", selectedArea);
                        break;
                    case "ArrowRight":
                        selectedArea.style.left = Math.max(parseFloat(selectedArea.style.left) + 1, 0) + "px";
                        _this.trigger("area.moving", selectedArea);
                        break;
                    case "Delete":
                        selectedArea.remove();
                        _this.trigger("area.removed", selectedArea);
                        break;
                }
            }
        });
        document.addEventListener("mousedown", function (e) {
            _this.holder.querySelectorAll(".js-select-areas-area").forEach(function (element) {
                element.classList.remove("js-select-areas-area-selected");
            });
        });
    }
    JSSelectAreas.prototype.generateHolder = function () {
        var element = document.createElement("div");
        element.className = "js-select-areas-holder";
        return element;
    };
    JSSelectAreas.prototype.generateArea = function () {
        var _this = this;
        var element = document.createElement("div");
        element.className = "js-select-areas-area";
        var tl = document.createElement("div");
        tl.className = "js-select-areas-area-resize-handler js-select-areas-area-tl";
        var tc = document.createElement("div");
        tc.className = "js-select-areas-area-resize-handler js-select-areas-area-tc";
        var tr = document.createElement("div");
        tr.className = "js-select-areas-area-resize-handler js-select-areas-area-tr";
        var ml = document.createElement("div");
        ml.className = "js-select-areas-area-resize-handler js-select-areas-area-ml";
        var mr = document.createElement("div");
        mr.className = "js-select-areas-area-resize-handler js-select-areas-area-mr";
        var bl = document.createElement("div");
        bl.className = "js-select-areas-area-resize-handler js-select-areas-area-bl";
        var bc = document.createElement("div");
        bc.className = "js-select-areas-area-resize-handler js-select-areas-area-bc";
        var br = document.createElement("div");
        br.className = "js-select-areas-area-resize-handler js-select-areas-area-br";
        var btn = document.createElement("div");
        btn.className = "js-select-areas-area-btn s-select-areas-area-btn-delete";
        element.appendChild(tl);
        element.appendChild(tc);
        element.appendChild(tr);
        element.appendChild(ml);
        element.appendChild(mr);
        element.appendChild(bl);
        element.appendChild(bc);
        element.appendChild(br);
        var startX = 0;
        var startY = 0;
        var isMoving = false;
        element.addEventListener("click", function (e) { });
        element.addEventListener("mousedown", function (e) {
            e.preventDefault();
            e.stopPropagation();
            isMoving = true;
            startX = e.clientX;
            startY = e.clientY;
            _this.holder.querySelectorAll(".js-select-areas-area").forEach(function (element) {
                element.classList.remove("js-select-areas-area-selected");
            });
            element.classList.add("js-select-areas-area-selected");
        });
        this.holder.addEventListener("mousemove", function (e) {
            if (isMoving === true) {
                var pos1 = startX - e.clientX;
                var pos2 = startY - e.clientY;
                startX = e.clientX;
                startY = e.clientY;
                var top_1 = Math.max(element.offsetTop - pos2, 0);
                var left = Math.max(element.offsetLeft - pos1, 0);
                if (left + element.offsetWidth > _this.holder.offsetWidth) {
                    left = _this.holder.offsetWidth - element.offsetWidth;
                }
                if (top_1 + element.offsetHeight > _this.holder.offsetHeight) {
                    top_1 = _this.holder.offsetHeight - element.offsetHeight;
                }
                element.style.top = top_1 + "px";
                element.style.left = left + "px";
                element.classList.add("js-select-areas-moving");
                _this.trigger("area.moving", element);
            }
        });
        this.holder.addEventListener("mouseup", function (e) {
            if (isMoving === true) {
                isMoving = false;
                element.classList.remove("js-select-areas-moving");
                _this.trigger("area.moved", element);
            }
        });
        this.trigger("area.created", element);
        return element;
    };
    JSSelectAreas.prototype.getAreas = function () {
        return this.holder.querySelectorAll(".js-select-areas-area");
    };
    JSSelectAreas.prototype.getSelectedArea = function () {
        return this.holder.querySelector(".js-select-areas-area.js-select-areas-area-selected");
    };
    JSSelectAreas.prototype.getSelections = function () {
        var selections = [];
        var ration = 1;
        if (this.element instanceof HTMLImageElement) {
            ration = this.element.naturalWidth / this.element.width;
        }
        this.getAreas().forEach(function (element) {
            selections.push({
                x: parseFloat(element.style.left),
                y: parseFloat(element.style.top),
                width: element.offsetWidth,
                height: element.offsetHeight,
                originalX: parseFloat(element.style.left) * ration,
                originalY: parseFloat(element.style.top) * ration,
                originalWidth: element.offsetWidth * ration,
                originalHeight: element.offsetHeight * ration,
            });
        });
        return selections;
    };
    JSSelectAreas.prototype.on = function (name, callback) {
        this.events.push({
            name: name,
            callback: callback,
        });
    };
    JSSelectAreas.prototype.trigger = function (name) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var events = this.events.filter(function (event) {
            return event.name == name;
        });
        events.forEach(function (event) {
            event.callback.apply(null, params);
        });
    };
    JSSelectAreas.prototype.destroy = function () {
        this.holder.replaceWith(this.element);
    };
    JSSelectAreas.prototype.wrap = function (toWrap, wrapper) {
        toWrap.parentNode.appendChild(wrapper);
        return wrapper.appendChild(toWrap);
    };
    JSSelectAreas.prototype.getElementOffset = function (element) {
        var rect = element.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY,
        };
    };
    return JSSelectAreas;
}());
exports.JSSelectAreas = JSSelectAreas;
//# sourceMappingURL=js-select-areas.js.map