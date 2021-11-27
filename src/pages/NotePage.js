import React, { useState, useEffect } from 'react';
// import notes from '../assets/data';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
import { db } from '../firebase-config'
import { collection, doc, getDoc, addDoc ,updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

const NotePage = ({ match, history }) => {
    let noteIdParam = history.location.pathname;
    let noteId = noteIdParam.split('/')[2]
    //let noteId = noteIdParam.split('/')[2];
    let[note, setNote] = useState(null);
    const noteDoc = doc(db, "notes", noteId);



    useEffect(() => {
        getNote();
    }, [noteId]);

    let getNote = async() => {
        const docSnap = await getDoc(noteDoc);
        if (noteId !== 'new') {
            setNote(docSnap.data())            
        } else {
            setNote(({...note, 'body': ''}))
        }
        console.log(docSnap.data())
        }
    

    let createNote = async () => {
        await addDoc(collection(db, "notes"), {
                'body' : note.body.replaceAll('\n', '\\n'),
                'created' : serverTimestamp(),
                'updated' : serverTimestamp()
            });
        history.push('/')
    };

    let updateNote = async () => {
        await updateDoc(noteDoc, {
            'body' : note.body.replaceAll('\n', '\\n'),
            'updated' : serverTimestamp()
        });
    };

    let deleteNote = async () => {
        await deleteDoc(noteDoc);
        /*
        await fetch(`http://localhost:8000/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });*/
        history.push('/');
    };

    let handleSubmit = () => {
        
        if (noteId === 'new') {
            if (note.body !== ''){
                createNote()                
            } else {
                deleteNote()
            }
        } else {
            if (note.body !== '') {
                updateNote()
            } else {
                deleteNote()
            }
        }
        
        history.push('/')
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to={'/'}>
                        <ArrowLeft onClick={handleSubmit}/>
                    </Link>
                </h3>
                {noteId !=='new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ): (
                    <button onClick={handleSubmit}>Done</button>
                )
            }

            </div>
            
            <textarea onChange={(e)=> {setNote({...note, 'body':e.target.value})}}　
            value={note?.body.replaceAll('\\n', '\n')}>
            </textarea>
        </div>
    );
};

export default NotePage;