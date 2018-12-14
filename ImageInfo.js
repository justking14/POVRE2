var imgBlock = new Image()
imgBlock.src = "brickd1.png"


var imgDoor = new Image()
imgDoor.src = "door.png"

var imgBlockBack = new Image()
imgBlockBack.src = "brickd2.png"





var doorBack = new Image()
doorBack.src = "DoorBack2.png"

var titleImage = new Image()
titleImage.src = "bgLogo2.png"


function changeSRCS(){
    imgBlock.src = "Block" + currentSize + ".png"

    imgBlockBack.src = "BackBlock" + currentSize + ".png"

    imgDoor.src = "Door" + currentSize + ".png"

    doorBack.src = "DoorBack" + currentSize + ".png"

}