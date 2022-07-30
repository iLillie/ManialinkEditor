class ManiaQuad extends ManiaElement {
    timeout = null;
    index;
    constructor(width, height, posX, posY, bgColor) {
        super();
        this.fabricObj = new fabric.Rect({
            top: posX,
            left: posY,
            width: width * POINT_TO_PIXEL,
            height: height * POINT_TO_PIXEL,
            fill: bgColor
        })
        this.index = maniaElementIndex;
        maniaElementIndex++;
    }

    Setup() {
        this.fabricObj.on('moving', () => {this.WaitTimeout()});
        this.fabricObj.on('scaling',  () => { this.WaitTimeout() });
        this.fabricObj.on('mousedown', () => {this.WaitTimeout() });
        this.addToDom();
        this.fabricObj.select = true;
        this.UpdateValues();
    }

    ToMania() {
        return `<quad size=\"${this.width} ${this.height}\" pos="${this.positionY} ${this.positionX}" halign=\"left\" valign=\"top\" bgcolor="ff0000"/>`
    }

    WaitTimeout() {
        if (this.timeout == null) {
            this.timeout = setTimeout(() => {
                this.UpdateValues()
            }, 20);
        }
    }

    addToDom() {
        const node = document.createElement("p");
        const textnode = document.createTextNode("Element " + new Number(this.index + 1));
        node.id = "elm" + this.index;
        node.appendChild(textnode);
        document.getElementById("placeElm").appendChild(node);
    }

    UpdateValues() {
        let id = "elm" + this.index;
        document.getElementById("infoHeight").innerText = "Height: " + this.height;
        document.getElementById("infoId").innerText = "Element " + new Number(this.index + 1);
        document.getElementById("infoWidth").innerText = "width: " + this.width;
        document.getElementById("infoPositionX").innerText = "posX: " + this.positionX;
        document.getElementById("infoPositionY").innerText = "posY: " + this.positionY;
        if(currSelectedElmId == null) currSelectedElmId = id;
        document.getElementById(currSelectedElmId).style.fontWeight = "normal";
        currSelectedElmId = id;
        document.getElementById(currSelectedElmId).style.fontWeight = "bold";
        maniaElements[this.index] = this.ToMania();
        updateMania();
        this.timeout = null;
    }
}
