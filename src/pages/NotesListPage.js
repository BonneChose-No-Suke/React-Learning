import React, { useState, useEffect } from 'react';
import notes from '../assets/data';
import ListItem from '../Components/ListItem';
import AddButton from '../Components/AddButton';
import { db,colRef } from '../firebase-config';
import { query, orderBy, getDocs} from 'firebase/firestore';

const NotesListPage = () => {
    let [notes, setNotes] = useState([]);
    
    useEffect(() => {
        getNotes();
    }, []);

    let getNotes = async () => {
            const data = await getDocs(query(colRef, orderBy('updated', 'desc')));
            setNotes(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            
    }

    return (
        <div className='notes'>
            <div className='notes-header'>
                <h2 className='notes-title'>&#9782; Notes</h2>
                <p className='notes-count'>{notes.length}</p>
            </div>
            <div className="notes-list">
                {notes.map((note, id) => (
                    <ListItem key={id} note={note} />
                ))}
            </div>
            <AddButton />
        </div>
    );
};

export default NotesListPage;