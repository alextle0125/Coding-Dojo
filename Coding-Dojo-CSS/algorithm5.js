function resetNegatives(arr) {
	var i = 0, len = arr.length;
	for(; i < len; i++) {
		if(arr[i] < 0) {
			arr[i] = 0;
		}
	}
	return arr;
}

function moveForward(arr) {
	var i = 0, len = arr.length;
	for(; i < len; i++) {
		arr[i] = arr[i+1];
	}
	arr[len-1] = 0;
	return arr;
}

function returnReversed(arr) {
	var i = 0, len = arr.length;
	for(; i < len / 2; i++) {
		var temp = arr[i];
		arr[i] = arr[len-1-i];
		arr[len-1-i] = temp;
	}
	return arr;
}

function repeatTwice(arr) {
	var i = 0, len = arr.length, newArr = [];
	for(; i < len; i++) {
		newArr.push(arr[i]);
		newArr.push(arr[i]);
	}
	return newArr;
}