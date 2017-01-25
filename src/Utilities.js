var utilities = {
    parseCoordinates(coordinateString){
	coordinateArray = coordinateString.split(',');
	var coordinates= {
	    latitude:coordinateArray[0],
	    longitude:coordinateArray[1]
	}
	return coordinates;
    }
};

module.exports = utilities;
