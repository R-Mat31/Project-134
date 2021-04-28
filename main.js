function preload(){
 alarm = loadSound("alarm.mp3");
}
function setup(){
 canvas = createCanvas(400, 400);
 canvas.center();
 video = createCapture(VIDEO);
 video.hide();
 objectDetector = ml5.objectDetector("cocossd", model_loaded);
 document.getElementById("status").innerHTML = "Status: Person Not Found";
}
function draw(){
 image(video, 0, 0, 400, 400);
 red = random(255);
 green = random(255);
 blue = random(255);
 if(status != ""){
  objectDetector.detect(video, got_result);
  for(i = 0; i < objects.length; i++){
   fill(red, green, blue);
   percentage = floor(objects[i].confidence * 100);
   text(objects[i].label + ": " + percentage + "%", objects[i].x, objects[i].y - 5);
   noFill();
   stroke(red, green, blue);
   rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
   if(objects[i].label == "person"){
    document.getElementById("status").innerHTML = "Status: Person Found";
    alarm.stop();
   }
   else{
    alarm.play();
    document.getElementById("status").innerHTML = "Status: Person Not Found";
    console.log("Person Not Found");
   }   
  }
 }
}
var status = "";
function model_loaded(){
 console.log("Model Loaded");
 status = true;
}
var objects = [];
function got_result(error, results){
 if(error){
  console.error(error);
 }
 else{
  console.log(results);
  objects = results;
 }
}