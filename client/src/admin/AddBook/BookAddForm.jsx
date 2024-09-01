import React from 'react';
import {urlbook} from '../../Appurl';
import style from './BookAddForm.module.css';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BookAddForm() {
  const submitbook = (event) => {
    event.preventDefault();
    fetch(event.target.action, {
      method: 'POST',
      headers: {'auth_token': `${localStorage.getItem('adminToken')}`},
      body: new FormData(event.target),
    })
        .then((resp) => {
          return resp.json();
        })
        .then((body) => {
          if (body.status===0) {
            toast.success('Book added successfully');
            window.location.href = '/admin/books';
          } else if (res.status === -10) {
            localStorage.removeItem('adminToken');
            window.location.reload();
          } else {
            toast.error('Unable to add book');
          }
        })
        .catch((error) => {
          toast.error('Unable to add book');
        });
  };

  return (
    <div className={style.container}>
      <h4 className={style.title}>Add New Book</h4>
      <form
        action={`${urlbook}/addbook`}
        method="post"
        onSubmit={(e) => submitbook(e)}
        encType="multipart/form-data"
        className={style.form}
      >
        <div className={style.formGroup}>
          <label htmlFor="title" className={style.label}>Title</label>
          <input type="text" id="title" name="title" placeholder="Title" className={style.input} />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="author" className={style.label}>Author Name</label>
          <input type="text" id="author" name="author" placeholder="Author Name" className={style.input} />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="language" className={style.label}>Language</label>
          <input type="text" id="language" name="language" placeholder="Language" className={style.input} />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="publication" className={style.label}>Publication</label>
          <input type="text" id="publication" name="publication" placeholder="Publication" className={style.input} />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="category" className={style.label}>Category</label>
          <select id="category" name="category" className={style.select}>
            <option value="">Select</option>
            <option value="Novel">Novel</option>
            <option value="Story">Story</option>
          </select>
        </div>
        <div className={style.formGroup}>
          <label htmlFor="img" className={style.label}>Image</label>
          <input type="file" id="img" name="img" required className={style.fileInput} />
        </div>
        <div className={style.formGroup}>
          <button type="submit" className={style.submitButton}>Submit</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default BookAddForm;
