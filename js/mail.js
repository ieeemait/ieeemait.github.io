window.addEventListener('load', event);
function updateno(obj) {
    obj.child('usercnt').once('value', snap => {
        obj.update({ 'usercnt': snap.val() + 1 });
    })
}
function getno(obj) {
    obj.child('usercnt').on('value', snap => {
        var s = document.getElementById("cntvalue");
        s.innerHTML = snap.val();
    })
}
function event() {
    const firebaseConfig = {
        apiKey: "AIzaSyBmDPDSQlj51mThys9ZxzD53WeYh2oFIZI",
        authDomain: "ieeemait-57e66.firebaseapp.com",
        databaseURL: "https://ieeemait-57e66.firebaseio.com",
        projectId: "ieeemait-57e66",
        storageBucket: "ieeemait-57e66.appspot.com",
        messagingSenderId: "81543012938",
        appId: "1:81543012938:web:2602ff1e9e6d122157bcb3",
        measurementId: "G-CLBSSH5GHZ"
    };
    firebase.initializeApp(firebaseConfig);
    const obj = firebase.database().ref("users");
    getno(obj);
    updateno(obj);
    document.getElementById('submit').addEventListener("click", mailsend);
    document.getElementById('here').addEventListener("click", redirect);
}
function redirect() {
    window.open("https://hackthehourglass.ieeemait.com");
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
    var pr = fetch("https://ieeemait.herokuapp.com/" + 'query', {
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
