function missingSequence(arr) {
	var min = arr[0],
		nextMin;

	for(var i = 0; i < arr.length; i++) {
		if(arr[i] < min) {
			min = arr[i];
			if(arr[i-1]) {
				nextMin = arr[i-1];
			} else if (arr[i+1]) {
				nextMin = arr[i+1];
			}
		}
	}

	for(var i = 0; i < arr.length; i++) {
		if(arr[i] !== min && arr[i] < nextMin) {
			nextMin = arr[i];
		}
	}

	var diff = arr[1] - arr[0];
	console.log(diff);

	for(var i = 0; i < arr.length; i++) {
		var found = false;
		for(var j = 1; j < arr.length; j++) {	
			console.log(arr[i], arr[j]);
			console.log((arr[i] - arr[j]) === diff);	
			if((arr[i] - arr[j]) === diff) {
				found = true;
			} else {
				continue;
			}
		}
		if (found === true) {
			continue;
		} else {
			return arr[i] + diff;
		}
	}
}

missingSequence([14,12,15,10,11])