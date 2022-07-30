class ManiaQuad extends ManiaElement {
    timeout = null;
    index;
    bgColor;
    constructor(width, height, posX, posY, bgColor) {
        super();
        this.fabricObj = new fabric.Rect({
            top: posX,
            left: posY,
            width: width * POINT_TO_PIXEL,
            height: height * POINT_TO_PIXEL,
            fill: '#' + bgColor,
            objectCaching: false
        })
        this.bgColor = bgColor;
        this.index = maniaElementIndex;
        maniaElementIndex++;
    }

    Setup() {
        this.fabricObj.on('moving', () => {this.WaitTimeout()});
        this.fabricObj.on('scaling',  () => { this.WaitTimeout() });
        this.fabricObj.on('rotating',  () => { this.WaitTimeout() });
        this.fabricObj.on('mousedown', () => {this.WaitTimeout() });
        this.addToDom();
        this.fabricObj.select = true;
        this.UpdateValues();
    }

    ToMania() {
        return `<quad size=\"${this.width} ${this.height}\" pos="${this.positionY} ${this.positionX}" rot="${this.rotation}" halign=\"left\" valign=\"top\" bgcolor="${this.bgColor}"/>`
    }

    WaitTimeout() {
        if (this.timeout == null) {
            this.timeout = setTimeout(() => {
                this.UpdateValues()
            }, 20);
        }
    }

    get rotation() {
        return Math.round(this.fabricObj.angle * 1000) / 1000;
    }

    addToDom() {
        const node = document.createElement("p");
        const textnode = document.createTextNode("Element " + new Number(this.index + 1));
        node.id = "elm" + this.index;
        node.appendChild(textnode);
        node.addEventListener('click', () => {
            this.select();
        })
        document.getElementById("placeElm").appendChild(node);
    }

    select() {
        currentCanvas.setActiveObject(this.fabricObj);
        currentCanvas.renderAll();
        this.UpdateValues();
    }

    UpdateValues() {
        document.getElementById("infoHeight").innerText = "Height: " + this.height;
        document.getElementById("infoId").innerText = "Element " + new Number(this.index + 1);
        document.getElementById("infoWidth").innerText = "width: " + this.width;
        document.getElementById("infoPositionX").innerText = "posX: " + this.positionX;
        document.getElementById("infoPositionY").innerText = "posY: " + this.positionY;
        document.getElementById("infoColor").value = "#" + this.bgColor;
        if(currSelectedElmId == null) currSelectedElmId = this.index;
        document.getElementById("elm" + currSelectedElmId).style.fontWeight = "normal";
        currSelectedElmId = this.index;
        document.getElementById("elm" + currSelectedElmId).style.fontWeight = "bold";
        maniaElements[this.index] = this.ToMania();
        updateMania();
        this.timeout = null;
    }
}
