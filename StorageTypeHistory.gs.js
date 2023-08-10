const StorageProductTypeHistoryData = {
    startedRow : 2,
    dateColumn : "A",
    productIDColumn :"B",
    productNameColoumn : "C",
    unitTypeColumn : "D",
    statusColumn : "E",
    sheetName : "StorageProductTypeHistory",
    totalHistoryCellAddress : "Q2"
  }
  
  
  
  function getStorageProductTypeHistorySheet(){
    return getSheet(StorageProductTypeHistoryData.sheetName);
  }
  
  function testRun(){
    addStorageProductTypeHistory('dafl','ldafj','dd');
  }
  
  
  function addStorageProductTypeHistory(id,name,unitType) {
    let {
      startedRow,
      dateColumn,
      productIDColumn:idColumn,
      productNameColoumn : nameColumn,
      unitTypeColumn : typeColumn,
      statusColumn,
      totalHistoryCellAddress
    } = StorageProductTypeHistoryData;
  
  
  
    const history = getStorageProductTypeHistorySheet();
  
    const totalHistory = history.getRange(totalHistoryCellAddress).getValue();
    const targetedRow = startedRow+totalHistory;
    
    const dateCell = history.getRange(dateColumn+targetedRow);
    const productIDCell = history.getRange(idColumn+targetedRow);
    const nameCell = history.getRange(nameColumn+targetedRow)
    const unitTypeCell = history.getRange(typeColumn+targetedRow);
    const statusCell = history.getRange(statusColumn+targetedRow);
  
    dateCell.setValue(getDateStringDMY());
    productIDCell.setValue(id);
    nameCell.setValue(name);
    unitTypeCell.setValue(unitType);
    statusCell.setValue("Added");
  }
  
  
  
  
  
  
  
  
  