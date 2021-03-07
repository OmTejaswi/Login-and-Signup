var i1;
var i2;

var loginBtn, registerBtn;

var user;
var Name, Password;

var auth;

var email, email_Verified;

var db;
var id;

var i = 0

var errorCode, errorMsg;

function setup() {
    createCanvas(windowWidth, windowHeight);

    db = firebase.database();
    
    i1 = createInput("","text").position(500,200)
    i2 = createInput("","password").position(500,230);

    registerBtn = createButton("Register").position(500,260);
    loginBtn = createButton("Login").position(500,290);

    auth = firebase.auth();

    user = null;

    registerBtn.mousePressed(function(){
            
        Name = i1.value();
        Password = i2.value();

        firebase.auth().createUserWithEmailAndPassword(Name,Password).then(function(){
        alert("sucess!");
        id=firebase.auth().currentUser.uid;
        user = firebase.auth().currentUser;

        firebase.auth().onAuthStateChanged(function(user) {
            user.sendEmailVerification(); 
          });

          db.ref("users/"+id+"/email").on("value",function(data){
              var val = data.val()
              console.log(val);
          })

       
        //user.sendEmailVerification().then(function(){
            //alert("sucess!");
            id=firebase.auth().currentUser.uid;
            db.ref("users/"+id).set({
                ID: id,
                email: i1.value(),
                password: Password
            //})

            
            
         })

         i=1;
         email_Verified = user.emailVerified;
        
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

    Name = i1.value();
    Password = i2.value();

    firebase.auth().signInWithEmailAndPassword(Name,Password).then(function(){
        alert("sucess!")
    
        user = firebase.auth().currentUser;
        i = 1;

        email_Verified = user.emailVerified;
        
        
    }).catch(function(error){

        errorCode=error.code;
        errorMsg=error.message;

        console.log(errorCode);
        console.log(errorMsg);

       
    
       });
})

    
}

function draw() {
   background(255);
   

    //email = user.email;
    
    if(i === 1 && email_Verified === false) {
        firebase.auth().signInWithEmailAndPassword(Name,Password)
        user = firebase.auth().currentUser;
        email_Verified = user.emailVerified
    }
    

    if(user !== null && user !== undefined) {
        user = firebase.auth().currentUser;
        email_Verified = user.emailVerified;
            firebase.auth().onAuthStateChanged(function(user) { 
                if (email_Verified) {
                registerBtn.hide();
                console.log('Email is verified');
                } else {
                registerBtn.show();
                console.log(`Email is not verified`)
                }
            });
    }
     
    fill("black");
    textSize(15);
    textAlign(CENTER);
    text("Email: ",440,205);
    text("Password:",440,240);

    textAlign(CENTER);
    fill("black")
    textSize(20)
    text(errorMsg,500,400)
      
}