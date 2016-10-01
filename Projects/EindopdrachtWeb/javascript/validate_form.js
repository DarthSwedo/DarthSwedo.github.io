function checkForm() {
 name = document.getElementById("name").value;
 lname = document.getElementById("lname").value;
 email = document.getElementById("email").value;
 comment = document.getElementById("comment").value;
 
 if (name == "")
 {
 hideAllErrors();
 document.getElementById("nameError").style.display = "inline";
 document.getElementById("name").select();
 document.getElementById("name").focus();
 return false;
 }
 if (lname == "")
 {
 hideAllErrors();
 document.getElementById("lnameError").style.display = "inline";
 document.getElementById("lname").select();
 document.getElementById("lname").focus();
 return false;
 }
 if (email == "")
 {
 hideAllErrors();
 document.getElementById("emailError").style.display = "inline";
 document.getElementById("email").select();
 document.getElementById("email").focus();
 return false;
 }
 if (!checkEmail(email))
 {
 alert('Email address is invalid');
 return false;
 }
 
 if (comment == "")
 {
 hideAllErrors();
 document.getElementById("commentError").style.display = "flex";
 document.getElementById("comment").select();
 document.getElementById("comment").focus();
 return false;
 }
 
 hideAllErrors();
 sendMail();
 return true;
}
 
function hideAllErrors() {
 document.getElementById("nameError").style.display = "none";
 document.getElementById("lnameError").style.display = "none";
 document.getElementById("emailError").style.display = "none";
 document.getElementById("commentError").style.display = "none";
}
 
function checkEmail(inputvalue) {
 var pattern = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
 return pattern.test(inputvalue);
}
hideAllErrors();
function sendMail() {
    var link = "mailto:me@admin@amsterdaminfo.be"
             + "&subject=" + "I," +  escape(document.getElementById('name').value + " " + document.getElementById('lname').value + ", have a question")
             + "&body=" + escape(document.getElementById('comment').value)

    ;

    window.location.href = link;
}