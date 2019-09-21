import React from 'react';
import './BooksearchApp.css';
import BooksearchForm from './BooksearchForm';


export default class BooksearchApp extends React.Component {
    render() {
        return (
          <>
            <div className='header'>
                <h1>Google Book Search</h1>
            </div>
                <BooksearchForm/>
          </>
        )
    }
    componentDidMount() {
     
      
      }
    }

