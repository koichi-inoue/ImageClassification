// Preload
let classifier;
let img;

function preload() {
  classifier = ml5.imageClassifier("MobileNet");
}

// modelLoaded > Ready to Accept
function modelLoaded() {
  document.getElementById('message').innerHTML = '<p>The MobileNet model loaded!</p>';

  img = document.getElementById("image");
  img.src = 'DropHere.png';
  img.addEventListener("dragover",function(ev){ ev.preventDefault();}, false);
  img.addEventListener("drop", function(ev){ ev.preventDefault(); GetImage(ev);}, false);

}

// GetImage
function GetImage(ev){

  var file = ev.dataTransfer.files[0];

  var fileType = file.name.slice(-4).toLowerCase();
  if( fileType !== ".jpg" ) {
    alert("File available only .jpg");
    return;
  }

  var reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = function() {
    img.setAttribute("src",reader.result);
    img.onload = function(){
      console.log(img.naturalWidth, img.naturalHeight);
      classifier.classify(img, DisplayResults);
    }
  }

}

function DisplayResults(err, results) {

  var txt="<h2>Predictions</h2>";
  for(i=0; i<results.length; i++){
   txt += "Label：" + results[i].label +'<br>';
   txt += "Confidence：" + results[i].confidence.toFixed(4) +'<br>';
   txt += '<br>';
  }
  document.getElementById('predictions').innerHTML = txt;

}
