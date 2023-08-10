const storageSheetName = "Storage"

const storageData = {
  sheetName : "Storage",
  messageCell : getStorage().getRange("I3:J5"),
  messageHeaderCell : getStorage().getRange("I2:J2"),
  column : {
    storageList : {
      productID : "A",
      productName : "B",
      unitType : "C"
    }
  },
  cellAddress : {
    summary : {
      totalProductVariant : "B3"
    },
    addProductType : {
      productID : "H2",
      productName : "H3",
      unitType : "H4"
    }

  },
  storageList : {
    startedRow : 8
  }
}

function writeStorageMessage(message){
  storageData.messageCell.setValue(message);
}

function setStorageMessageColor(color){
  storageData.messageCell.setBackground(color);
  storageData.messageHeaderCell.setBackground(color);
}


function getStorage(){
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(storageSheetName);
}

function getTotalVariant(){
  let storage = getStorage();
  return storage.getRange(storageData.cellAddress.summary.totalProductVariant).getValue();
}

function openStorage(){
  writeStorageMessage("!! Welcome !!\nPlease fill up the information about product type before click on add button.Another thing, product id must be unique.");
  setStorageMessageColor(colors.welcome);
}

function storageAddHandler() {
  // get sheet
  const storage = getStorage();


  let productIDCell = storage.getRange(storageData.cellAddress.addProductType.productID);
  let productNameCell = storage.getRange(storageData.cellAddress.addProductType.productName);
  let unitTypeCell = storage.getRange(storageData.cellAddress.addProductType.unitType);
  

  // check data validaty
  let isAllDataValid = true;
  if(productIDCell.getValue().trim() == ''){
    writeStorageMessage("You did not enter product id.");
    isAllDataValid = false;
  }else if(productNameCell.getValue().trim() == ''){
    writeStorageMessage("You did not enter product name.");
    isAllDataValid = false;
  }else if(unitTypeCell.getValue().trim() == ''){
    writeStorageMessage("You did not enter the unit type of product.");
    isAllDataValid = false;
  }
  else if(isProductTypeExist(productIDCell.getValue())){
    writeStorageMessage("This product type already added.");
    isAllDataValid = false;
  }

  // update message box for failure
  if(!isAllDataValid){
    setStorageMessageColor(colors.failure);
    return;
  }

  // update data
  let id = productIDCell.getValue().trim().toUpperCase();
  let name = productNameCell.getValue().trim().toUpperCase();
  let unitType = unitTypeCell.getValue().trim().toUpperCase();

  addProductType(id,name,unitType);

  // reset the all value
  productIDCell.setValue("");
  productNameCell.setValue("");
  unitTypeCell.setValue("count");

  // update message box for success
  writeStorageMessage("Successfully product type added!!");
  setStorageMessageColor(colors.success);

  // add storage product type history
  addStorageProductTypeHistory(id,name,unitType);
}

function storageRemoveHandler(){
  writeStorageMessage("This button not ready to working. It's under developing....");
  setStorageMessageColor(colors.develop)
}

function getAllProductIDs(){
  // get spreadSheet
  let storage = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(storageSheetName);
  let totalVariant = getTotalVariant();
  let row = storageData.storageList.startedRow;
  let col = storageData.column.storageList.productID;

  let productIDs = [];
  for(let i = 0;i < totalVariant;i++){
    let id = storage.getRange(col+row).getValue();
    productIDs.push(id);

    row++;
  }

  return productIDs;
}


function isProductTypeExist(id){
  let allProductIDs = getAllProductIDs();

  if(allProductIDs.indexOf(id.trim().toUpperCase()) == -1){
    return false;
  }

  return true;
}


function addProductType(id,name,type){
  let storage = getStorage();
  let totalVariant = getTotalVariant();
  let tragetedRow = storageData.storageList.startedRow + totalVariant;

  let {
    productID:idCol,
    productName:nameCol,
    unitType:typeCol
  } = storageData.column.storageList;

  let productIDcell = storage.getRange(idCol+tragetedRow);
  let productNameCell = storage.getRange(nameCol+tragetedRow);
  let productUnitTypeCell = storage.getRange(typeCol + tragetedRow);

  productIDcell.setValue(id);
  productNameCell.setValue(name);
  productUnitTypeCell.setValue(type);
}

function getProductByID(id){
  
  id = id.trim().toUpperCase();


}








