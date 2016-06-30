var program = (function(){
	function addSync(x,y){
		console.log(`       [Service Provider] processing ${x} and ${y}`)
		var result = x + y;
		console.log(`       [Service Provider] returning result`)
		return result;
	}

	function addSyncClient(x,y){
		console.log(`[Service Consumer] triggering addSync`);
		var result = addSync(x,y);
		console.log(`[Service Consumer] result = ${result}`);
	}

	function addAsync(x,y, onResult){
		console.log(`       [Service Provider] processing ${x} and ${y}`);
		setTimeout(function(){
			var result = x + y;
			console.log(`       [Service Provider] returning result`);
			onResult(result);
		},3000);
		
	}

	function addAsyncClient(x,y){
		console.log(`[Service Consumer] triggering addAsync`);
		addAsync(x,y, function(result){
			console.log(`[Service Consumer] result = ${result}`);
		});
	}

	var addAsyncEvents = (function(){
		var _callbacks = [];
		function subscribe(callback){
			_callbacks.push(callback);
		}
		function addAsync(x,y){
			console.log(`       [Service Provider] processing ${x} and ${y}`);
			setTimeout(function(){
				var result = x + y;
				console.log(`       [Service Provider] returning result`);
				_callbacks.forEach(cb => cb(result));
			},3000);
		}
		return {
			add : addAsync,
			subscribe : subscribe
		}
	})();

	var addAsyncPromise = function(x,y){
		console.log(`       [Service Provider] processing ${x} and ${y}`);
		var promise = new Promise(function(resolveFn, rejectFn){
			setTimeout(function(){
				var result = x + y;
				console.log(`       [Service Provider] returning result`);
				resolveFn(result);
			},3000);
		});
		
		return promise;
	}

	return {
		addSyncClient : addSyncClient,
		addAsyncClient : addAsyncClient,
		addAsyncEvents : addAsyncEvents,
		addAsyncPromise : addAsyncPromise
	}
})()