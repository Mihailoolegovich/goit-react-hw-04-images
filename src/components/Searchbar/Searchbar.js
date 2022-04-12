import propTypes from 'prop-types';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Searchbar.css';

export default function Searchbar({ onSubmit }) {
  const [dataInput, setDataInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (dataInput.trim() === '') {
      return toast.error('Error: No query entered');
    }
    onSubmit(dataInput);
    setDataInput('');
  }

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button-form">
          <span className="button-form__label">Search</span>
        </button>
        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          value={dataInput}
          placeholder="Search images and photos"
          onChange={e => setDataInput(e.currentTarget.value.toLowerCase())}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: propTypes.func,
};
