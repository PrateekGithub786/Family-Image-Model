Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_img" src="' + data_uri + '"/>';
    });
}

console.log('ML5 version: ', ml5.version);

function modelLoaded() {
    console.log("model loaded");
}
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/a7CJ9EQT-/model.json', modelLoaded());



function check() {
    img = document.getElementById("captured_img");
    classifier.classify(img , gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("object").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}