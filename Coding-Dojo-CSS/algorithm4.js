function greaterThanY(arr,Y) {
	var count = 0, i = 0, len = arr.length;

	for(; i < len; i++) {
		if(arr[i] > Y) {
			count += 1;
		}
	}

	return count;
}

function maxMinAvg(arr) {
	var max = arr[0], min = arr[0], avg = 0.0, sum = arr[0], i = 1, len = arr.length;

	for(; i < len; i++) {
		if(arr[i] > max) {
			max = arr[i];
		}
		if(arr[i] < min) {
			min = arr[i];
		}
		sum += arr[i];
	}

	avg = sum / len;

	console.log(max, min, avg);
}

function replaceNegatives(arr) {
	var i = 0, len = arr.length;
	for(; i < len; i++) {
		if(arr[i] < 0) {
			arr[i] = "Dojo";
		}
	}
	return arr;
}

function removeVals(arr,start,end) {
	var alpha = end - start, beta = alpha, len = arr.length;
	for(; alpha > 0; alpha--) {
		var omega = len - 1;
		for(; len - 1 > start + 1; len--) {
			var temp = arr[len-2];
			arr[len-2] = arr[len-1];
			arr[len-3] = temp;
		}
	}
	for(; beta >= 0; beta--) {
		arr.pop();
	}
	return arr;
}