// ======= Simple API =======

export const getSelectedItems = (selectedItem) => {
  return JSON.parse(sessionStorage.getItem(selectedItem)) || [];
};

export const addNewObject = (selectedItem, newObject) => {
  const itemArray = JSON.parse(sessionStorage.getItem(selectedItem)) || [];
  itemArray.push(newObject);
  sessionStorage.setItem(selectedItem, JSON.stringify(itemArray));
};

export const deleteObject = (selectedItem, objectIdName, objectId) => {
  const updatedItemArray = getSelectedItems(selectedItem).filter(
    (item) => item[objectIdName] !== objectId
  );
  sessionStorage.setItem(selectedItem, JSON.stringify(updatedItemArray));
};

// Handles history managing for back buttons
export const deleteLatestObject = (selectedItem) => {
  const history = JSON.parse(sessionStorage.getItem(selectedItem)) || [];
  const popped = history.pop();
  sessionStorage.setItem(selectedItem, JSON.stringify(history));
  return popped;
};

export const updateObject = (selectedItem, updatedObject, idKey) => {
  const items = JSON.parse(sessionStorage.getItem(selectedItem) || []);

  const updatedItems = items.map((item) =>
    item[idKey] === updatedObject[idKey] ? updatedObject : item
  );

  sessionStorage.setItem(selectedItem, JSON.stringify(updatedItems));
};
