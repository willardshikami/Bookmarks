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

//check if bookmark is available
if(localStorage.getItem('bookmarks') === null){
    //initialize an array
    var bookmarks = [];

    //add to array
    bookmarks.push(bookmark);

    //set to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

//prevent form from submitting
e.preventDefault();
}