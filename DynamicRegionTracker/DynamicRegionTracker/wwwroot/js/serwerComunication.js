//import { algorithmName } from './PropertiesOfAlgorithms.js';
//import algorithmName from "./PropertiesOfAlgorithms.js";

//const test = new Vue({
//    el: '#simplePlayer',
//    data: {
//        src: ["https://i.stack.imgur.com/XZ4V5.jpg", "https://i.stack.imgur.com/7bI1Y.jpg"],
//        z: Math.round(Math.random()),
//        isHidden: false,
//    }
//})

let recStart;
let orToDelete = false;

let coords = {};
let orDrawRectangle = false;
let orDrawBoundingBox = false;
let whichRectangleToDraw = 0;
let howManyRegionsOfInterestToSummary = 1;

let indexOfBoundingBoxes = 0;

let k = 1;
let countOfBoundingBoxes = 0;

let boutingBoxToDelete = {
    0: false,
    1: false,
    2: false,
    3: false
};

let freeBoutingBoxes = {
    0: true,
    1: true,
    2: true,
    3: true
};
let orStarted = false;
let orOne = false;

let getPointOfTemplate = false;
let orDrawTemplate = false;
let template = {};
//let templateStart = false;
//let sizeForOriginalImage = {};
let widthCanvas = 900;
let heightCanvas = 500;

function setup() {
    //var canvas = createCanvas(520, 480);
    //var canvas = createCanvas(320, 180);
    //var canvas = createCanvas(640, 360);
    var canvas = createCanvas(widthCanvas, heightCanvas);
    canvas.parent('simplePlayer');
}

function draw() {
    if (recStart)
        drawRect();
    if (orDrawBoundingBox)
        drawBoundingBox();
    if (orOne)
        drawBoundingBoxesOne();

    //if (getPointOfTemplate)
    //    firstPointOfTemplate();
    //if (orDrawTemplate) {
    //    clear();
    //    noFill();
    //    stroke('blue');

    //    drawRect();
    //}
}



//mouseClickedForTemplate = function () {
//    if (getPointOfTemplate)
//        if (mouseButton === LEFT && mouseX > 0 && mouseX < 480 && mouseY > 0 && mouseY < 320) {
//            if (!orDrawTemplate) {
//                template.x = mouseX;
//                template.Y = mouseY;
//                orDrawTemplate = true;
//                //getPointOfTemplate = false;
//                //templateStart = true;
//            }
//            else {
//                orDrawTemplate = false;
//                drawTemplate();
//            }
//        }
//};

//function drawTemplate() {
//    clear();
//    noFill();
//    stroke('blue');

//    template.w = mouseX - template.x; //width
//    template.h = mouseY - template.y; // height

//    rect(template.x, template.y, template.w, template.h);

//    if (mouseX < 0 || mouseX > 480 || mouseY < 0 || mouseY > 320) {
//        orDrawTemplate = false;
//    }

//    stroke('red');
//    //for (var i = 0; i < 4; i++) {
//    //    if (boutingBoxToDelete[i] == false)
//    //        rect(coords[1 + (i * 4)], coords[2 + (i * 4)], coords[3 + (i * 4)], coords[4 + (i * 4)]);
//    //}

//    for (let i = 1; i <= 16; i = i + 4) {
//        if (coords[i] != 0 || coords[i + 1] != 0 || coords[i + 2] != 0 || coords[i + 3] != 0) {
//            rect(coords[i], coords[i + 1], coords[i + 2], coords[i + 3]);
//        }
//    }
//}

function drawBoundingBoxesOne() {//
    clear();
    noFill();
    stroke('red');
    for (const [key, value] of Object.entries(coords)) {
        console.log("ok");
        rect(coords[key].x, coords[key].y, coords[key].width, coords[key].height);
    }
    orOne = false;
}

function drawBoundingBox() {
    clear();
    stroke('red');
    for (const [key, value] of Object.entries(coords)) {
        rect(coords[key].x, coords[key].y, coords[key].width, coords[key].height);
    }
    
}

function calculateWidthAndHeight(dict) {
    dict[whichRectangleToDraw].width = mouseX - dict[whichRectangleToDraw].x; //width
    dict[whichRectangleToDraw].height = mouseY - dict[whichRectangleToDraw].y; // height

    if (mouseX < 0 || mouseX > 900 || mouseY < 0 || mouseY > 500) {
        recStart = false;
    }

    return dict;
}

function drawRect() {
    clear();
    noFill();
    if (orDrawTemplate) {
        stroke('blue');

        let temp = whichRectangleToDraw;
        whichRectangleToDraw = 0;

        template = calculateWidthAndHeight(template);

        whichRectangleToDraw = temp;

         rect(template[0].x, template[0].y, template[0].width, template[0].height);
        
        stroke('red');
    } else {
        stroke('red');
        coords = calculateWidthAndHeight(coords);  
    }

    for (const [key, value] of Object.entries(coords)) {
        console.log(coords);
        rect(coords[key].x, coords[key].y, coords[key].width, coords[key].height);
    }
}

function setXAndY(dict) {
    if (mouseButton === LEFT && mouseX > 0 && mouseX < 900 && mouseY > 0 && mouseY < 500) {
        if (!recStart) {			// start rectangle, give initial coords
            dict[whichRectangleToDraw] = {};
            dict[whichRectangleToDraw].x = mouseX;
            dict[whichRectangleToDraw].y = mouseY;

            recStart = true;	// draw() starts to draw
        } else {
            recStart = false;	// stop draw()
            drawRect();			// draw final rectangle
        }
    }

    return dict
}

mouseClicked = function () {
    console.log(orDrawRectangle);
    if (orDrawRectangle == true) {
        //if (mouseButton === LEFT && mouseX > 0 && mouseX < 480 && mouseY > 0 && mouseY < 320) {
        coords = setXAndY(coords);
    }
    else
        if (orDrawTemplate) {
            let temp = whichRectangleToDraw;
            whichRectangleToDraw = 0;
            template = setXAndY(template);
            whichRectangleToDraw = temp;
    }
};

    //for AddTemplate
  /*  if (getPointOfTemplate)
        if (mouseButton === LEFT && mouseX > 0 && mouseX < 480 && mouseY > 0 && mouseY < 320) {
            if (!orDrawTemplate) {
                template.x = mouseX;
                template.y = mouseY;
                orDrawTemplate = true;
                //getPointOfTemplate = false;
                //templateStart = true;
            }
            else {
                orDrawTemplate = false;
                drawTemplate();
            }
        }
};*/


function chooseToRemove(toRemove) {
    //document.getElementById('removeBtn').disabled = false;
    toDelete = toRemove;
    
}

function onclickRemoveBtn() {
    let toDelete = document.getElementById('boundingBoxes').value;
    console.log(Object.entries(coords));
    countOfBoundingBoxes--;
    console.log(coords);
    delete coords[toDelete];
    //coords.remove(toDelete);
    console.log(coords);

    data = {
        "objectIndex": parseInt(toDelete)
    };

    orOne = true;
    //document.getElementById('boundingBoxes').remove(toDelete);
    document.getElementById('boundingBoxes')[toDelete]=null;
    axios.post("/Main/DeleteObject", data);
}

let algorithmName;
function disableProperties(p1, p2) {
    //document.getElementById("demo").innerHTML = "My First JavaScript";
    const sb = document.querySelector('#Algorithm')
    //document.getElementById("demo").innerHTML = sb.selectedIndex;
    howManyRegionsOfInterestToSummary
    switch (sb.selectedIndex) {
        case 0:
            document.getElementById("0").style.display = "inline";
            document.getElementById("1").style.display = "none";
            document.getElementById("2").style.display = "none";
            document.getElementById("3").style.display = "none";
            document.getElementById("4").style.display = "none";
            document.getElementById("5").style.display = "none";
            document.getElementById("6").style.display = "none";
            document.getElementById("7").style.display = "none";
            document.getElementById("8").style.display = "none";
            algorithmName = "KCF";
            break;
        case 1:
            document.getElementById("0").style.display = "none";
            document.getElementById("1").style.display = "inline";
            document.getElementById("2").style.display = "none";
            document.getElementById("3").style.display = "none";
            document.getElementById("4").style.display = "none";
            document.getElementById("5").style.display = "none";
            document.getElementById("6").style.display = "none";
            document.getElementById("7").style.display = "none";
            document.getElementById("8").style.display = "none";
            algorithmName = "Boosting";
            break;
        case 2:
            document.getElementById("0").style.display = "none";
            document.getElementById("1").style.display = "none";
            document.getElementById("2").style.display = "inline";
            document.getElementById("3").style.display = "none";
            document.getElementById("4").style.display = "none";
            document.getElementById("5").style.display = "none";
            document.getElementById("6").style.display = "none";
            document.getElementById("7").style.display = "none";
            document.getElementById("8").style.display = "none";
            algorithmName = "CSRT";
            break;
        case 3:
            document.getElementById("0").style.display = "none";
            document.getElementById("1").style.display = "none";
            document.getElementById("2").style.display = "none";
            document.getElementById("3").style.display = "inline";
            document.getElementById("4").style.display = "none";
            document.getElementById("5").style.display = "none";
            document.getElementById("6").style.display = "none";
            document.getElementById("7").style.display = "none";
            document.getElementById("8").style.display = "none";
            algorithmName = "GOTRUN";
            break;
        case 4:
            document.getElementById("0").style.display = "none";
            document.getElementById("1").style.display = "none";
            document.getElementById("2").style.display = "none";
            document.getElementById("3").style.display = "none";
            document.getElementById("4").style.display = "inline";
            document.getElementById("5").style.display = "none";
            document.getElementById("6").style.display = "none";
            document.getElementById("7").style.display = "none";
            document.getElementById("8").style.display = "none";
            algorithmName = "MedianFlow";
            break;
        case 5:
            document.getElementById("0").style.display = "none";
            document.getElementById("1").style.display = "none";
            document.getElementById("2").style.display = "none";
            document.getElementById("3").style.display = "none";
            document.getElementById("4").style.display = "none";
            document.getElementById("5").style.display = "inline";
            document.getElementById("6").style.display = "none";
            document.getElementById("7").style.display = "none";
            document.getElementById("8").style.display = "none";
            algorithmName = "MIL";
            break;
        case 6:
            document.getElementById("0").style.display = "none";
            document.getElementById("1").style.display = "none";
            document.getElementById("2").style.display = "none";
            document.getElementById("3").style.display = "none";
            document.getElementById("4").style.display = "none";
            document.getElementById("5").style.display = "none";
            document.getElementById("6").style.display = "inline";
            document.getElementById("7").style.display = "none";
            document.getElementById("8").style.display = "none";
            algorithmName = "MOSSE";
            break;
        case 7:
            document.getElementById("0").style.display = "none";
            document.getElementById("1").style.display = "none";
            document.getElementById("2").style.display = "none";
            document.getElementById("3").style.display = "none";
            document.getElementById("4").style.display = "none";
            document.getElementById("5").style.display = "none";
            document.getElementById("6").style.display = "none";
            document.getElementById("7").style.display = "inline";
            document.getElementById("8").style.display = "none";
            algorithmName = "Multi Object TLD";
            break;
        case 8:
            document.getElementById("0").style.display = "none";
            document.getElementById("1").style.display = "none";
            document.getElementById("2").style.display = "none";
            document.getElementById("3").style.display = "none";
            document.getElementById("4").style.display = "none";
            document.getElementById("5").style.display = "none";
            document.getElementById("6").style.display = "none";
            document.getElementById("7").style.display = "none";
            document.getElementById("8").style.display = "inline";
            algorithmName = "TLD";
            break;
    }
}

let detectionMethod = "None";
function chooseDetectionMethod() {
    const sb = document.querySelector('#DetectionMethod')

    //switch (sb.selectedIndex) {
    //    case 0:
    //        //detectionMethod = "None";
    //        detectionMethod = 0;
    //        break;
    //    case 1:
    //        //detectionMethod = "Template Matching";
    //        detectionMethod = 1;
    //        break;
    //    case 2:
    //        //detectionMethod = "Feature Matching";
    //        detectionMethod = 2;
    //}

    let dm = {
        "detectionMethod": sb.selectedIndex
    };
    axios.post("/Main/changeDetectionMethod", dm);
}

function onclickAddObject() {
    //resizeCanvas(20, 20);
    //if (whichRectangleToDraw < 4) {
        const addObject = document.getElementById('addObject');
        const confirm = document.getElementById('confirm');

        addObject.style.display = 'none';
        document.getElementById('uploadFile').setAttribute('disabled', '');
        document.getElementById('addTemplate').setAttribute('disabled', '');
        document.getElementById('start').setAttribute('disabled', '');
        document.getElementById('stop').setAttribute('disabled', '');
        document.getElementById('fix').setAttribute('disabled', '');
        confirm.style.display = 'inline';

    whichRectangleToDraw = indexOfBoundingBoxes;
        orDrawRectangle = true;
    //}
    //else
    //    alert("This is the maximum of the regions of interest");
}

let namesOfBoundingBoxes = {};
//poprawic opis
function onclickConfirm() {
    if (coords[whichRectangleToDraw] != undefined &&
        //coords[whichRectangleToDraw].x != 0 &&
        //coords[whichRectangleToDraw].y != 0 &&
        coords[whichRectangleToDraw].width != 0 &&
        coords[whichRectangleToDraw].height != 0) {

        if (algorithmName != null) {
            let data;

            let objectName = prompt("Please enter name of object", "object " + indexOfBoundingBoxes);
            //if (Object.keys(namesOfBoundingBoxes).length != 0) {
            let orEqual = false;
            while (true) {
                for (const [key, value] of Object.entries(namesOfBoundingBoxes)) {
                    console.log("ok");
                    if (value == objectName) {
                        orEqual = true;
                        break;
                    }
                }
                if (orEqual) {
                    alert("The area of interest name must be unique.");
                    objectName = prompt("Please enter name of object", "object " + indexOfBoundingBoxes);
                    orEqual = false;
                    continue;
                }
                break;
            }
            //}
            namesOfBoundingBoxes[indexOfBoundingBoxes] = objectName;//"object " + indexOfBoundingBoxes;
            if (objectName != null) {// || person != "") {
                orDrawRectangle = false;
                //let g = document.getElementById("Threshold").value;
                //let s = document.getElementById("OutputSigmaFactor").value;
                if (algorithmName == "KCF") {
                    data = {
                        "indexOfBoundingBox": indexOfBoundingBoxes,
                        "rectangle": {
                            "X": Math.round(coords[whichRectangleToDraw].x),
                            "Y": Math.round(coords[whichRectangleToDraw].y),
                            "Width": Math.round(coords[whichRectangleToDraw].width),
                            "Height": Math.round(coords[whichRectangleToDraw].height)
                        },
                        "nameOfRectangle": objectName,
                        "nameOfAlgorithm": algorithmName,
                        "settingsOfAlgorithm": {
                            "DetectThresh": Number(document.getElementById("Threshold").value),
                            "OutputSigmaFactor": Number(document.getElementById("OutputSigmaFactor").value),
                            "Sigma": Number(document.getElementById("Sigma").value),
                            "PcaLearningRate": Number(document.getElementById("PcaLearningRate").value),
                            "Lambda": Number(document.getElementById("Lambda").value),
                            "MaxPatchSize": Number(document.getElementById("MaxPatchSize").value),
                            "InterpFactor": Number(document.getElementById("InterpFactor").value),
                            "CompressedSize": Number(document.getElementById("CompressedSize").value),
                            "CompressFeature": document.getElementById("CompressFeature").checked,
                            "SplitCoeff": document.getElementById("SplitCoeff").checked,
                            "WrapKernel": document.getElementById("WrapKernel").checked,
                            "Resize": document.getElementById("ReSize").checked,
                            "PescPca": document.getElementById("PescPca").options[document.getElementById("PescPca").selectedIndex].value,
                            "DescNpca": document.getElementById("DescNpca").options[document.getElementById("DescNpca").selectedIndex].value
                        }
                    };
                }
                else if (algorithmName == "Boosting") {
                    data = {
                        "indexOfBoundingBox": indexOfBoundingBoxes,
                        "rectangle": {
                            "X": Math.round(coords[whichRectangleToDraw].x),
                            "Y": Math.round(coords[whichRectangleToDraw].y),
                            "Width": Math.round(coords[whichRectangleToDraw].width),
                            "Height": Math.round(coords[whichRectangleToDraw].height)
                        },
                        "nameOfRectangle": objectName,
                        "nameOfAlgorithm": algorithmName,
                        "settingsOfAlgorithm": {
                            "numClassifiers": Number(document.getElementById("NumClassifiers").value),
                            "samplerOverlap": Number(document.getElementById("SampleOverlap").value),
                            "samplerSearchFactor": Number(document.getElementById("SampleSearchFactor").value),
                            "iterationInit": Number(document.getElementById("IterationInit").value),
                            "featureSetNumFeatures": Number(document.getElementById("FeatureSetNumFeatures").value)
                        }
                    };
                }
                else if (algorithmName == "CSRT") {
                    data = {
                        "indexOfBoundingBox": indexOfBoundingBoxes,
                        "rectangle": {
                            "X": Math.round(coords[whichRectangleToDraw].x),
                            "Y": Math.round(coords[whichRectangleToDraw].y),
                            "Width": Math.round(coords[whichRectangleToDraw].width),
                            "Height": Math.round(coords[whichRectangleToDraw].height)
                        },
                        "nameOfRectangle": objectName,
                        "nameOfAlgorithm": algorithmName,
                        "settingsOfAlgorithm": {
                            "useHog": document.getElementById("useHog").checked,
                            "useColorNames": document.getElementById("useColorNames").checked,
                            "useGray": document.getElementById("useGray").checked,
                            "useRgb": document.getElementById("useRgb").checked,
                            "useChannelWeights": document.getElementById("useChannelWeights").checked,
                            "useSegmentation": document.getElementById("useSegmentation").checked,
                            "windowFunction": null,
                            "kaiserAlpha": Number(document.getElementById("kaiserAlpha").value),
                            "chebAttenuation": Number(document.getElementById("chebAttenuation").value),
                            "templateSize": Number(document.getElementById("templateSize").value),
                            "gslSigma": Number(document.getElementById("gslSigma").value),
                            "hogOrientations": Number(document.getElementById("hogOrientations").value),
                            "hogClip": Number(document.getElementById("hogClip").value),
                            "padding": Number(document.getElementById("padding").value),
                            "filterLr": Number(document.getElementById("filterLr").value),
                            "weightsLr": Number(document.getElementById("weightsLr").value),
                            "admmIterations": Number(document.getElementById("admmIterations").value),
                            "histogramBins": Number(document.getElementById("histogramBins").value),
                            "histogramLr": Number(document.getElementById("histogramLr").value),
                            "backgroundRatio": Number(document.getElementById("backgroundRatio").value),
                            "numberOfScales": Number(document.getElementById("numberOfScales").value),
                            "scaleSigmaFactor": Number(document.getElementById("scaleSigmaFactor").value),
                            "scaleModelMaxArea": Number(document.getElementById("scaleModelMaxArea").value),
                            "scaleLr": Number(document.getElementById("scaleLr").value),
                            "scaleStep": Number(document.getElementById("scaleStep").value)
                        }
                    };
                }
                else if (algorithmName == "GOTRUN") {
                    data = {
                        "indexOfBoundingBox": indexOfBoundingBoxes,
                        "rectangle": {
                            "X": Math.round(coords[whichRectangleToDraw].x),
                            "Y": Math.round(coords[whichRectangleToDraw].y),
                            "Width": Math.round(coords[whichRectangleToDraw].width),
                            "Height": Math.round(coords[whichRectangleToDraw].height)
                        },
                        "nameOfRectangle": objectName,
                        "nameOfAlgorithm": algorithmName,
                        "settingsOfAlgorithm": {
                            "": ""
                        }
                    };
                }
                else if (algorithmName == "MedianFlow") {
                    data = {
                        "indexOfBoundingBox": indexOfBoundingBoxes,
                        "rectangle": {
                            "X": Math.round(coords[whichRectangleToDraw].x),
                            "Y": Math.round(coords[whichRectangleToDraw].y),
                            "Width": Math.round(coords[whichRectangleToDraw].width),
                            "Height": Math.round(coords[whichRectangleToDraw].height)
                        },
                        "nameOfRectangle": objectName,
                        "nameOfAlgorithm": algorithmName,
                        "settingsOfAlgorithm": {
                            "pointslnGrid": Number(document.getElementById("pointslnGrid").value),
                            "WinSize1": Number(document.getElementById("WinSize1").value),
                            "WinSize2": Number(document.getElementById("WinSize2").value),
                            "MaxLevel": Number(document.getElementById("MaxLevel").value),
                            "WinSizeNCC1": Number(document.getElementById("WinSizeNCC1").value),
                            "WinSizeNCC2": Number(document.getElementById("WinSizeNCC2").value),
                            "TermCriteriaMaxIter": Number(document.getElementById("TermCriteriaMaxIter").value),
                            "TermCriteriaEps": Number(document.getElementById("TermCriteriaEps").value),
                            "MaxMedianLengthOfDisplacement": Number(document.getElementById("MaxMedianLengthOfDisplacement").value)
                        }
                    };
                }
                else if (algorithmName == "MIL") {
                    data = {
                        "indexOfBoundingBox": indexOfBoundingBoxes,
                        "rectangle": {
                            "X": Math.round(coords[whichRectangleToDraw].x),
                            "Y": Math.round(coords[whichRectangleToDraw].y),
                            "Width": Math.round(coords[whichRectangleToDraw].width),
                            "Height": Math.round(coords[whichRectangleToDraw].height)
                        },
                        "nameOfRectangle": objectName,
                        "nameOfAlgorithm": algorithmName,
                        "settingsOfAlgorithm": {
                            "SamplerInitInRadius": Number(document.getElementById("SamplerInitInRadius").value),
                            "SamplerInitMaxNegNum": Number(document.getElementById("samplerInitMaxNegNum").value),
                            "SamplerSearchWinSize": Number(document.getElementById("SamplerSearchWinSize").value),
                            "SamplerTrackInRadius": Number(document.getElementById("SamplerTrackInRadius").value),
                            "SamplerTrackMaxPosNum": Number(document.getElementById("SamplerTrackMaxPosNum").value),
                            "SamplerTrackMaxNegNum": Number(document.getElementById("SamplerTrackMaxNegNum").value),
                            "FeatureSetNumFeatures": Number(document.getElementById("FeatureSetNumFeatures").value),
                        }
                    };
                }
                else if (algorithmName == "MOSSE") {
                    data = {
                        "indexOfBoundingBox": indexOfBoundingBoxes,
                        "rectangle": {
                            "X": Math.round(coords[whichRectangleToDraw].x),
                            "Y": Math.round(coords[whichRectangleToDraw].y),
                            "Width": Math.round(coords[whichRectangleToDraw].width),
                            "Height": Math.round(coords[whichRectangleToDraw].height)
                        },
                        "nameOfRectangle": objectName,
                        "nameOfAlgorithm": algorithmName,
                        "settingsOfAlgorithm": {
                            "": ""
                        }
                    };
                }
                else if (algorithmName == "Multi Object TLD") {
                    data = {
                        "indexOfBoundingBox": indexOfBoundingBoxes,
                        "rectangle": {
                            "X": Math.round(coords[whichRectangleToDraw].x),
                            "Y": Math.round(coords[whichRectangleToDraw].y),
                            "Width": Math.round(coords[whichRectangleToDraw].width),
                            "Height": Math.round(coords[whichRectangleToDraw].height)
                        },
                        "nameOfRectangle": objectName,
                        "nameOfAlgorithm": algorithmName,
                        "settingsOfAlgorithm": {
                            "InternalWidth": Number(document.getElementById("InternalWidth").value),
                            "InternalHeight": Number(document.getElementById("InternalHeight").value),
                            "SureThreshold": Number(document.getElementById("SureThreshold").value),
                            "UnsureThreshold": Number(document.getElementById("UnsureThreshold").value)
                        }
                    };
                }
                else if (algorithmName == "TLD") {
                    data = {
                        "indexOfBoundingBox": indexOfBoundingBoxes,
                        "rectangle": {
                            "X": Math.round(coords[whichRectangleToDraw].x),
                            "Y": Math.round(coords[whichRectangleToDraw].y),
                            "Width": Math.round(coords[whichRectangleToDraw].width),
                            "Height": Math.round(coords[whichRectangleToDraw].height)
                        },
                        "nameOfRectangle": objectName,
                        "nameOfAlgorithm": algorithmName,
                        "settingsOfAlgorithm": {
                            "": ""
                        }
                    };
                }

                /*
                let orFreeRectangle = false;
                for (let i = 1; i <= 16; i = i + 4) {
                    if (i != 1 + k) {
                        console.log("ok");
                        if (coords[i] != 0 || coords[i + 1] != 0 || coords[i + 2] != 0 || coords[i + 3] != 0) {
                            //rect(coords[i], coords[i + 1], coords[i + 2], coords[i + 3]);
                        }
                        else {
                            whichRectangleToDraw = (i - 1) / 4;
                            orFreeRectangle = true;
                            break;
                        }
                    }
                }*/

                //if (orFreeRectangle == false) whichRectangleToDraw = 4;

                document.getElementById('orAlgorithmSelected').innerHTML = "";
                if (data != null)
                    axios.post("/Main/GetObject", data).then(() => {
                        var boundingBoxes = document.getElementById("selectObjectToFixOrAddTemplate");

                        var newOptionBoundingBox = document.createElement('option');
                        newOptionBoundingBox.innerText = namesOfBoundingBoxes[indexOfBoundingBoxes];
                        newOptionBoundingBox.setAttribute('value', indexOfBoundingBoxes);
                        boundingBoxes.appendChild(newOptionBoundingBox);


                        var categories = document.getElementById("boundingBoxes");

                        var newBoundingBox = document.createElement('option');
                        newBoundingBox.innerText = namesOfBoundingBoxes[indexOfBoundingBoxes];
                        newBoundingBox.setAttribute('value', indexOfBoundingBoxes);
                        indexOfBoundingBoxes++;
                        categories.appendChild(newBoundingBox);

                        //for (const [key, value] of Object.entries(coords)) {

                        //}

                        /*
                         switch (countOfBoundingBoxes) {
                             case 1:
                                 const btn1 = document.getElementById("btn1");
                                 btn1.removeAttribute("hidden");
                                 btn1.innerText = objectName;
                                 break;
                             case 2:
                                 const btn2 = document.getElementById("btn2");
                                 btn2.removeAttribute("hidden");
                                 btn2.innerText = objectName;
                                 break;
                             case 3:
                                 const btn3 = document.getElementById("btn3");
                                 btn3.removeAttribute("hidden");
                                 btn3.innerText = objectName;
                                 break;
                             case 4:
                                 const btn4 = document.getElementById("btn4");
                                 btn4.removeAttribute("hidden");
                                 btn4.innerText = objectName;
                                 break;
                         }
                         */

                        const addObject = document.getElementById('addObject');
                        const confirm = document.getElementById('confirm');

                        addObject.style.display = 'inline';
                        //document.getElementById('uploadFile').disabled = false;
                        document.getElementById('addTemplate').disabled = false;
                        document.getElementById('start').disabled = false;
                        //document.getElementById('stop').disabled = false;
                        //document.getElementById('fix').disabled = false;
                        confirm.style.display = 'none';

                        document.getElementById('orAlgorithmSelected').innerHTML = "";
                        //document.getElementById('orBoundingBoxSelected').innerHTML = "";
                        countOfBoundingBoxes++;
                        document.getElementById("numberOfObjects").innerHTML = countOfBoundingBoxes;
                    });
            }


            orDrawRectangle = false;


        }
        else {
            document.getElementById('orAlgorithmSelected').innerHTML = "Select an algorithm.";
        }
    }
    else {
        const addObject = document.getElementById('addObject');
        const confirm = document.getElementById('confirm');

        addObject.style.display = 'inline';
        //document.getElementById('uploadFile').removeAttribute('disabled', '');
        
        
        //document.getElementById('stop').removeAttribute('disabled', '');
        //document.getElementById('fix').removeAttribute('disabled', '');
        confirm.style.display = 'none';
        orDrawRectangle = false;

        delete coords[whichRectangleToDraw];
        if (Object.keys(coords).length != 0) {
            document.getElementById('start').removeAttribute('disabled', '');
            document.getElementById('addTemplate').removeAttribute('disabled', '');
        }
        //coords[whichRectangleToDraw] = undefined;
        //coords[whichRectangleToDraw].x = 0;
        orOne = true;
        //coords[whichRectangleToDraw].y = 0;
        //coords[whichRectangleToDraw].width = 0;
        //coords[whichRectangleToDraw].height = 0;
    }
    
    //if (document.getElementById('orAlgorithmSelected').innerHTML != "Select an algorithm.") { 
        //const addObject = document.getElementById('addObject');
        //const confirm = document.getElementById('confirm');

        //addObject.style.display = 'inline';
        //document.getElementById('uploadFile').disabled = false;
        //document.getElementById('addTemplate').disabled = false;
        //document.getElementById('start').disabled = false;
        ////document.getElementById('stop').disabled = false;
        //document.getElementById('fix').disabled = false;
        //confirm.style.display = 'none';

        //orDrawRectangle = false;
    //}
    //document.getElementById("numberOfObjects").innerHTML = numberOfBoundingBox;
}

let h;// = { "x": 2 };
let whichImage = 0;
let reStartedImage;
let timeOut = {};

function onclickStart() {
    //if (orStoped==false)
    //{
    document.getElementById('start').setAttribute('disabled', '');
    //document.getElementById('fix').disabled = false;
    document.getElementById('fix').setAttribute('disabled', '');
    document.getElementById('addTemplate').setAttribute('disabled', '');
    document.getElementById('uploadFile').setAttribute('disabled', '');
    document.getElementById('fileUpload1').setAttribute('disabled', '');
    document.getElementById('addObject').setAttribute('disabled', '');

    document.getElementById("removeBtn").setAttribute("disabled", '');

    const sb = document.querySelector('#DetectionMethod')
    sb.setAttribute("disabled", '');
    //whichImage = 0; ?
    start()
    //}
    //else {
        //let reStartedImage = whichImage;
        //for (let i = reStartedImage; i < Object.keys(h._imagesInStrings).length; i++) {
        //    //document.getElementById("image").src = "data:image/png;base64," + h._imagesInStrings[i];
        //    let timeOut = setTimeout(() => {
        //        document.getElementById("image").src = "data:image/png;base64," + h._imagesInStrings[i];
        //        for (var j = 0; j < numberOfBoundingBox; j++) {
        //            //if (boutingBoxToDelete[j] == false) { 
        //            coords[1 + (j * 4)] = h._boundingBoxX[i][j];
        //            coords[2 + (j * 4)] = h._boundingBoxY[i][j];
        //            coords[3 + (j * 4)] = h._boundingBoxWidth[i][j];
        //            coords[4 + (j * 4)] = h._boundingBoxHeight[i][j];
        //            //}
        //        }
        //        whichImage = i;
        //    }
        //        , (i + 1) * 500);
        //    a = true;
        //}
    //}
}

let orStoped = false;
function onClickStop() {
    for (var i = 0; i <= Object.keys(h._imagesInStrings).length; i++) {
        clearTimeout(timeOut[i]);
    }
    //orStoped = true;
    orDrawBoundingBox = false;
    whichImage = 0;
    axios.post("/Main/_view_Stop");// zrobic wyjatkowe nazwy

    //document.getElementById('fix').removeAttribute('disabled', '');
    document.getElementById('fix').setAttribute('disabled', '');
    document.getElementById('addTemplate').removeAttribute('disabled', '');
    document.getElementById('uploadFile').setAttribute('disabled', '');
    document.getElementById('fileUpload1').setAttribute('disabled', '');
    document.getElementById('addObject').removeAttribute('disabled', '');

    document.getElementById('start').disabled = false;
    document.getElementById('stop').setAttribute('disabled', '');

    document.getElementById("removeBtn").removeAttribute("disabled", '');
    // const btn1 = document.getElementById("btn1");
    //console.log(btn1.hidden==false);
    //if (btn1.hidden == false) {
    //    btn1.removeAttribute("disabled", '');
    //}
    //const btn2 = document.getElementById("btn2");
    //if (btn2.hidden == false) {
    //    btn2.removeAttribute("disabled", '');
    //}
    //const btn3 = document.getElementById("btn3");
    //if (btn3.hidden == false) {
    //    btn3.removeAttribute("disabled", '');
    //}
    //const btn4 = document.getElementById("btn4");
    //if (btn4.hidden == false) {
    //    btn4.removeAttribute("disabled", '');
    //}

    const sb = document.querySelector('#DetectionMethod')
    sb.removeAttribute("disabled", '');

    if (src2 != null) {
        var preview = document.getElementById("image");
        preview.src = src2;
    } else {
        var video = document.getElementById('video');
        var preview = document.getElementById("image");
        preview.style.display = "none";
        video.style.display = "inline";
        var source = document.getElementById('srcOfVideo');

        source.setAttribute('src', url2);

        video.load();
    }
}

let allFree = true;

//function onClickFix(fixOrAddTemplate) {
function onClickFixOrTemplate(fixOrAddTemplate) {
    
    //if (allFree == true) {
    if (countOfBoundingBoxes == 0) {
        alert("There are no areas of interest");
    }
    else {
        document.getElementById('uploadFile').setAttribute('disabled', '');
        document.getElementById('start').setAttribute('disabled', '');
        document.getElementById('stop').setAttribute('disabled', '');
        document.getElementById('addObject').setAttribute('disabled', '');
        document.getElementById('fileUpload1').setAttribute('disabled', '');


        document.getElementById('selectObjectToFixOrAddTemplate').removeAttribute("hidden");

        switch (fixOrAddTemplate) {
            case "fix":
                for (var i = 0; i <= Object.keys(h._imagesInStrings).length; i++) {
                    clearTimeout(timeOut[i]);
                }
                //document.getElementById('addTemplate').setAttribute('disabled', '');
                document.getElementById('fix').style.display = 'none';
                document.getElementById('confirmChooseForFix').style.display = 'inline';
                break;
            case "addTemplate":
                document.getElementById('fix').setAttribute('disabled', '');
                document.getElementById('addTemplate').style.display = 'none';
                document.getElementById('confirmChooseForAddTemplate').style.display = 'inline';
                break;
        }

        
        //let firstOptionToFixOrAddTemplate = document.getElementById("firstOptionToFixOrAddTemplate")
        //firstOptionToFixOrAddTemplate.setAttribute('hidden', '');

        //let secondOptionToFixOrAddTemplate = document.getElementById("secondOptionToFixOrAddTemplate");
        //secondOptionToFixOrAddTemplate.setAttribute('hidden', '');

        //let thirdOptionToFixOrAddTemplate = document.getElementById("thirdOptionToFixOrAddTemplate");
        //thirdOptionToFixOrAddTemplate.setAttribute('hidden', '');

        //let fourthOptionToFixOrAddTemplate = document.getElementById("fourthOptionToFixOrAddTemplate");
        //fourthOptionToFixOrAddTemplate.setAttribute('hidden', '');

        //if (namesOfBoundingBoxes[0] != undefined && namesOfBoundingBoxes[0] != null) {
        //    firstOptionToFixOrAddTemplate.innerHTML = namesOfBoundingBoxes[0];
        //    firstOptionToFixOrAddTemplate.removeAttribute("hidden");
        //}

        //if (namesOfBoundingBoxes[1] != undefined && namesOfBoundingBoxes[1] != null) {
        //    secondOptionToFixOrAddTemplate.innerHTML = namesOfBoundingBoxes[1];
        //    secondOptionToFixOrAddTemplate.removeAttribute("hidden");
        //}

        //if (namesOfBoundingBoxes[2] != undefined && namesOfBoundingBoxes[2] != null) {
        //    thirdOptionToFixOrAddTemplate.innerHTML = namesOfBoundingBoxes[2];
        //    thirdOptionToFixOrAddTemplate.removeAttribute("hidden");
        //}

        //if (namesOfBoundingBoxes[3] != undefined && namesOfBoundingBoxes[3] != null) {
        //    fourthOptionToFixOrAddTemplate.innerHTML = namesOfBoundingBoxes[3];
        //    fourthOptionToFixOrAddTemplate.removeAttribute("hidden");
        //}
    }
}

function onclickConfirmChooseForFix() {
    document.getElementById('selectObjectToFixOrAddTemplate').setAttribute('hidden', 'hidden');
    document.getElementById('confirmChooseForFix').style.display = 'none';
    document.getElementById('confirmForFix').style.display = 'inline';
    

    var select = document.getElementById('selectObjectToFixOrAddTemplate');
    //var option = select.options[select.selectedIndex];

        //switch (option.value) {
        //    case '1':
        //        whichRectangleToDraw = 0;
        //        break;
        //    case '2':
        //        whichRectangleToDraw = 1;
        //        break;
        //    case '3':
        //        whichRectangleToDraw = 2;
        //        break;
        //    case '4':
        //        whichRectangleToDraw = 3;
        //        break;
        //}

    let index = select.selectedIndex
    whichRectangleToDraw = index;

    coords[index].x = 0;
    coords[index].y = 0;
    coords[index].width = 0;
    coords[index].height = 0;

    orDrawRectangle = true;
}

function onclickConfirmChooseForAddTemplate() {
    document.getElementById('selectObjectToFixOrAddTemplate').setAttribute('hidden', 'hidden');
    document.getElementById('confirmChooseForAddTemplate').style.display = 'none';
    document.getElementById('confirmForAddTemplate').style.display = 'inline';
    //getPointOfTemplate = true;
    orDrawTemplate = true;
}

function onclickConfirmForAddTemplate() {
    orDrawTemplate = false;
    document.getElementById('uploadFile').setAttribute('disabled', '');
    //document.getElementById('fix').removeAttribute('disabled', '');
    document.getElementById('fix').setAttribute('disabled', '');
    document.getElementById('start').removeAttribute('disabled', '');
    document.getElementById('stop').setAttribute('disabled', '');
    document.getElementById('addObject').removeAttribute('disabled', '');
    document.getElementById('fileUpload1').setAttribute('disabled', '');
    document.getElementById('addTemplate').style.display = 'inline';
    document.getElementById('confirmForAddTemplate').style.display = 'none';

    var select = document.getElementById('selectObjectToFixOrAddTemplate');
    var option = select.options[select.selectedIndex];

    data = {
        "nameOfObject": option.text,
        "template": {
            "X": Math.round(template[0].x),
            "Y": Math.round(template[0].y),
            "Width": Math.round(template[0].width),
            "Height": Math.round(template[0].height)
        }
    };
    axios.post("/Main/AddTemplate", data);
    //getPointOfTemplate = false;
}

function start() {
    axios.post("/Main/StartBtn", { "frameId": whichImage }).then(res => {
        console.log(res.data);
        let myJSON = JSON.stringify(res.data);

        h = JSON.parse(myJSON);

        console.log(Object.keys(h._imagesInStrings).length);
        console.log(myJSON);

        orStarted = true;
        
        let time = 1;
        for (let i = 0; i < Object.keys(h._imagesInStrings).length; i++) {

            timeOut[i] = setTimeout(() => {
                
                document.getElementById("image").src = "data:image/png;base64," + h._imagesInStrings[i];
                //let arr = Object.entries(coords);
                whichImage++;
                for (let j = 0; Object.keys(coords).length; j++) {
                    let index = Object.keys(namesOfBoundingBoxes).find(key => namesOfBoundingBoxes[key] === h._namesOfBoundingBoxes[i][j])
                    //let index = parseInt(arr[parseInt(index1)][0]);
                    //let index = Object.keys(coords).find(key => coords[key] === parseInt(index1))
                    coords[index].x = h._boundingBoxX[i][j];
                    coords[index].y = h._boundingBoxY[i][j];
                    coords[index].width = h._boundingBoxWidth[i][j];
                    coords[index].height = h._boundingBoxHeight[i][j];
                }

            }
                , (time) * 40);
            orDrawBoundingBox = true;
            time++;
        }
        document.getElementById('stop').disabled = false;
        document.getElementById('fix').disabled = false;

        var video = document.getElementById('video');
        video.style.display = "none";

        var preview = document.getElementById("image");
        preview.style.display = "inline";

        axios.post("/Main/GetCsvFile").then(res => {
            console.log(res.data);
            let blob = new Blob([res.data], { type: 'text/csv;charset=utf-8;' })
            const fileURL = URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = fileURL;
            anchor.download = "ResultFile.csv";
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        });

    }).then(data => {
        console.log("ok");
    });
}

function onclickConfirmForFix() {
    orDrawRectangle = false;

    document.getElementById('fix').style.display = 'inline';
    document.getElementById('confirmForFix').style.display = 'none';

    //document.getElementById('uploadFile').disabled = false;
    document.getElementById('addTemplate').disabled = true;
    document.getElementById('start').disabled = true;
    //document.getElementById('stop').disabled = false;
    document.getElementById('fix').disabled = true;
    document.getElementById('addObject').disabled = true;
    //document.getElementById('fileUpload1').disabled = false;

    var select = document.getElementById('selectObjectToFixOrAddTemplate');
    var option = select.options[select.selectedIndex];

    data = {
        "objectToFix": option.text,
        "rectangle": {
            "X": Math.round(coords[whichRectangleToDraw].x),
            "Y": Math.round(coords[whichRectangleToDraw].y),
            "Width": Math.round(coords[whichRectangleToDraw].width),
            "Height": Math.round(coords[whichRectangleToDraw].height)
        },
        "whichImage": whichImage
    };
    axios.post("/Main/FixObject", data).then(res => {
        start()
    });
    //let isFree = false;
    //let howManyFree = 0;
    //if (countOfBoundingBoxes >= 4) {
    //    whichRectangleToDraw = 4;
    //}
    //else {
    //    for (freeBoutingBox in freeBoutingBoxes) {
    //        if (freeBoutingBoxes[freeBoutingBox] == true) {
    //            //howManyFree++;
    //            whichRectangleToDraw = parseInt(freeBoutingBox);
    //             //isFree = true;
    //             break;
    //        }
    //    }
    //}

    //if (howManyFree == 4) {
    //    allFree = true;
    //}

    //if (isFree == false) {
    //    whichRectangleToDraw = 4;
    //}
    //whichRectangleToDraw = freeBoutingBoxes.keys[];
}

let extension;
//areaOfInterestedForOriginalImageSize = {};

var src2;
var url2;
function filesUpload(event) {
    ////document.getElementById("uploadFile").removeAttribute("disabled");
    //console.log(document.getElementById("fileUpload1").files.length)
    let inputFile = document.getElementById("fileUpload1");
    //if (event.target.files.length > 0) {
    if (inputFile.files.length > 0) {
        //document.getElementById("simplePlayer").style.display = "inline";
        //var preview = document.getElementById("image");
        //preview.style.display = "none";
        //console.log(document.getElementById("image").style.display);
        //var parts = event.target.files[0].name.split('.');
        let parts = inputFile.files[0].name.split('.');
        extension = parts[parts.length - 1];

        //if (extension == 'mp4') {
        //    var url = URL.createObjectURL(event.target.files[0]);

        //    var video = document.getElementById('video');
        //    //var divForVideo = document.getElementById('divForVideo');
        //    video.style.display = "inline";
        //    var source = document.getElementById('srcOfVideo');

        //    source.setAttribute('src', url);

        //    video.load();
        //    //console.log(video);
        //}
        //else
        if (extension == 'jpg' || //:)
            //extension == 'sr' || //?
            //extension == 'ras' || //:(
            //extension == 'ppm' || //:(
            //extension == 'pgm' || //:(
            //extension == 'pbm' || //:(
            extension == 'jpe' || //:)
            //extension == 'jp2' || //?
            extension == 'jpeg' || //:)
            extension == 'png' || //:)
            extension == 'gif' || //:)
            //extension == 'tif' || //:(
            //extension == 'tiff' || //:(
            extension == 'bmp') { //:)
            src2 = URL.createObjectURL(event.target.files[0]);
            var src = URL.createObjectURL(event.target.files[0]);
            var preview = document.getElementById("image");
            preview.src = src;
            preview.style.display = "inline";
            console.log(event.target.files.length);
            document.getElementById("numberOfAllFrames").innerHTML = event.target.files.length;
        } else
            if (extension == 'mp4'// ||
                //extension == 'ogg' ||
                //extension == 'webm' 
            ) {
                url2 = URL.createObjectURL(event.target.files[0]);
                var url = URL.createObjectURL(event.target.files[0]);

                var video = document.getElementById('video');
                //var divForVideo = document.getElementById('divForVideo');
                video.style.display = "inline";
                var source = document.getElementById('srcOfVideo');

                source.setAttribute('src', url);

                video.load();
            }
            else {
                alert("The file format is not supported.");
                return 0;
            }
        document.getElementById("uploadFile").removeAttribute("disabled");

                //let imageFile = event.target.files[0];
             
                //var preview = document.getElementById("image");
                //preview.style.display = "inline";
                //        // Dynamically create a canvas element
                ////var canvas = document.createElement("canvas");
                //var canvas = document.getElementById("canvas");

                //        // var canvas = document.getElementById("canvas");
                //        var ctx = canvas.getContext("2d");

                //        // Actual resizing
                //ctx.drawImage(preview, 0, 0, 500, 500);


                ////var src = URL.createObjectURL(event.target.files[0]);
                //var src = canvas.toDataURL(imageFile.type);
                
                //preview.src = src;
               

                        // Show resized image in preview element
                //        var dataurl = canvas.toDataURL(imageFile.type);
                //document.getElementById("image").src = dataurl;
                    
                //    img.src = event.target.result;
            //}
        //var preview2 = document.getElementById("srcOfVideo");
        //preview2.src = url;
        //preview2.style.display = "inline";

        //var src = URL.createObjectURL(event.target.files[0]);
        //var preview = document.getElementById("image");
        //preview.src = src;
        //preview.style.display = "inline";
        //console.log(event.target.files.length);
        //document.getElementById("numberOfAllFrames").innerHTML = event.target.files.length;
    }




    const form = document.getElementById("uploadFilesForm");
    if (form == null) {
        console.log("errrrror");
    }

    //const reader = new FileReader();
    //let img = document.querySelector("#fileUpload1");



    form.addEventListener("submit", (e) => {
        e.preventDefault();
        //console.log(video.videoHeight);
        //console.log(video.videoWidth);
        let data;
        if (extension == 'jpg' ||
            extension == 'jpe' ||
            extension == 'jpeg' ||
            extension == 'png' ||
            extension == 'gif' ||
            extension == 'bmp') {
            //resizeCanvas(preview.naturalWidth, preview.naturalHeight);

            //sizeForOriginalImage.width = preview.naturalWidth;
            //sizeForOriginalImage.height = preview.naturalHeight;

            data = {
                "width": preview.naturalWidth,
                "height": preview.naturalHeight
            };
            //preview.style.display = "none";
        }
        else if (extension == 'mp4') {
            //resizeCanvas(video.videoWidth / 16, video.videolHeight / 9);
            //resizeCanvas(video.videoWidth, video.videoHeight);

            //ImageTools.resize(event.target.files[0], {
            //    width: 320, // maximum width
            //    height: 180 // maximum height
            //});

            data = {
                "width": video.videoWidth,
                "height": video.videoHeight
            };
            //video.style.display = "none";
        }
        document.getElementById("uploadFile").setAttribute('disabled','');
        
        //const file = document.querySelector('input[type=file]').files[0];
        //console.log("~/"+file.name);
        //console.log(form.elements["fileUpload"])
        //console.log(document.querySelector("#fileUpload1").value);
        //console.log(e.files);
        //document.getElementById("image").src = URL.createObjectURL(e.target.files[0]);
        //const reader = new FileReader();
        //let r = reader.result;
        //document.querySelector("#image").src = document.querySelector("#fileUpload1").value;
        //img.src = "~/" +file.name;//reader.result;

        const formData = new FormData(form);
        console.log(formData);
        axios
            .post("/Main/Main", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    timeout: 0,
                },
            })
            .then((res) => {
                console.log(res);
                document.getElementById("sendFileInfo").innerHTML = "Total " + event.target.files.length + " files uploaded successfully";
                document.getElementById("addObject").removeAttribute('disabled');
            })
            .catch((err) => {
                console.log(err);
            });

        
        axios.post("/Main/GetSizeOfImage", data);

        let dm = {
            "detectionMethod": 0
        };
        axios.post("/Main/changeDetectionMethod", dm);
    });
    //document.getElementById("fileUpload1").disabled = true;
}

//function onClickAddTemplate() {
//    orDrawRectangle = true;

//    document.getElementById('uploadFile').setAttribute('disabled', '');
//    document.getElementById('fix').setAttribute('disabled', '');
//    document.getElementById('start').setAttribute('disabled', '');
//    document.getElementById('stop').setAttribute('disabled', '');
//    document.getElementById('addObject').setAttribute('disabled', '');
//    document.getElementById('fileUpload1').setAttribute('disabled', '');
//    document.getElementById('confirmChooseForAddTemplate').style.display = 'inline';
//    document.getElementById('addTemplate').style.display = 'none';
//    document.getElementById('selectObjectToFixOrAddTemplate').removeAttribute("hidden");
//}

// opisanych 15/20