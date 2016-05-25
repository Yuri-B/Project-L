/* syntax : if element has a "deriveFrom", then it is derived from other elements
if "deriveFrom" is set to False, then it is a basic building block, like an atom
deriveFrom : [["system name",contains score],["system name",contains score]]

the element can be derived from as many other elements as possible, provided that each of those other elements will have a contains score. 
contains score is how much of a sub-element is in an element. The values for that score is from 0 to 1. If 100% of a sub-element is contained in an element, we give it a score of 1
the contains score is also a probability score
*/

var allSystems = {
	"c++" : {deriveFrom:[["machineCode",0.5]]},
	"java" : {deriveFrom:[["c++",0.5]]},
	"machineCode" : {deriveFrom:false},
	"javascript" : {deriveFrom:[["java",0.5]]}
};

var functions = {
	drawTree : function(callbackEl) {
		function scanElements() {
			
			function parseDeriveFromData(elDeriveFrom,inputEl,element) {

				for(var i=0; i<elDeriveFrom.length; i++) {
					var deriveFromIngredient = elDeriveFrom[i];
					
					if(deriveFromIngredient[0] === inputEl) {
						// get parent element - add the "contains score"
						return element;
						// this is for later - when we will add probability scores
						//return [element,deriveFromIngredient[1]];
					}
				}

			}

			var outputArray = [];

			for(var element in allSystems) {
				var el = allSystems[element];
				var elDeriveFrom = el["deriveFrom"];
				
				outputArray.push(parseDeriveFromData(elDeriveFrom,inputEl,element));	
			}

			return outputArray;
		}

		var textString = "";
		// dummy function
		if(callbackEl === "undefined") return;
		var inputEl = (callbackEl) ? callbackEl : "c++";
		// introduce a callback to this function here
		var matchedSystems = scanElements();

		// THIS NEEDS REVISION - we need to scan the entire array of matched elements	
		alert(matchedSystems); // that's where we could draw stuff
		functions.callback(matchedSystems[0]);
	},

	callback : function(callbackEl) {
		functions.drawTree(callbackEl);
	}
};


functions.drawTree();
