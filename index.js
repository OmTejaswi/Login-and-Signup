var i1;
var i2;

var loginBtn, registerBtn;

var user;
var Name, Password;

var auth;

var db;
var id;

var errorCode, errorMsg = "";

function setup() {
    createCanvas(windowWidth, windowHeight);

    db = firebase.database();
    auth = firebase.auth();

    i1 = createInput("","text").position(500,200)
    i2 = createInput("","password").position(500,230);

    registerBtn = createButton("Register").position(500,260);
    loginBtn = createButton("Login").position(500,290);

    fill("black");
    textSize(15);
    textAlign(CENTER);
    text("Email: ",440,205);
    text("Password:",440,240);
}

function draw() {
    background(255);

    Name = i1.value();
    Password = i2.value();

    user = firebase.auth().currentUser;
    
    registerBtn.mousePressed(function(){
            

            auth.createUserWithEmailAndPassword(Name,Password).then(function(){
            alert("sucess!");
            id=firebase.auth().currentUser.uid;
            db.ref("users/"+id).set({
                ID: id
            })

           
            user.sendEmailVerification().then(function(){
                //alert("sucess!");
                id=firebase.auth().currentUser.uid;
                db.ref("users/"+id).set({
                    ID: id
                })
    
                
                
             })

            
            
        }).catch(function(error){

            errorCode=error.code;
            errorMsg=error.message;

            console.log(errorCode);
            console.log(errorMsg)
        
           });
    })
    loginBtn.mousePressed(function(){
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
            console.log(errorMsg);

           
        
           });
    })
    textAlign(CENTER);
    text(errorMsg,560,400)
}