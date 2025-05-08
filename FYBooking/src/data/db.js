// ======= Simple API =======

export const getSelectedItems = (selectedItem) => {
  return JSON.parse(sessionStorage.getItem(selectedItem)) || [];
}

export const addNewObject = (selectedItem, newObject) => {
  const itemArray = JSON.parse(sessionStorage.getItem(selectedItem)) || [];
  itemArray.push(newObject);
  sessionStorage.setItem(selectedItem, JSON.stringify(itemArray))
}

export const deleteObject = (selectedItem, objectIdName, objectId) => {
  const updatedItemArray = getSelectedItems(selectedItem).filter((item) => item[objectIdName] !== objectId);
  sessionStorage.setItem(selectedItem, JSON.stringify(updatedItemArray))
}