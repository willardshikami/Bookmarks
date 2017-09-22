//Listening to form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark funtion
function saveBookmark(e){
var siteName = document.getElementById('siteName').value;
var siteUrl = document.getElementById('siteUrl').value;

var bookmark = {
    name: siteName,
    url: siteUrl
}

//Local Storage


//prevent form from submitting
e.preventDefault();
}