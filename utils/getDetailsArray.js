export default function getDetailsArray(table) {
  let details = [];
  let arrayOfDetails = [];

  for (let i = 1; i < table.current.rows.length; i++) {
    const objCells = table.current.rows.item(i).cells;

    for (let j = 0; j < objCells.length; j++) {
      details.push(objCells.item(j).innerHTML);
    }
  }

  const arrLength = details.length / 2;

  for (let m = 0; m < arrLength; m++) {
    const arr1 = details.splice(0, 2);
    arrayOfDetails.push(arr1);
  }

  return arrayOfDetails;
}
