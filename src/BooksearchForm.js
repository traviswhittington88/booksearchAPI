import React, { Component } from 'react';
import BooksearchResults from './BooksearchResults';
import './BooksearchForm.css';
import { tsImportEqualsDeclaration } from '@babel/types';


class BooksearchForm extends Component {
  static defaultProps = {
      maxResults: 5
  };
  constructor(props) {
    super(props)
    this.state = {
       searchTerm: '',
        printType: 'all',
        bookType: 'free-ebooks',
        error:'',
        ready: false,
        data: null,
        title: '',
        authors: '',
        description: ''

};
}
handleSearchTerm(searchTerm) {
this.setState({
searchTerm
});
}
handlePrintType(printType) {
this.setState({
  printType
})
}
handleBookType(bookType) {
this.setState({
  bookType
})
}
handleSubmit(e) {
  const { searchTerm, printType, bookType } = this.state
  const { maxResults } = this.props
  e.preventDefault()
  const options = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer AIzaSyChgZjgvbSHgBtyUNvFYECiZOrJTv9ftY8"
    }
  };
  this.setState({
    ready:true
  })
const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&printType=${printType}&filter=${bookType}&maxResults=${maxResults}`
  fetch(url)
  .then(res => { if(!res.ok) {
    throw new Error(res.statusText)
  }
    return res.json()
  })
  .then(data => {
    console.log('this is data', data)
    console.log('this is data.items',data.items)
    const arr = data.items.map(item =>
         item.volumeInfo) 
         console.log('arr is now', arr)
    this.setState({
      data: arr
    })
  })
  .catch(err => this.setState({
      error: err.message
  })
  )}
    render() {
        const error = this.state.error
              ?  <div className='error'>{this.state.error}</div>
              :  '';
        const results = this.state.data 
            ? <BooksearchResults results={this.state.data} />
            : '';
        return (
            <div>
                <form className='booksearch-form'
                  onSubmit={e => this.handleSubmit(e)}
                  >
                    <div className='searchbar'>
                    <label htmlFor='search'>Search:</label>
                    <input
                      type='text'
                      name='search'
                      id='search'
                      required
                      onChange={e => this.handleSearchTerm(e.target.value)}
                    >
                    </input>
                    <button type='submit'>Search</button>
                    </div>
                    <div className='search-filters'>
                    <label htmlFor='Print Type'>Print Type:</label>
                    <input
                      type='number'
                      name='Print Type'
                      id='printType'
                      placeholder='All'
                      onChange={e => this.handlePrintType(e.target.value)}
                      >
                      </input>
                    <label htmlFor='Book Type'>Book Type:</label>
                    <input
                      type='number'
                      name='Book Type'
                      id='printType'
                      placeholder='No Filter'
                      onChange={e => this.handleBookType(e.target.value)}
                      >
                      </input>
                    </div>
                </form>
                <section className='results'>
                  { results }
                </section>
            </div>
            
        )
    }
}

export default BooksearchForm;