import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {urlbook} from '../../../Appurl';
import FetchImage from '../../../specialFunction/FetchImage';
import style from './UpdateBook.module.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateBook() {
  const location = useLocation();
  const [bookInfo, updateBookInfo] = useState({
    language: '',
    publication: '',
    category: '',
  });
  let url = location.pathname;
  url = url.replace(/%20/g, ' ');
  let arrdata = url.split('/');
  let bookid = arrdata[3];
  let booktitle = arrdata[4];
  let bookauthor = arrdata[5];

  const fetchBookDetail = async () => {
    url = location.pathname;
    url = url.replace(/%20/g, ' ');
    arrdata = url.split('/');
    bookid = arrdata[3];
    booktitle = arrdata[4];
    bookauthor = arrdata[5];
    await fetch(`${urlbook}/onebook/id`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        id: bookid,
        title: booktitle,
        author: bookauthor,
      }),
    })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 0) {
            updateBookInfo({
              ...bookInfo,
              language: res.data.language,
              category: res.data.category,
              publication: res.data.publication,
            });
          } else {
            toast.error('Server Error', 'Unable to fetch detail');
          }
        })
        .catch((err) => {
          toast.error('Server Error', 'Unable to fetch detail');
        });
  };

  const updateBookImage = (event)=>{
    event.preventDefault();
    fetch(event.target.action, {
      method: 'POST',
      headers: {
        id: bookid,
        title: booktitle,
        auth_token: `${localStorage.getItem('adminToken')}`,
      },
      body: new FormData(event.target),
    })
        .then((resp) => {
          return resp.json();
        })
        .then((body) => {
          if (body.status===0) {
            toast.success('Book Update successfully');
            window.location.reload();
          } else if (res.status === -10) {
            localStorage.removeItem('adminToken');
            window.location.reload();
          } else {
            toast.error('upable to update book');
          }
        })
        .catch((error) => {
          toast.error('upable to update book');
        });
  };

  const updateDataBook = (e)=>{
    updateBookInfo({
      ...bookInfo,
      [e.target.name]: e.target.value,
    });
  };
  const backPage = ()=>{
    window.location.href = '/admin/books';
  };
  const sendUpdateDataBook = ()=>{
    fetch(`${urlbook}/update/data`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'id': bookid,
        'auth_token': `${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify(bookInfo),
    })
        .then((res)=>res.json())
        .then((res)=>{
          if (res.status===0) {
            toast.success('Data Updated');
          } else if (res.status === -10) {
            localStorage.removeItem('adminToken');
            window.location.reload();
          } else {
            toast.error('upable to update');
          }
        })
        .catch((err)=>{
          toast.error('upable to update');
        });
  };

  useEffect(() => {
    return () => {
      fetchBookDetail();
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <div style={{textAlign: 'center', color: '#333', marginBottom: '20px'}}>
        <h3>Update Book Details</h3>
      </div>
      <div className={style.UpdateBook}>
        <div className={style.ImageUpdate}>
          <div className={style.UpdatebookImage}>
            <FetchImage title={booktitle} id={bookid} />
          </div>
          <div>
            <form id="form" action={`${urlbook}/update/image`}method="post"
              onSubmit={(e) => updateBookImage(e)}
              encType="multipart/form-data">
              <div>
                <label htmlFor="img">Image</label>
                <input type="file" id="img" name="img" />
              </div>
              <div>
                <input style={{background: '#fff', border: '1px solid #007bff', borderRadius: '4px', cursor: 'pointer'}} type="submit" value="Change" />
              </div>
            </form>
          </div>
        </div>
        <div className={style.DataUpdate}>
          <div>
              Title : <span>{booktitle}</span>
          </div>
          <div>
              Author : <span>{bookauthor}</span>
          </div>
          <div>
              Language : <input type="text" name="language" value={bookInfo.language} onChange={(e) => updateDataBook(e)}/>
          </div>
          <div>
              Category : <select id="category" name="category" onChange={(e) => updateDataBook(e)}>
              <option value={bookInfo.category}>{bookInfo.category}</option>
              <option value="Novel">Novel</option>
              <option value="Story">Story</option>
            </select>
          </div>
          <div>
              Publication : <input type="text" name="publication" value={bookInfo.publication} onChange={(e) => updateDataBook(e)}/>
          </div>
          <div style={{display: 'flex', gap: '10px'}}>
            <button onClick={sendUpdateDataBook}>Update</button>
            <button onClick={backPage}>Back to Book List</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateBook;
