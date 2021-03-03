var i1;
var i2;

var b1, b2;

var Name, Password;

var db;
var id;

var errorCode, errorMsg;

function setup() {
    createCanvas(windowWidth, windowHeight);

    db = firebase.database();

    i1 = createInput("","text").position(500,200)
    i2 = createInput("","password").position(500,230);

    b1 = createButton("Register").position(500,260);
    b2 = createButton("Login").position(500,290);

    fill("black");
    textSize(15);
    textAlign(CENTER);
    text("Name: ",440,205);
    text("Password:",440,240);
}

function draw() {
    Name = i1.value();
    Password = i2.value();

    b1.mousePressed(function(){
        firebase.auth().createUserWithEmailAndPassword(Name,Password).then(function(){
            alert("sucess");
            id=firebase.auth().currentUser.uid;
            db.ref("users/"+id).set({
                ID: id
            })
        }).catch(function(error){

            errorCode=error.code;
            errorMsg=error.message;

            console.log(errorCode);
            console.log(errorMsg)
        
           });
    })
    b2.mousePressed(function(){
        firebase.auth().signInWithEmailAndPassword(Name,Password).then(function(){
            alert("sucess!")
            id=firebase.auth().currentUser.uid;
            db.ref("users/"+id).set({
                ID: id
            })
        }).catch(function(error){

            errorCode=error.code;
            errorMsg=error.message;

            console.log(errorCode);
            console.log(errorMsg)
        
           });
    })
}