function getDateStringDMY() {
    const date = new Date();
  
    const d = date.getDate();
    const m = date.getMonth()+1;
    const y = date.getFullYear();
  
  
    const stringDate = `${d < 10 ? '0' +d : d}/${m < 10 ? '0'+m : m}/${y}`;
    return stringDate;
  }
  
  
  function getSheet(sheet){
    return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet);
  }
  
  const colors = {
    success : "#3aa052ff",
    welcome : "#46bdc6",
    failure : "#ea4335",
    develop : "#ff6d01"
  }