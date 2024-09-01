import React, {useState} from 'react';
import style from './Card.module.css';
import FetchImage from '../../specialFunction/FetchImage';
import {Link} from 'react-router-dom';
import ConfirmDeleteModal from './ConfirmDeleteModal';

function Card(props) {
  const {detail, onDelete} = props;
  const {_id, title, author, language, publication, category} = detail;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleDelete = () => {
    onDelete(_id);
    closeModal();
  };

  return (
    <div className={style.admincard}>
      <div className={style.admincardImage}>
        <FetchImage title={title} id={_id} />
      </div>
      <div className={style.cardDetails}>
        <p>Title: <span>{title}</span></p>
        <p>Author: <span>{author}</span></p>
        <p>Category: <span>{category}</span></p>
        <p>Language: <span>{language}</span></p>
        <p>Publication: <span>{publication}</span></p>
      </div>
      <div className={style.actionButtons}>
        <Link to={`/admin/update/${_id}/${title}/${author}`} className={style.updateLink}>
          Update
        </Link>
        <button onClick={openModal} className={style.deleteButton}>
          Delete
        </button>
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={handleDelete}
        bookTitle={title}
      />
    </div>
  );
}

export default Card;
