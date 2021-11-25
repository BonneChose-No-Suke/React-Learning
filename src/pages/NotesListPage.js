import React, { useState, useEffect } from 'react';
import notes from '../assets/data';
import ListItem from '../Components/ListItem';
import AddButton from '../Components/AddButton';
import { db } from '../firebase-config';
import { collection, getDocs} from 'firebase/firestore';

const NotesListPage = () => {
    let [notes, setNotes] = useState([]);
    const notesCollectionRef = collection(db, "notes")
    
    useEffect(() => {
        getNotes();
    }, []);

    let getNotes = async () => {
            const data = await getDocs(notesCollectionRef);
            console.log(data);
        //setNotes(data);
    }

    return (
        <div className='notes'>
            <div className='notes-header'>
                <h2 className='notes-title'>&#9782; Notes</h2>
                <p className='notes-count'>{notes.length}</p>
            </div>
            <div className="notes-list">
                {notes.map((note, index) => (
                    <ListItem key={index} note={note} />
                ))}
            </div>
            <AddButton />
        </div>
    );
};

export default NotesListPage;