window.addEventListener('load', event);
function event() {
    document.getElementById('submit').addEventListener("click", mailsend);
}
function mailsend() {
    console.log("yesy")
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var msg = document.getElementById('msg').value;
    var pr = fetch('query', {
        method: "POST",
        body: JSON.stringify({ name: name, email: email, subject: subject, msg: msg })
    })
}