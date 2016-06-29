//Create a function that returns true/false based on the given number is prime or not

function primeFinderFactory(){
	var cache = {};
	function checkPrime(n){
		if (typeof cache[n] !== 'undefined')
			return cache[n];
		console.log('processing ', n);
		if (n <= 3){
			cache[n] = true;
			return cache[n];
		}
		cache[n] = true;
		for(var i = 2; i <= (n/2); i++){
			if (n % i === 0){
				cache[n] = false;
				break;
			}
		}
		return cache[n];
	}
	return checkPrime;
}

function primeFinderFactory(){
	var cache = {};
	function checkPrime(n){
		console.log('processing ', n);
		if (n <= 3) return n;
		for(var i = 2; i <= (n/2); i++)
			if (n % i === 0)
				return false;
		return true;
		
	}
	function isPrime(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = checkPrime(n);
		return cache[n];
	}
	return isPrime;
}

var isPrime = primeFinderFactory();

function oddEvenFinderFactory(){
	var cache = {};
	function oddOrEven(n){
		console.log('processing ', n);
		return n % 2 === 0 ? 'even' : 'odd';
		
	}
	return function(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = oddOrEven(n);
		return cache[n];
	}
	
}


function memoize(algoFn){
	var cache = {};
	
	return function(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = algoFn(n);
		return cache[n];
	}
	
}
