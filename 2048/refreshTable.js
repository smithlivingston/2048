function refreshTable() {
  var emptyCells = findEmpytyCells();
  introduceInRandomEmptyCell(emptyCells);
}

function findEmpytyCells() {
  var emptyCells = [];
  //create an array of object with key valaue par
  //i.e -> [{position, value}]
  //i.e -> [{'11' 2}, {12, 0}, {13, 2}]
  for (i = 0; i < 5; i++) {
    //row loop
    for (j = 0; j < 5; j++) {
      //column loop
      //each cell
      var cellValue = document.getElementById("row" + (i + 1)).children[j]
        .innerHTML;
      if (cellValue.trim() == "") {
        var pos = (i + 1).toString() + (j + 1).toString();
        var emptyCellElement = { position: pos, value: 0}
        emptyCells.push(emptyCellElement);
      }
    }
  }
  if (emptyCells.length == 0) {
    GameOver();
  }
  return emptyCells;
}

function introduceInRandomEmptyCell(emptyCells) {
    var randomCell = randomIntFromInterval(0, emptyCells.length -1);

    cellToBeInserted = emptyCells[randomCell];
console.log(cellToBeInserted);
    cellToBeInserted.position.split('');
    document.getElementById("row" + (parseInt(cellToBeInserted.position.split('')[0]) -1)).children[parseInt(cellToBeInserted.position.split('')[1]) -1]
        .innerHTML = '2';

}

function GameOver() {
  //disable All buttons
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  