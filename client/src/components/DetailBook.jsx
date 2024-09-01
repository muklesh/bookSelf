import React, {useEffect, useState} from 'react';
import style from '../Private/css/DetailBook.module.css';
import {authToken, urlbook, urlFavourite} from '../Appurl';
import Loader from '../loader/Loader';
import Review from './Review';
import Footer from './Footer/Footer';
import Corousel from './Corousel/Corousel';
import {useLocation} from 'react-router-dom';
import FetchImage from '../specialFunction/FetchImage';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function DetailBook() {
  const location = useLocation();
  let url = location.pathname;
  url = url.replace(/%20/g, ' ');
  let arrdata = url.split('/');
  let bookid = arrdata[2];
  let booktitle = arrdata[3];
  let bookauthor = arrdata[4];
  const [category, updatecategory] = useState('');
  const [language, updatelanuage] = useState('');
  const [publication, updatepublication] = useState('');
  const [IsLoading, updateLoading] = useState(false);
  // console.log(url);
  // console.log(bookid);
  // console.log(booktitle);
  // console.log(bookauthor);

  const fetchBookDetail = async () => {
    url = location.pathname;
    url = url.replace(/%20/g, ' ');
    arrdata = url.split('/');
    bookid = arrdata[2];
    booktitle = arrdata[3];
    bookauthor = arrdata[4];
    updateLoading(true);
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
        // console.log(res);
          if (res.status === 0) {
            updatelanuage(res.data.language);
            updatecategory(res.data.category);
            updatepublication(res.data.publication);
          } else {
            toast.error('Unable to fetch detail');
          }
        })
        .catch((err) => {
          toast.error('Unable to fetch detail');
        });
    updateLoading(false);
  };


  const addFavourite = ()=>{
    fetch(`${urlFavourite}/add`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth_token': `${authToken}`,
      },
      body: JSON.stringify({
        bookid: bookid,
        bookname: booktitle,
        author: bookauthor,
      }),
    })
        .then((res)=>res.json())
        .then((res)=>{
          if (res.status===0) {
            toast.success('Book has been added to your favorite list');
          } else if (res.status===1) {
            toast.error('Book is already on your favorite list');
          } else {
            toast.error('Unable to add this book to your favorite list');
          }
        })
        .catch((err)=>{
          toast.error('Unable to add this book to your favorite list');
        });
  };

  // const getimage = ()=>{
  //     let html = <FetchImage title={booktitle} id={bookid}/>;
  //     console.log(html);
  // }

  useEffect(() => {
    fetchBookDetail();
    // getimage();
  }, [location]);

  return (
    <div className={style.container}>
      {IsLoading ? (
          <Loader />
          ) : (
          <div className={style.bookDetail}>
            {/* Left Side: Book Image and Details */}
            <div className={style.leftColumn}>
              <div className={style.bookImageContainer}>
                <FetchImage title={booktitle} id={bookid} />
              </div>
              <div className={style.bookData}>
                <h1 className={style.bookTitle}>{booktitle}</h1>
              </div>
              <div className={style.bookData}>
                <h2 className={style.bookAuthor}>Author: <span>{bookauthor}</span></h2>
                <h3 className={style.bookCategory}>Category: <span>{category}</span></h3>
              </div>
              <div className={style.bookData}>
                <h3 className={style.bookLanguage}>Language: <span>{language}</span></h3>
                <h4 className={style.bookPublication}>Published by: <span>{publication}</span></h4>
              </div>
              <button className={style.favouriteButton} type='button' onClick={addFavourite}>
                Add to Favourites
              </button>
            </div>
            <div className={style.rightColumn}>
              <Review bookid={bookid} bookname={booktitle} />
            </div>
          </div>
        )}
      {!IsLoading && (
        <Corousel type={category.length === 0 ? 'All' : category} delay='3200' />
      )}
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default DetailBook;
