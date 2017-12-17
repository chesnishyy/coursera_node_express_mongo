const rect = require('./rectangle');

function solveRect(l, b) {
	console.log('_______________________');
	console.log('solving for rectangle with l = ' + l + 'and b = ' + b);

	rect(l, b, (err, rectangle) => {
		"use strict";
		if (err) {
			console.log("ERROR: ", err.message);
		}
		else {
			console.log("The area of the rectangle of dimensions l = " + l + " and b = " + b + " is " + rectangle.area(l, b));
			console.log("The perimeter of the rectangle of dimensions l = " + l + " and b = " + b + " is " + rectangle.perimeter(l, b));

		}
	});
	console.log("This statement is after the call to rect");
}

solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(-3, 5);