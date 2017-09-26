//Listening to form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark funtion
function saveBookmark(e) {
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

if(!validateForm(siteName, siteUrl)){
	return false;
}


	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	//ADDING BOOKMARK
	//check if bookmark is available
	if (localStorage.getItem('bookmarks') === null) {
		//initialize an array
		var bookmarks = [];
		//add to array
		bookmarks.push(bookmark);
		//set to localstorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		//get bookmarks from local storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		//add above bookmark to array
		bookmarks.push(bookmark);
		//resetting localstorage after pushing
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

		//clear form
		document.getElementById('myForm').reset();

		//refetch bookmarks
			fetchBookmarks();

	//prevent form from submitting
	e.preventDefault();
}

//delete bookmark
function deleteBookmark(url){
	//get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//loop through bookmarks
	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			//remove from array
			bookmarks.splice(i, 1);
		}
	}
	//resetting localstorage after pushing
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//refetch bookmarks
	fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks(){
	//get bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//get output id
	var bookmarksResults = document.getElementById('bookmarksResults');
	//build output
	bookmarksResults.innerHTML = '';
	for( var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		
		bookmarksResults.innerHTML += '<div class="well">'+
																		'<h3>'+name+
																		' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
																		' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="">Delete</a> ' +
																		'</h3>'+
																		'</div>';
	}
}

//form validation
function validateForm(siteName, siteUrl){
	if(!siteName || !siteUrl){
		alert('Please Fill in the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('Please enter valid url');
		return false;
	}
	return true;
}