// create a webcam
Webcam.set({
	width:350,
	height:300,
	image_format: 'png',
	png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function snapshot(){
	Webcam.snap(function(data_uri){
	document.getElementById("result").innerHTML = `<img id="captured_image" src="${data_uri}/>"`;
	});
}

// create a function for users to upload their own images to the model
function upload(){
	var file_input = document.getElementById("file_input");
	var file = file_input.files[0];
	var reader = new FileReader();
	reader.onload = function(e){
		var contents = e.target.result;
		document.getElementById("result").innerHTML = `<img id="captured_image" src="${contents}"/>`;
	}
	reader.readAsDataURL(file);
}
console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/wWxJpNcYN/model.json",modelLoaded);

function modelLoaded(){
	console.log("Model Loaded!");
}

function check(){
	img = document.getElementById('captured_image');
	classifier.classify(img, gotResult);
}

function gotResult(error, results){
	if (error) {
		console.error(error);
	}
	else{
		console.log(results);
		accuracy = results[0].confidence;
		document.getElementById("result_object_name").textContent = results[0].label;
		document.getElementById("result_object_accuracy").textContent = accuracy.toFixed(3);
	}
}
