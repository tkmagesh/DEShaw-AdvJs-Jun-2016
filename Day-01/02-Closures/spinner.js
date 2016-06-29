
function spinnerFactory(){
	var counter = 0;

	function increment(){
		return ++counter;
	}
	function decrement(){
		return --counter;
	}
	return {
		up : increment,
		down : decrement
	}
}

function spinnerFactory(){
	var counter = 0;
	return {
		up : function(){ return ++counter; },
		down : function(){ return --counter; }
	}
}

var spinner = spinnerFactory();