
function MovieUrl(movieUrl, movieType) {
    this.movieUrl = movieUrl;
    this.movieType = movieType;
}

function sortAssociativeArray(associativeArray, comparator) {
    var array = [];
    for (var i in associativeArray) {
        array.push([associativeArray[i], i]);
    }
    array.sort(comparator);

    var newAssociativeArray = {};
    for (var i = 0; i < array.length; i++) {
        newAssociativeArray[array[i][1]] = array[i][0];
    }
    return newAssociativeArray;
}