window.addEventListener('load', event);
function event() {
    document.getElementById('submit').addEventListener("click", mailsend);
}
function mailsend() {
    var s = document.getElementById("submit");
    var l = document.getElementById("load");
    var d = document.getElementById("done");
    var e = document.getElementById("error");
    s.style.display = "none";
    d.style.display = "none";
    e.style.display = "none";
    l.style.display = "inline-block";
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var msg = document.getElementById('msg').value;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    var pr = fetch("http://192.168.1.5:4560/" + 'query', {
        method: "POST",
        body: JSON.stringify({ name: name, email: email, subject: subject, msg: msg, date: today })
    })
    pr.then(response => {
        response.text().then(data => {
            data = JSON.parse(data);
            l.style.display = "none";
            s.style.display = "inline-block";
            if (data.s == true) d.style.display = "inline-block";
            else e.style.display = "inline-block";
        }).catch((err) => {
            s.style.display = "inline-block";
            e.style.display = "inline-block";
        })
    }).catch((err) => {
        s.style.display = "inline-block";
        e.style.display = "inline-block";
    })
}
