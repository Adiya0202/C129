song_1="";
song_2="";
leftWrist_x="";
leftWrist_y="";
rightWrist_x="";
rightWrist_y="";
scoreRightWrist=0;
scoreLeftWrist=0;

function preload(){
song_1= loadSound("Song_1.mp3");
song_2= loadSound("song_2.mp3");
}

function setup(){
canvas= createCanvas(400,400);
canvas.center();

video= createCapture(VIDEO);
video.hide();

poseNet= ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotResult);
}

function modelLoaded(){
    console.log('poseNet is initialised');
}

function gotResult(results){

    if(results.length > 0){
        console.log(results);
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        scoreRightWrist= results[0].pose.keypoints[10].score;
        console.log("score leftWrist="+scoreLeftWrist+"score rightWrist="+scoreRightWrist);
        leftWrist_x= results[0].pose.leftWrist.x;
        leftWrist_y= results[0].pose.leftWrist.y;
        console.log("leftWrist_x="+leftWrist_x+"leftWrist_y="+leftWrist_y);
        rightWrist_x= results[0].pose.rightWrist.x;
        rightWrist_y= results[0].pose.rightWrist.y;
        console.log("rightWrist_x="+rightWrist_x+"rightWrist_y="+rightWrist_y);
    }
}

function draw(){
image(video, 0,0,400,400);
var song1_status= song_1.isPlaying();
song2_status= song_2.isPlaying();
fill("#9966cc");
stroke("#9966cc");

if (scoreLeftWrist > 0.2){
    circle(leftWrist_x, leftWrist_y, 20);
    song_1.stop();

    if (song2_status == false){
        song_2.play();
        document.getElementById("song_name_teller").innerHTML="Playing Song: ";
    }
}
if (scoreRightWrist > 0.2){
    circle(rightWrist_x, rightWrist_y, 20);
    song_2.stop();

    if (song1_status == false){
        song_1.play();
        document.getElementById("song_name_teller").innerHTML="Playing Song: ";
    }
}
}