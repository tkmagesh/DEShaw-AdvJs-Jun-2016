var products = [
	{id : 4, name : 'Pen', cost : 50, units : 40, category : 1},
	{id : 8, name : 'Hen', cost : 30, units : 20, category : 2},
	{id : 3, name : 'Ten', cost : 60, units : 80, category : 2},
	{id : 5, name : 'Den', cost : 70, units : 60, category : 1},
	{id : 7, name : 'Zen', cost : 90, units : 50, category : 1}
]

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}
/*
sort
filter
any
all
groupBy
map
min
max
sum
reduce
*/

describe("Default List", function(){
	console.table(products);
});

describe('Sorting', function(){
	describe('Products By default [id]', function(){
		function sort(){
			for(var i=0; i<products.length-1; i++)
				for(var j=i+1; j<products.length; j++)
					if (products[i].id > products[j].id){
						var temp= products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		}
		sort();
		console.table(products);
	});

	describe('Any list by any attribute', function(){
		function sort(list, attrName){
			for(var i=0; i<list.length-1; i++)
				for(var j=i+1; j<list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp= list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}
		describe("products by cost", function(){
			sort(products, "cost");
			console.table(products);
		});
		describe("products by units", function(){
			sort(products, "units");
			console.table(products);
		})
		
	});

	describe('Any list by comparer', function(){
		function sort(list, comparerfn){
			for(var i=0; i<list.length-1; i++)
				for(var j=i+1; j<list.length; j++)
					if (comparerfn(list[i], list[j]) > 0 ){
						var temp= list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		}
		describe("products by value [cost * units]", function(){
			var productComparerByValue = function(p1, p2){
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;
				if (p1Value < p2Value) return -1;
				if (p1Value === p2Value) return 0;
				return 1;
			}
			sort(products, productComparerByValue);
			console.table(products);
		});
		
		
	});
});

describe("Filtering", function(){
	describe("Category 1 products", function(){
		function filterProductsByCategory1(){
			var result = [];
			for(var i=0; i<products.length; i++)
				if (products[i].category === 1)
					result.push(products[i]);
			return result;
		}
		var category1Products = filterProductsByCategory1();
		console.table(category1Products);
	});
	describe("Any list by any criteria", function(){
		function filter(list, criteriaFn){
			var result = [];
			for(var i=0; i<list.length; i++)
				if (criteriaFn(list[i]))
					result.push(list[i]);
			return result;
		}
		function negate(criteriaFn){
			return function(){
				return !criteriaFn.apply(this, arguments);
			}
		}
		var Category2Criteria = function(product){
			return product.category ===  2;
		};
		describe("Category 2 products", function(){
			var category2Products = filter(products, Category2Criteria);
			console.table(category2Products);
		});
		/*var nonCategory2ProductCriteria = function(product){
			return !Category2Criteria(product);
		}*/
		var nonCategory2ProductCriteria = negate(Category2Criteria);

		describe("Non Category 2 products", function(){
			var nonCategory2Products = filter(products, nonCategory2ProductCriteria);
			console.table(nonCategory2Products);
		})
		var costlyProductCriteria = function(product){
				return product.cost > 50;
			};
		describe("Costly products [cost > 50]", function(){
			
			var cosltyProducts = filter(products, costlyProductCriteria);
			console.table(cosltyProducts);
		});
		/*var affordableProductCriteria = function(product){
			return !costlyProductCriteria(product);
		}*/
		var affordableProductCriteria = negate(costlyProductCriteria);
		describe("Affordable products [cost <= 50]", function(){
			
			var affordableProducts = filter(products, affordableProductCriteria);
			console.table(affordableProducts);
		})
	});
});

describe("GroupBy", function(){
	function groupBy(list, keySelectorFn){
		var result = {};
		for(var i=0; i<list.length; i++){
			var key = keySelectorFn(list[i]);
			result[key] = result[key] || [];
			result[key].push(list[i]);
		}
		return result;
	}

	function printGroup(groupResult){
		for(var key in groupResult)
			describe("Key - " + key, function(){
				console.table(groupResult[key]);
			});
	}

	describe("Products grouped by category", function(){
		var categoryKeySelector = function(product){
			return product.category;
		};
		var productsByCategory = groupBy(products, categoryKeySelector);
		printGroup(productsByCategory);
	});

	describe("Products grouped by cost", function(){
		var costKeySelector = function(product){
			return product.cost <= 50 ? "affordable" : "costly";
		};
		var productsByCost = groupBy(products, costKeySelector);
		printGroup(productsByCost);
	});
});
