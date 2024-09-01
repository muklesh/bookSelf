import React, {useEffect, useState} from 'react';
import Card from './Card';
import {urlbook, authToken} from '../../Appurl';
import {toast, ToastContainer} from 'react-toastify';

function Books() {
  const handleDelete = (id) => {
    console.log(id);
    fetch(`${urlbook}/deletebook`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth_token': `${authToken}`,
      },
      body: JSON.stringify({id}),
    }).then((res) => res.json()).then((res) => {
      console.log(res);
      if (res.status === 0) {
        toast.success('Book deleted successfully');
        fetchBooks(); // Refresh the list of books
      } else {
        toast.error('Failed to delete book');
      }
    }).catch(() => {
      toast.error('Failed to delete book');
    });
  };
  const cardStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: '20px',
  };
  const [type, updateType] = useState('All');
  const [booksData, updateBookData] = useState({
    load: false,
    data: [],
  });

  const fetchBooks = () => {
    fetch(`${urlbook}/bookcategory/${type}`, {
      method: 'GET',
      headers: {'content-type': 'application/json'},
    })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 0) {
            updateBookData({
              ...booksData,
              load: true,
              data: res.bookdata,
            });
          } else {
            toast.error('Server Error', 'Unable to fetch detail');
          }
        })
        .catch(() => {
          toast.error('Server Error', 'Unable to fetch detail');
        });
  };

  useEffect(() => {
    const func = setTimeout(() => {
      fetchBooks();
    }, 500);
    return () => {
      func;
    };
  }, [type]);

  return (
    <div style={{width: '95%', margin: '20px auto', textAlign: 'center'}}>
      <h3 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px'}}>
        Books
      </h3>
      <div style={{width: '100%', maxWidth: '500px', margin: '0 auto'}}>
        <select
          id="category"
          name="category"
          style={{
            width: '100%',
            height: '45px',
            fontSize: '16px',
            padding: '0 15px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            outline: 'none'}}
          onChange={(e) => updateType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Novel">Novel</option>
          <option value="Story">Story</option>
        </select>
      </div>
      <div style={cardStyle}>
        {booksData.load ? (
          booksData.data.length === 0 ? (
            <div>No books available in this category</div>
          ) : (
            booksData.data.map((e) => (
              <Card
                key={e._id}
                detail={e}
                onDelete={handleDelete}
              />
            ))
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Books;
