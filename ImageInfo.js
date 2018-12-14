var imgBlock = new Image()
imgBlock.src = "img/brickd1.png"


var imgDoor = new Image()
imgDoor.src = "img/door.png"

var imgBlockBack = new Image()
imgBlockBack.src = "img/brickd2.png"





var doorBack = new Image()
doorBack.src = "img/DoorBack2.png"

var titleImage = new Image()
titleImage.src = "img/bgLogo2.png"


function changeSRCS(){
    imgBlock.src = "img/Block" + currentSize + ".png"

    imgBlockBack.src = "img/BackBlock" + currentSize + ".png"

    imgDoor.src = "img/Door" + currentSize + ".png"

    doorBack.src = "img/DoorBack" + currentSize + ".png"

}