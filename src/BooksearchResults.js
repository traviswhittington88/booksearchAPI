import React from 'react';
import './BooksearchResults.css';


class BooksearchResults extends React.Component {
  constructor(props) {
    super(props)
  }
  
    render() {
      console.log(this.props.results)
    
      const items = this.props.results.map((item,idx) => {
        return <li key={idx} className='search-result'>
                  <div className='book-header'>
                  <h1>{item.title}</h1>
                  <p>{item.authors}</p>
                  </div>
                  <div className='content'>
                  <img className='book-image' src={item.imageLinks.thumbnail}/>
                    <h4>Description</h4>
                  { item.description
                    ? <p>{item.description}</p>
                    : <p>Sorry, no description is available at this time</p>
                  }
                  

                  
                  </div>
                </li>
      })
        return (
            <section>
              <ul>
                {items}
              </ul>
             </section>
        )
    }
  }



export default BooksearchResults;