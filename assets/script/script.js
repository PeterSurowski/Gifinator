var topics = ['kick', 'punch', 'bodyslam', 'flex'];
var APIKey = '7879decc052849d6ae0c7e6538b42dad';
console.log(topics.length);

//Loops through the array and creates some buttons
for (i = 0; i < topics.length; i++) {
	$('#buttons').append('<button id="' + topics[i] + '" class="btn btn-default">' + topics[i] + '</button>');
	console.log(topics[i]);
}

//When the user clicks "Click me, bro!"
$('#submit').on('click', function() {
	//We get whatever word the user put in...
	var input = $('#input').val().trim();
	//Push that into the array...
	topics.push(input);
	console.log(input);
	console.log(topics);
	//Empty #buttons...
	$('#buttons').html('');
	//And reprint the array of buttons
	for (i = 0; i < topics.length; i++) {
		$('#buttons').append('<button id="' + topics[i] + '" class="btn btn-default">' + topics[i] + '</button>')
	};
});

//Then when someone clicks another button...
$(document).on('click', 'button', function() {
	//We get the data value from that button...
	var buttonID = $(this).attr('id');
	console.log(buttonID);
	console.log(topics);
	//Store the Giphy URL in a var...
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonID + "&api_key=" + APIKey + "&limit=10"
	//Send it to Giphy in the form of a query...
	$.ajax({
		url: queryURL,
		method: 'GET'
	})
	//When we get our result back from Giphy...
	.done(function(response) {
		//We store the answer in a var...
		var result = response.data;
		//And for each item in the result...
		for (i = 0; i < result.length; i++) {
			//We create a var containing an image tag...
			var imgTag = $('<img>');
			//With an attr of src.
			imgTag.attr('src', response.data[i].images.fixed_width_still.url);
			//Give it attributes of data-still and data-animate and a data-state value.
			imgTag.attr('data-still', response.data[i].images.fixed_width_still.url);
			imgTag.attr('data-animate', response.data[i].images.fixed_width.url);
			imgTag.attr('data-state', 'still');
			//Prepend the image to the #output
			$('#output').prepend(imgTag);
		}

//If you click on a gif...
$('img').on('click', function() {
	//Save the data-state in a var
	dataState = $(this).attr('data-state');
	//If the dataState is set to "still"...
	if (dataState === 'still') {
		//Replace that src URL with the data-animate URL.
		$(this).attr('src', $(this).attr('data-animate'));
		//And change the data state to animate
		$(this).attr('data-state', 'animate');
	} else {
		//Otherwise, replace the src URL with the data-still url.
		$(this).attr('src', $(this).attr('data-still'));
		//And change the data-state to still
		$(this).attr('data-still', 'still');
	}
})

/*
		var stillGIF = response.data[0].images.fixed_width_still.url
		console.log(stillGIF);
		var movingGIF = response.data[0].images.fixed_width.url
		console.log(movingGIF);
		*/
	})

	
});







