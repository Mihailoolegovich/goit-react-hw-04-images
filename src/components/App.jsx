import React, { useEffect, useState } from 'react';
import apiService from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Loader from './Loader';
import Button from './Button';

export default function App() {
  const [searchName, setSearchName] = useState(null);

  const [dataImage, setDataImage] = useState([]);
  const [dataModal, setDataModal] = useState([]);

  const [totalHits, setTotalHits] = useState(null);
  const [perPage, setPerPage] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!searchName) {
      return;
    }
    setLoader(true);

    apiService(searchName, pageNum)
      .then(el => {
        if (el.totalHits === 0) {
          return toast.error(`Error: Not find ${searchName}`);
        }

        const images = el.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => {
            return { id, webformatURL, largeImageURL, tags };
          }
        );

        setTotalHits(el.totalHits);

        if (pageNum === 1) {
          toast.success(`Query "${searchName}" found ${el.totalHits} image`);

          return setDataImage(images);
        }

        setDataImage(dataImage => [...dataImage, ...images]);
      })

      .catch(error => {
        toast.error(`${error}`);
      })

      .finally(() => {
        setLoader(false);
      });
  }, [searchName, pageNum]);

  useEffect(() => {
    setPerPage(dataImage.length);

    if (totalHits === perPage) {
      toast.warn(`Found all photos with the name ${searchName}`);
    }
  }, [totalHits, dataImage, perPage, searchName]);

  function incrementPageNum() {
    setPageNum(pageNum + 1);
  }

  function toggleModal() {
    setOpenModal(!openModal);
  }

  function addDataFromModal(id) {
    setDataModal(dataImage.find(el => el.id === id));
    toggleModal();
  }

  function submitForm(el) {
    setSearchName(el);
    resetState();
  }

  function resetState() {
    setTotalHits([]);
    setDataImage([]);
    setPerPage(0);
    setPageNum(1);
  }

  return (
    <div className="app">
      <Searchbar onSubmit={submitForm} />
      <ImageGallery dataImage={dataImage} addDataFromModal={addDataFromModal} />
      {openModal && (
        <Modal activeModal={toggleModal}>
          <img
            key={dataModal.id}
            src={dataModal.largeImageURL}
            alt={dataModal.tags}
          />
        </Modal>
      )}
      {loader && <Loader />}
      {totalHits > 0 && totalHits > perPage ? (
        <Button onClick={incrementPageNum} />
      ) : null}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
