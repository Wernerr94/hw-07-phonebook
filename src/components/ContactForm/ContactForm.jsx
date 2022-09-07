import React, { useState } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { useAddContactMutation } from 'servises/contacts';
import { useGetAllContactsQuery } from 'servises/contacts';
// import { useDispatch, useSelector } from 'react-redux';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const id = nanoid();
  const [updateContact] = useAddContactMutation();
  const { data } = useGetAllContactsQuery();
  const reset = () => {
    setName('');
    setNumber('');
  };
  const handleChange = e => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
    if (e.target.name === 'number') {
      setNumber(e.target.value);
    }
  };
  const submitHandler = e => {
    e.preventDefault();
    let newContact = data?.find(item => item.name === name);
    if (newContact) {
      alert(`${name} is already in contacts.`);
      return;
    } else {
      updateContact({ id, name, number });
    }
    reset();
  };
  return (
    <>
      <form onSubmit={submitHandler} className={css.form}>
        <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
            value={name}
          />
        </label>
        <label>
          <span>Number</span>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            value={number}
          />
        </label>
        <button type="submit" className={css.submit}>
          Add Contact
        </button>
      </form>
    </>
  );
}
