const baseurl = window.location.origin + "/insert-proj-filename-here"

// to set user's session
function setUserSession(uid){
    localStorage.setItem("uid", uid);
}

// to get info about current user
function getUserID(){
    localStorage.getItem("uid");
}

// main login function
function login(){
    // first clear all error messages if any
    let errors = document.getElementsByName("error-message");
    for(i = 0; i < errors.length; i++){
        errors[i].style.display="none";
    }

    // validate user inputs to avoid errors
    var invalidInputs = false;
    let _uname = document.getElementById("uname").value;
    let _pword = document.getElementById("pword").value;

    if(_uname == null || _uname == ""){
        document.getElementById("missing-u").style.display="block";
        invalidInputs = true;
    }
    if( _pword == null || _pword == ""){
        document.getElementById("missing-p").style.display="block";
        invalidInputs = true;
    }

    if(invalidInputs){
        return
    }

    // make call to servlet and receive status
    let url = new URL("LoginServlet", baseurl);
    let params = {uname: _uname, pass: _pword};
    url.search = new URLSearchParams(params).toString();

    fetch(url)
        .then(data=>data.text())
        .then( (text)=> {
                if(text > 0){ // valid login, can update session, go to home/explore page
                    setUserSession(text); // upon success, create new session for user
                    window.location="index.html";

                } // update html to reflect errors if any
                else if(text == -1){ // wrong password
                    document.getElementById("wrong-p").style.display="block";
                }
                else if(text== -2){ // invalid username
                    document.getElementById("wrong-u").style.display="block";
                }
        })
}