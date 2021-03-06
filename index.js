var i1;
var i2;

var loginBtn, registerBtn;

var user;
var Name, Password;

var auth;

var email, emailVerified;

var db;
var id;

var errorCode, errorMsg;

function setup() {
    createCanvas(windowWidth, windowHeight);

    db = firebase.database();
    
    i1 = createInput("","text").position(500,200)
    i2 = createInput("","password").position(500,230);

    registerBtn = createButton("Register").position(500,260);
    loginBtn = createButton("Login").position(500,290);

    auth = firebase.auth();

    registerBtn.mousePressed(function(){

        user = firebase.auth().currentUser;
            
        Name = i1.value();
        Password = i2.value();

        firebase.auth().createUserWithEmailAndPassword(Name,Password).then(function(){
        alert("sucess!");
        id=firebase.auth().currentUser.uid;
        db.ref("users/"+id).set({
            ID: id
        })

        firebase.auth().onAuthStateChanged(function(user) {
            user.sendEmailVerification(); 
          });

       
        //user.sendEmailVerification().then(function(){
            //alert("sucess!");
            id=firebase.auth().currentUser.uid;
            db.ref("users/"+id).set({
                ID: id,
                email: i1.value(),
            //})

            
            
         })

        
        
    }).catch(function(error){

        errorCode=error.code;
        errorMsg=error.message;

        console.log(errorCode);
        console.log(errorMsg)

        textAlign(CENTER);
        fill("black")
        textSize(20)
        text(errorMsg,500,400)
    
       });
})
loginBtn.mousePressed(function(){

    user = firebase.auth().currentUser;

    Name = i1.value();
    Password = i2.value();

    firebase.auth().signInWithEmailAndPassword(Name,Password).then(function(){
        alert("sucess!")
        id=firebase.auth().currentUser.uid;
        db.ref("users/"+id).set({
            ID: id
        })

        db.ref("users/"+id+"/email").on("value", function(data){
            var em = data.val();
            console.log(em)
        })

    }).catch(function(error){

        errorCode=error.code;
        errorMsg=error.message;

        console.log(errorCode);
        console.log(errorMsg);

        textAlign(CENTER);
        fill("black")
        textSize(20)
        text(errorMsg,500,400)
    
       });
})

    fill("black");
    textSize(15);
    textAlign(CENTER);
    text("Email: ",440,205);
    text("Password:",440,240);
}

function draw() {
   // background(255);

     

    email = user.email;
    emailVerified = user.emailVerified;
    
    

    firebase.auth().onAuthStateChanged(function(user) { 
        if (emailVerified) {
          registerBtn.hide();
          console.log('Email is verified');
        }
        else {
         registerBtn.show();
        }
      });

     
      
}