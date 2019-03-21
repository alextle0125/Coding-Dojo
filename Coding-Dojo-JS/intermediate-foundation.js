function sigma(num){
	var i = 1, sum = 0;
	for(; i <= num; i++){
		sum += i;
	}
	return sum;
}

function factorial(num){
	var i = 1, product = 1;
	for(; i <= num; i++){
		product *= i;
	}
	return product;
}

function fibonacci(idx){
	var i = 0, seq = [0,1], len = seq.length;
	if(idx === 0){
		return seq[0];
	} else if (idx === 1){
		return seq[1];
	} else if (idx > 1){
		for(; i < idx - 1; i++){
			seq.push(seq[i]+seq[i+1]);
		}
	}
	return seq[seq.length-1];
}

function secondToLast(arr){
	var len = arr.length;
	if(len < 2){
		return null;
	} else {
		return arr[len - 2];
	}
}

function nthToLast(arr,n){
	var len = arr.length;
	if(len < n){
		return null;
	} else {
		return arr[len - n];
	}
}

function secondLargest(arr){
	var len = arr.length;
	if(len < 2){
		return null;
	} else {
		var i = 1, max = arr[0];
		for(; i < len; i++){
			if(arr[i] > max){
				max = arr[i];
			}
		}
		i = 0, secLarge = -999999;
		for(; i < len; i++){
			if(arr[i] > secLarge && arr[i] !== max){
				secLarge = arr[i];
			}
		}
		return secLarge;
	}
}

function doubleTrouble(arr){
	var i = 0, len = arr.length, newArr = [];
	for(; i < len; i++){
		 newArr.push(arr[i]);
		 newArr.push(arr[i]);
	}
	return newArr;
}

function fib(n){
	if(n === 0){
		return 0;
	} else if (n === 1){
		return 1;
	} else {
		return fib(n-2) + fib(n-1);
	}
}