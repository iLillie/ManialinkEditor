class ManiaElement {
    fabricObj;

    get height() {
        return Math.round(this.fabricObj.getScaledHeight() / POINT_TO_PIXEL * 100) / 100;
    };

    set height(value) {
        this.fabricObj.height = value * POINT_TO_PIXEL;
    }

    get width() {
        return Math.round(this.fabricObj.getScaledWidth() / POINT_TO_PIXEL * 100) / 100;
    };

    set width(value) {
        this.fabricObj.height = value * POINT_TO_PIXEL;
    }

    get positionX() {
        let posX = this.fabricObj.top / POINT_TO_PIXEL;
        return Math.round((90 - posX) * 1000) / 1000;
    };

    set positionX(value) {
        this.fabricObj.top = value * POINT_TO_PIXEL;
    }

    get positionY() {
        let posY = this.fabricObj.left / POINT_TO_PIXEL;
        return Math.round((-160 + posY) * 1000) / 1000;
    };

    set positionY(value) {
        this.fabricObj.left = value * POINT_TO_PIXEL;
    }
}
