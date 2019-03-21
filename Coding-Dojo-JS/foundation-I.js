function get1to255() {
	var i = 1, len = 255, arr = [];
	for(; i <= len; i++) {
		arr.push(i);
	}
	return arr;
}

function getEven1000() {
	var i = 1, len = 1000, sum = 0;
	for(; i <= len; i++) {
		if(i % 2 === 0) {
			sum += i;
		}
	}
	return sum;
}

function sumOdd5000() {
	var i = 1, len = 5000, sum = 0;
	for(; i <= len; i++) {
		if(i % 2 !== 0) {
			sum += i;
		}
	}
	return sum;	
}

function iterateArr(arr) {
	var i = 0, len = arr.length, sum = 0;
	for(; i < len; i++) {
		sum += i;
	}
	return sum;
}

function findMax(arr) {
	var i = 1, len = arr.length, max = arr[0];
	for(; i < len; i++) {
		if(arr[i] > max) {
			max = arr[i];
		}
	}
	return max;
}

function findAvg(arr) {
	var i = 0, len = arr.length, sum = 0, avg = 0.0;
	for(; i < len; i++) {
		sum += i;
	}
	return sum / len;
}

function arrayOdd() {
	var i = 1, len = 50, arr = [];
	for(; i <= len; i++) {
		if(i % 2 !== 0) {
			arr.push(i);
		}
	}
	return arr;	
}

function greaterThenY(arr,Y) {
	var i = 0, len = arr.length, count = 0;
	for(; i < len; i++) {
		if(arr[i] > Y) {
			count++;
		}
	}
	return count;
}

function squares(arr) {
	var i = 0, len = arr.length;
	for(; i < len; i++) {
		arr[i] = arr[i] * arr[i];
	}
	return arr;
}

function negatives(arr) {
	var i = 0, len = arr.length;
	for(; i < len; i++) {
		if(arr[i] < 0) {
			arr[i] = 0;
		}
	}
	return arr;
}

function maxMinAvg(arr) {
	var i = 1, len = arr.length, min = arr[0], max = arr[0], sum = 0, avg = 0.0, newArr = [];
	for(; i < len; i++) {
		if(arr[i] < min) {
			min = arr[i];
		} else if(arr[i] > max) {
			max = arr[i];
		}
		sum += arr[i];
	}
	avg = sum / len;
	newArr.push(max);
	newArr.push(min);
	newArr.push(avg);
	return newArr;
}

function swapValues(arr) {
	var len = arr.length, temp = arr[0];
	arr[0] = arr[len-1];
	arr[len-1] = temp;
	return arr;
}

function numberToString(arr) {
	var i = 0, len = arr.length;
	for(; i < len; i++) {
		if(arr[i] < 0) {
			arr[i] = "Dojo";
		}
	}
	return arr;
}