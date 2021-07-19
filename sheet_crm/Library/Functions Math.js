// *****************************************************************************************
// >>> Performs the min or max search for the given array.
//
// Credits: https://www.w3schools.com/js/js_array_sort.asp
// *****************************************************************************************
function myArrayMin(array) {
  let len = array.length;
  let index = [];
  let min = Infinity;

  while (len--) {
    if (array[len] < min) {
      min = array[len];
      index = len;
    }
  }
  return [min, index];
}
// *****************************************************************************************
function myArrayMax(array) {
  var len = array.length
  var max = -Infinity;
  while (len--) {
    if (array[len] > max) {
      max = array[len];
    }
  }
  return max;
}
// *****************************************************************************************
// >>> Transpose a loaded column from a Spreadsheet.
//
// Credits: https://ramblings.mcpher.com/gassnippets2/transposing-sheet-data/
// *****************************************************************************************
function transpose2(data) {
  return Object.keys(data.length ? data[0] : []).map(function (columnIndex) {
    return data.map(function (row) {
      return row[columnIndex];
    });
  });
}
// *****************************************************************************************