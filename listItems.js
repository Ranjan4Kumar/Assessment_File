import React, { useEffect, useState } from "react";

const ListItems = () => {
  const [listItems, setListItems] = useState([]);
  const [uniqueID, setUniqueId] = useState(1);
  const [addItem, setAddItem] = useState({ name: '', description: '' });
  const [editValue, setEditValue] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchedList, setSearchedList] = useState([]);

  useEffect(() => {
    let searchedData = listItems.filter((value) => {
      return value.name === searchValue;
    });
    setSearchedList([...searchedData]);
  }, [searchValue]);

  useEffect(() => {
    setAddItem({ name: '', description: '' });
  }, [listItems]);

  const handleAddItem = (e) => {
    let { value, name } = e.target;
    setAddItem({
      ...addItem,
      [name]: value,
    });
  };

  const handleAddItemToList = () => {
    if (addItem.name !== '' && addItem.description !== '') {
      setListItems([...listItems, { id: uniqueID, ...addItem }]);
      setUniqueId(uniqueID + 1);
    }
  };

  const handleDelete = (id) => {
    let array = listItems.filter((value) => {
      return value.id !== id;
    });

    setListItems([...array]);
  };

  const handleEdit = (value, index) => {
    setEditValue({ ...value });
    setEditingIndex(index);
  };

  const handleEditValues = (e) => {
    let { value, name } = e.target;
    setEditValue({
      ...editValue,
      [name]: value,
    });
  };

  const handleSave = () => {
    let newArray = listItems.map((value) => {
      if (value.id === editValue.id) {
        return {
          ...editValue,
        };
      } else {
        return value;
      }
    });

    setListItems([...newArray]);
    setEditingIndex(null);
  };

  const handleSearch = () => {
    let searchedData = listItems.filter((value) => {
      return value.name === searchValue;
    });
    setSearchedList([...searchedData]);
  };

  return (
    <>
      {listItems.length > 0 && (
        <>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={() => setSearchValue('')}>Clear</button>
        </>
      )}
      {searchValue.length > 0 &&
        searchedList.length === 0 && (
          <p>No results found. Clear to see all items</p>
        )}
      {(searchValue.length > 0 ? searchedList : listItems).map(
        (value, index) => {
          return (
            <div
              key={value.id}
              style={{
                border: '1px solid black',
                borderRadius: '8px',
                padding: '5px',
                background: editingIndex === index ? '#0000FF' : 'green', // Highlight the item being edited
              }}
            >
              <h3>{value.name}</h3>
              <h6>{value.description}</h6>
              <button onClick={() => handleEdit(value, index)}>Edit</button>
              <button onClick={() => handleDelete(value.id)}>Delete</button>
              <div>
                {editingIndex === index && (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={editValue.name}
                      onChange={handleEditValues}
                    />
                    <input
                      type="text"
                      name="description"
                      value={editValue.description}
                      onChange={handleEditValues}
                    />
                    <button onClick={handleSave}>Save</button>
                  </>
                )}
              </div>
            </div>
          );
        }
      )}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <h3>Add Item</h3>
        <input
          type="text"
          name="name"
          value={addItem.name}
          onChange={handleAddItem}
          style={{ margin: '1vw 0vw' }}
        /><br />
        <input
          type="text"
          name="description"
          value={addItem.description}
          onChange={handleAddItem}
          style={{ margin: '1vw 0vw' }}
        /><br />
        <button onClick={handleAddItemToList}>Add Item</button>
      </div>
    </>
  );
};

export default ListItems;
