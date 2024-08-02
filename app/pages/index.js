// pages/index.js
import { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Container, Typography, Grid } from '@mui/material';
import { db } from '../lib/firebaseConfig';
import Form from '../components/form';
import Search from '../components/Search';

export default function Home() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemList = [];
      querySnapshot.forEach((doc) => {
        itemList.push({ id: doc.id, ...doc.data() });
      });
      setItems(itemList);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSave = () => {
    setSelectedItem(null);
  };

  const handleDelete = () => {
    setSelectedItem(null);
  };

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container>
      <Typography variant="h4">Pantry Management</Typography>
      <Search searchTerm={searchTerm} onSearch={handleSearch} />
      <Form item={selectedItem} onSave={handleSave} onDelete={handleDelete} />
      <Grid container spacing={2}>
        {filteredItems.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <div>{item.name}</div>
            <Button onClick={() => setSelectedItem(item)}>Edit</Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
