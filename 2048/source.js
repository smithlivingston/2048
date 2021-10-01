/*
###########################################################
###   Author : Smith Livingston                         ###                      
###   Version : 1.0.0                                   ###
###   Code : vanilla JS                                 ###
###   Date : 30-09-2021 6:00 PM                         ###
###########################################################
*/

function modifyASingleRow(index, isRtl) {
  var rowToModify = index;

  var physicalRowContent = document.getElementById(
    "row" + rowToModify
  ).children;
  var currentRow = [];
  //evaluate and set text in rows
  for (i = 0; i < physicalRowContent.length; i++) {
    currentRow.push(physicalRowContent[i].innerText != '' ? parseInt(physicalRowContent[i].innerText) : 0);
  }
  console.log(currentRow);
  return performSwipe(currentRow, isRtl);
}

function replaceRow(index, rowData) {
  var newRowToBeReplaced = "";

  //construct a set td's
  rowData.forEach(function (elem, index) {
    if(parseInt(elem) == 0)
    {
      elem = '';
    }
    newRowToBeReplaced += "<td>" + elem.toString() + "</td>";
  });
  //replcae the tr
  document.getElementById("row" + index).innerHTML = newRowToBeReplaced;
}

function modifyASingleColumn(index) {
  var columnToModify = index - 1;
  var currentColumn = [];
  //get current column as data set
  for (i = 0; i < 5; i++) {
    //push each element from row 1 to row 5 of current column in a variable
    currentColumn.push(
      document.getElementById("row" + (i + 1)).children[columnToModify]
        .innerText
    );
  }
  console.log(currentColumn);
}

function replaceColumn(index, columnData) {
  debugger;
  var columnToReplace = index - 1;
  //iterate
  for (i = 0; i < 5; i++) {
    //pick current row cells and set inner html of current column with the new column
    document.getElementById("row" + (i + 1)).children[
      columnToReplace
    ].innerHTML = "<td>" + columnData[i] + "</td>";
    console.log("<td>" + columnData[i] + "</td>");
  }
}

function performSwipe(currentArray, isRtl) {
  //if currentArray is [2,0,0,2,4]
  //result array is  [4,4,0,0,0] when isRtl equals true
  //result array is  [0,0,0,4,4] when isRtl is not equals true
  if (isRtl) {
    currentArray = arrangeByZeroesRTL(currentArray);
    for (i = 0; i < 5; i++) {
      if (currentArray[i] > 0 && currentArray[i] > 0 && currentArray[i + 1] > 0 && currentArray[i] == currentArray[i + 1]) {
        currentArray[i] = 2 * currentArray[i];
        currentArray[i + 1] = 0;
      }
      else if (currentArray[i] > 0 && currentArray[i - 1] == 0) {
        currentArray[i - 1] = currentArray[i];
        currentArray[i] = 0;
      }
    }
    currentArray = arrangeByZeroesRTL(currentArray);
  }
  else {
    currentArray = arrangeByZeroesLTR(currentArray);
    for (i = 4; i > -1 ; i--) {
      if (currentArray[i] > 0 && currentArray[i] > 0 && currentArray[i - 1] > 0 && currentArray[i] == currentArray[i - 1]) {
        currentArray[i] = 2 * currentArray[i];
        currentArray[i - 1] = 0;
      }
      else if (currentArray[i] > 0 && currentArray[i + 1] == 0) {
        currentArray[i + 1] = currentArray[i];
        currentArray[i] = 0;
      }
    }
  }
  currentArray = arrangeByZeroesLTR(currentArray);
  console.log(currentArray);
  return currentArray;
}

function swipe(action) {
  debugger;
  //perform swipe
  if (action == "left") {
    //isRtl defines action from Right to left i.e> left swipe
    isRtl = true;
    for (rowStart = 1; rowStart < 6; rowStart++) {
      //calculate for each row and modify each row
      var rowset = modifyASingleRow(rowStart, isRtl); //gets current row data set swipe calculated
      console.log(rowset);
      debugger;
      replaceRow(rowStart, rowset); //replaces current row data set
    }
  } else if (action == "right") {
    isRtl = false;
    for (rowStart = 1; rowStart < 6; rowStart++) {
      //calculate for each row and modify each row
      var rowset = modifyASingleRow(rowStart, isRtl); //gets current row data set swipe calculated
      console.log(rowset);
      replaceRow(rowStart, rowset); //replaces current row data set
    }
  } else if (action == "up") {
  } else if (action == "down") {
  }
}

function arrangeByZeroesRTL(currentArray) {
  for (i = 0; i < 5; i++) {
    if (currentArray[i] == 0 && currentArray.indexOf(0) > -1) {
      // if (currentArray[currentArray.indexOf(0) + 1] > 0) {
      //   var dataToMoved = currentArray[currentArray.indexOf(0) + 1];
      //   currentArray[currentArray.indexOf(0) + 1] = 0;
      //   currentArray[currentArray.indexOf(0)] = dataToMoved;
      // }

      for(j=i; j<5; j++)
      {
        if(currentArray[i] == 0  && currentArray[j] > 0)
        {
          currentArray[i] = currentArray[j];
          currentArray[j] = 0;
        }
      }

    }
  }
  return currentArray;
}

function arrangeByZeroesLTR(currentArray) {
  for (i = 4; i > -1; i--) {
    if (currentArray[i] == 0 && currentArray.indexOf(0) > -1) {
      // if (currentArray[currentArray.indexOf(0) + 1] > 0) {
      //   var dataToMoved = currentArray[currentArray.indexOf(0) + 1];
      //   currentArray[currentArray.indexOf(0) + 1] = 0;
      //   currentArray[currentArray.indexOf(0)] = dataToMoved;
      // }

      for(j=i; j > -1; j--)
      {
        if(currentArray[i] == 0  && currentArray[j] > 0)
        {
          currentArray[i] = currentArray[j];
          currentArray[j] = 0;
        }
      }

    }
  }
  return currentArray;
}



/*
disposed - to be filled in reordering zeroes

else if (currentArray[i] == 0) {
        for (j = i; j < 5; j++) {
          if (currentArray[j] > 0) {
            if (currentArray[i - 1] == currentArray[j]) {
              currentArray[i - 1] = 2 * currentArray[j];
              currentArray[j] = 0;
            }
            else {
              currentArray[i] = currentArray[j];
              currentArray[j] = 0;
            }
            break;
          }
        }
      }

*/