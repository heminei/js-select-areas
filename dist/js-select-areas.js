class JSSelectAreas {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            multiple: false,
            area: {
                minWidth: "10px",
                minHeight: "10px",
                maxWidth: null,
                maxHeight: null,
                allowMove: true,
                allowResize: true,
            },
        };
        this.isDrawing = false;
        this.holder = null;
        this.currentArea = null;
        this.events = [];
        this.getMousePosition = function (event) {
            const x = event.pageX - this.getElementOffset(this.holder).left;
            const y = event.pageY - this.getElementOffset(this.holder).top;
            return {
                x: x,
                y: y,
            };
        };
        this.options = Object.assign(this.options, options);
        this.holder = this.generateHolder();
        this.wrap(element, this.holder);
        this.holder.addEventListener("mousedown", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.isDrawing = true;
            if (this.currentArea === null) {
                this.currentArea = this.generateArea();
            }
            this.currentArea.style.left = e.offsetX + "px";
            this.currentArea.style.top = e.offsetY + "px";
            this.currentArea.style.width = this.options.area.minWidth;
            this.currentArea.style.height = this.options.area.minHeight;
            this.currentArea.dataset.jsSelectAreasX1 = this.getMousePosition(e).x.toString();
            this.currentArea.dataset.jsSelectAreasY1 = this.getMousePosition(e).y.toString();
            this.currentArea.classList.add("js-select-areas-drawing");
            this.holder.querySelectorAll(".js-select-areas-area").forEach((element) => {
                element.classList.remove("js-select-areas-area-selected");
            });
            this.currentArea.classList.add("js-select-areas-area-selected");
            this.holder.appendChild(this.currentArea);
        });
        window.addEventListener("mousemove", (e) => {
            if (this.isDrawing === true) {
                // console.log("mousemove", e, this.getMousePosition(e));
                var x2 = this.getMousePosition(e).x; //Update the current position X
                var y2 = this.getMousePosition(e).y; //Update the current position Y
                var x3 = Math.min(parseFloat(this.currentArea.dataset.jsSelectAreasX1), Math.max(x2, 0)); //Smaller X
                var x4 = Math.max(parseFloat(this.currentArea.dataset.jsSelectAreasX1), x2); //Larger X
                var y3 = Math.min(parseFloat(this.currentArea.dataset.jsSelectAreasY1), Math.max(y2, 0)); //Smaller Y
                var y4 = Math.max(parseFloat(this.currentArea.dataset.jsSelectAreasY1), y2); //Larger Y
                let width = Math.max(x4 - x3, parseFloat(this.options.area.minWidth));
                let height = Math.max(y4 - y3, parseFloat(this.options.area.minHeight));
                if (typeof this.options.area.maxWidth == "number") {
                    width = Math.min(width, this.options.area.maxWidth);
                }
                if (typeof this.options.area.maxHeight == "number") {
                    height = Math.min(height, this.options.area.maxHeight);
                }
                if (x3 + width > this.holder.offsetWidth) {
                    width = this.holder.offsetWidth - x3;
                }
                if (y3 + height > this.holder.offsetHeight) {
                    height = this.holder.offsetHeight - y3;
                }
                this.currentArea.style.left = x3 + "px";
                this.currentArea.style.top = y3 + "px";
                this.currentArea.style.width = width + "px";
                this.currentArea.style.height = height + "px";
                this.trigger("area.resizing", this.currentArea);
            }
        });
        window.addEventListener("mouseup", (e) => {
            if (this.isDrawing === true) {
                this.isDrawing = false;
                this.currentArea.classList.remove("js-select-areas-drawing");
                this.trigger("area.resized", this.currentArea);
                if (this.options.multiple === true) {
                    this.currentArea = null;
                }
            }
        });
        document.addEventListener("keydown", (e) => {
            // console.log("keypress", e);
            const selectedArea = this.getSelectedArea();
            if (selectedArea) {
                e.preventDefault();
                switch (e.key) {
                    case "ArrowUp":
                        selectedArea.style.top = Math.max(parseFloat(selectedArea.style.top) - 1, 0) + "px";
                        this.trigger("area.moving", selectedArea);
                        break;
                    case "ArrowDown":
                        selectedArea.style.top = Math.max(parseFloat(selectedArea.style.top) + 1, 0) + "px";
                        this.trigger("area.moving", selectedArea);
                        break;
                    case "ArrowLeft":
                        selectedArea.style.left = Math.max(parseFloat(selectedArea.style.left) - 1, 0) + "px";
                        this.trigger("area.moving", selectedArea);
                        break;
                    case "ArrowRight":
                        selectedArea.style.left = Math.max(parseFloat(selectedArea.style.left) + 1, 0) + "px";
                        this.trigger("area.moving", selectedArea);
                        break;
                    case "Delete":
                        selectedArea.remove();
                        this.trigger("area.removed", selectedArea);
                        break;
                }
            }
        });
        document.addEventListener("mousedown", (e) => {
            this.holder.querySelectorAll(".js-select-areas-area").forEach((element) => {
                element.classList.remove("js-select-areas-area-selected");
            });
        });
    }
    generateArea() {
        const element = document.createElement("div");
        element.className = "js-select-areas-area";
        if (this.options.area.allowResize) {
            const tl = document.createElement("div");
            tl.className = "js-select-areas-area-resize-handler js-select-areas-area-tl";
            const tc = document.createElement("div");
            tc.className = "js-select-areas-area-resize-handler js-select-areas-area-tc";
            const tr = document.createElement("div");
            tr.className = "js-select-areas-area-resize-handler js-select-areas-area-tr";
            const ml = document.createElement("div");
            ml.className = "js-select-areas-area-resize-handler js-select-areas-area-ml";
            const mr = document.createElement("div");
            mr.className = "js-select-areas-area-resize-handler js-select-areas-area-mr";
            const bl = document.createElement("div");
            bl.className = "js-select-areas-area-resize-handler js-select-areas-area-bl";
            const bc = document.createElement("div");
            bc.className = "js-select-areas-area-resize-handler js-select-areas-area-bc";
            const br = document.createElement("div");
            br.className = "js-select-areas-area-resize-handler js-select-areas-area-br";
            element.appendChild(tl);
            element.appendChild(tc);
            element.appendChild(tr);
            element.appendChild(ml);
            element.appendChild(mr);
            element.appendChild(bl);
            element.appendChild(bc);
            element.appendChild(br);
        }
        let startX = 0;
        let startY = 0;
        let isMoving = false;
        element.addEventListener("click", (e) => { });
        element.addEventListener("mousedown", (e) => {
            if (this.options.area.allowMove == false) {
            }
            e.preventDefault();
            e.stopPropagation();
            isMoving = true;
            startX = e.clientX;
            startY = e.clientY;
            this.holder.querySelectorAll(".js-select-areas-area").forEach((element) => {
                element.classList.remove("js-select-areas-area-selected");
            });
            element.classList.add("js-select-areas-area-selected");
        });
        this.holder.addEventListener("mousemove", (e) => {
            if (isMoving === true) {
                let pos1 = startX - e.clientX;
                let pos2 = startY - e.clientY;
                startX = e.clientX;
                startY = e.clientY;
                let top = Math.max(element.offsetTop - pos2, 0);
                let left = Math.max(element.offsetLeft - pos1, 0);
                if (left + element.offsetWidth > this.holder.offsetWidth) {
                    left = this.holder.offsetWidth - element.offsetWidth;
                }
                if (top + element.offsetHeight > this.holder.offsetHeight) {
                    top = this.holder.offsetHeight - element.offsetHeight;
                }
                element.style.top = top + "px";
                element.style.left = left + "px";
                element.classList.add("js-select-areas-moving");
                this.trigger("area.moving", element);
            }
        });
        this.holder.addEventListener("mouseup", (e) => {
            if (isMoving === true) {
                isMoving = false;
                element.classList.remove("js-select-areas-moving");
                this.trigger("area.moved", element);
            }
        });
        this.trigger("area.created", element);
        return element;
    }
    getAreas() {
        return this.holder.querySelectorAll(".js-select-areas-area");
    }
    getSelectedArea() {
        return this.holder.querySelector(".js-select-areas-area.js-select-areas-area-selected");
    }
    getSelections() {
        const selections = [];
        let ration = 1;
        if (this.element instanceof HTMLImageElement) {
            ration = this.element.naturalWidth / this.element.width;
        }
        this.getAreas().forEach((element) => {
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
    }
    addSelection(selection) {
        // Remove current selection if multiple selections are not allowed
        if (this.options.multiple === false) {
            this.holder.querySelectorAll(".js-select-areas-area").forEach((element) => {
                element.classList.remove("js-select-areas-area-selected");
            });
        }
        // Create new area element
        const area = this.generateArea();
        // Apply constraints to width and height
        let width = Math.max(selection.width, parseFloat(this.options.area.minWidth));
        let height = Math.max(selection.height, parseFloat(this.options.area.minHeight));
        if (typeof this.options.area.maxWidth === "number") {
            width = Math.min(width, this.options.area.maxWidth);
        }
        if (typeof this.options.area.maxHeight === "number") {
            height = Math.min(height, this.options.area.maxHeight);
        }
        // Apply constraints to position to keep area within holder bounds
        let x = Math.max(0, Math.min(selection.x, this.holder.offsetWidth - width));
        let y = Math.max(0, Math.min(selection.y, this.holder.offsetHeight - height));
        // Adjust width/height if they exceed holder boundaries
        if (x + width > this.holder.offsetWidth) {
            width = this.holder.offsetWidth - x;
        }
        if (y + height > this.holder.offsetHeight) {
            height = this.holder.offsetHeight - y;
        }
        // Set area position and dimensions
        area.style.left = x + "px";
        area.style.top = y + "px";
        area.style.width = width + "px";
        area.style.height = height + "px";
        // Mark as selected
        area.classList.add("js-select-areas-area-selected");
        // Add to holder
        this.holder.appendChild(area);
        return area;
    }
    on(name, callback) {
        this.events.push({
            name: name,
            callback: callback,
        });
    }
    trigger(name, ...params) {
        const events = this.events.filter((event) => {
            return event.name == name;
        });
        events.forEach((event) => {
            event.callback.apply(null, params);
        });
    }
    destroy() {
        this.holder.replaceWith(this.element);
    }
    generateHolder() {
        const element = document.createElement("div");
        element.className = "js-select-areas-holder";
        return element;
    }
    wrap(toWrap, wrapper) {
        toWrap.parentNode.appendChild(wrapper);
        return wrapper.appendChild(toWrap);
    }
    getElementOffset(element) {
        const rect = element.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY,
        };
    }
}
//# sourceMappingURL=js-select-areas.js.map