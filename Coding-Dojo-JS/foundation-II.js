function makeItBig(arr) {
	var i = 0, len = arr.length;
	for(; i < len; i++) {
		if(arr[i] > 0) {
			arr[i] = "big";
		}
	}
	return arr;
}

function printLowReturnHigh(arr) {
	var i = 1, len = arr.length, min = arr[0], max = arr[0];
	for(; i < len; i++) {
		if(arr[i] < min) {
			min = arr[i];
		} else if (arr[i] > max) {
			max = arr[i];
		}
	}
	console.log(min);
	return max;
}

function printOneReturnAnother(arr) {
	var i = 0, len = arr.length;
	console.log(arr[len-2]);
	for(; i < len; i++) {
		if(arr[i] % 2 !== 0) {
			return arr[i];
		}
	}
}

function doubleVision(arr) {
	var newArr = [], i = 0, len = arr.length;
	for(; i < len; i++) {
		newArr.push(arr[i]*2);
	}
	return newArr;
}

function countPositives(arr) {
	var i = 0, len = arr.length, count = 0;
	for(; i < len; i++) {
		if(arr[i] > 0) {
			count++;
		}
	}
	arr[len-1] = count;
	return arr;
}

function evensAndOdds(arr) {
	var i = 0, len = arr.length, evenCount = 0, oddCount = 0;
	for(; i < len; i++) {
		if(arr[i] % 2 === 0) {
			evenCount++;
		} else {
			oddCount++;
		}
		if (evenCount === 3) {
			console.log("Even more so!");
		} else if (oddCount === 3) {
			console.log("That's odd!");
		}
	}
}

function incrementTheSeconds(arr) {
	var i = 0, len = arr.length;
	for(; i < len; i++) {
		if(i % 2 !== 0) {
			arr[i]++;
			console.log(arr[i]);
		}
	}
	return arr;
}

function previousLengths(arr) {
	var i = 1, len = arr.length, currWordLen = arr[0].length;
	for(; i < len; i++) {
		var nextWordLen = arr[i].length;
		arr[i] = currWordLen;
		currWordLen = nextWordLen;
	}
	return arr;
}

function addSeven(arr) {
	var i = 0, len = arr.length, newArr = [];
	for(; i < len; i++) {
		newArr.push(arr[i]+7);
	}
	return newArr;
}

function reverseArr(arr) {
	var i = 0, len = arr.length;
	for(; i < len / 2; i++) {
		var temp = arr[i];
		arr[i] = arr[len - i - 1];
		arr[len - i - 1] = temp;
	}
	return arr;
}

function outlookNegative(arr) {
	var i = 0, len = arr.length, newArr = [];
	for(; i < len; i++) {
		newArr.push(0-Math.abs(arr[i]));
	}
	return newArr;
}

function alwaysHungry(arr) {
	var i = 0, len = arr.length, fed = false;;
	for(; i < len; i++) {
		if(arr[i] === "food") {
			fed = true;
			console.log("yummy");
		}
	}
	if(fed === false) {
		console.log("I'm hungry");
	}
}

function swapTowardCenter(arr) {
	var i = 0, len = arr.length;
	for(; i < len / 2; i++) {
		if(i % 2 === 0) {
			var temp = arr[i];
			arr[i] = arr[len - i - 1];
			arr[len - i - 1] = temp;
		}
	}
	return arr;
}

function scaleArray(arr, num) {
	var i = 0, len = arr.length;
	for(; i < len; i++) {
		arr[i] *= num;
	}
	return arr;
}