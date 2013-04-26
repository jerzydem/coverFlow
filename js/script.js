window.onload = function() {
	var PICT_NUM = 37;
	var picturesList = [];
	var inMove = false;
	var bigIndex = 0;
	var bigPict = $('#startPict');
	var list = $('#pictList');

	for (var i = 1; i <= PICT_NUM; i++) {
		picturesList.push('pict' + i + '.jpg');
	}

	$(document).keydown(function(e) {
		if (e.keyCode === 37 && !inMove) {
			inMove = true;
			moveLeft();
		} else if (e.keyCode === 39 && !inMove) {
			inMove = true;
			moveRight();
		}

	});

	$('#leftBt').click(function() {
		if (!inMove) {
			inMove = true;
			moveLeft();
		}
	});
	$('#rightBt').click(function() {
		if (!inMove) {
			inMove = true;
			moveRight()
		}
	});

	function moveLeft() {
		var newElement = $('<li class="place">' + getPrev(5) + '</li>');
		var firstElement = list.children().first();
		var next = bigPict.next();

		firstElement.animate({
			width : "0px"
		}, 500, function() {
			inMove = false;
			list.append(newElement);
			firstElement.remove()
		});

		bigPict.find('img').animate({
			width : "80px",
			height : "60px",
		}, 500);
		next.find('img').animate({
			width : "200px",
			height : "150px",
		}, 500, function() {
			bigPict = next;
		});

	}

	function moveRight() {
		var newElement = $('<li class="place" style="width: 0px">' + getNext(5) + '</li>');
		var prev = bigPict.prev();

		list.prepend(newElement);
		list.children().last().remove();
		newElement.animate({
			width : "100px",
		}, 500, function() {
			$(this).removeAttr("style");
		});
		bigPict.find('img').animate({
			width : "80px",
			height : "60px",
		}, 500);
		prev.find('img').animate({
			width : "200px",
			height : "150px",
		}, 500, function() {
			bigPict = prev;
			inMove = false;
		});

	}

	function getNext(num) {
		var nextIndex = (bigIndex + num) % PICT_NUM;
		bigIndex = (bigIndex + 1) % PICT_NUM;
		return '<img class="picture" src="img/' + picturesList[nextIndex] + '">';
	}

	function getPrev(num) {
		var nextIndex;
		var x = bigIndex - num;
		var y = bigIndex - 1;
		nextIndex = (x < 0) ? PICT_NUM + x : x;
		bigIndex = (y < 0) ? PICT_NUM - 1 : y;
		return '<img class="picture" src="img/' + picturesList[nextIndex] + '">';
	}

}