let currentCanvas = new fabric.Canvas('canvas');
let maniaElements = [];
let maniaElementIndex = 0;
let elements = [];
let currSelectedElmId;

document.getElementById("currentMania").value = "";

let newQuad = () => {
    let newElement = new ManiaQuad(105, 50, 10, 5, 'ff0000');
    newElement.Setup();
    elements.push(newElement);
    currentCanvas.add(newElement.fabricObj);
    currentCanvas.setActiveObject(newElement.fabricObj);
}


let updateMania = () => {
    document.getElementById("currentMania").value = `<?xml version="1.0" encoding="UTF-8"?>\n<manialink version="3">\n${maniaElements.join("\n")}\n</manialink>`;
}

let UpdateColor = (e) => {
    elements[currSelectedElmId].bgColor = GetColorWithout(e.value);
    elements[currSelectedElmId].fabricObj.set('fill', e.value);
    elements[currSelectedElmId].UpdateValues();
    currentCanvas.renderAll();
}

let GetColorWithout = (value) => {
    return value.slice(1);
}
