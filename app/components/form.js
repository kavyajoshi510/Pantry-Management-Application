// components/Form.js
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

const Form = ({ item, onSave, onDelete }) => {
  const [name, setName] = useState(item ? item.name : '');

  const handleSave = async () => {
    if (item) {
      const itemRef = doc(db, 'items', item.id);
      await updateDoc(itemRef, { name });
      onSave();
    } else {
      await addDoc(collection(db, 'items'), { name });
      onSave();
    }
  };

  const handleDelete = async () => {
    if (item) {
      const itemRef = doc(db, 'items', item.id);
      await deleteDoc(itemRef);
      onDelete();
    }
  };

  return (
    <div>
      <TextField
        label="Item Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={handleSave} variant="contained">Save</Button>
      {item && <Button onClick={handleDelete} variant="outlined">Delete</Button>}
    </div>
  );
};

export default Form;
