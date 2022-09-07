import React from 'react';
import css from './ContactList.module.css';
import {
  useGetAllContactsQuery,
  useRemoveContactMutation,
} from 'servises/contacts';
import { useSelector } from 'react-redux';

export default function ContactList() {
  const { currentData, isFetching } = useGetAllContactsQuery();
  const [removeContact, { isLoading: isDeliting }] = useRemoveContactMutation(
    {}
  );

  const filter = useSelector(state => state.phonebook.filter);

  const filterContacts = () => {
    return currentData?.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const contactsArr = filterContacts();

  const handleRemove = id => {
    removeContact(id);
  };
  return (
    //
    <>
      {isFetching && <div>...Loading</div>}

      <ul className={css.contactsList}>
        {contactsArr?.length > 0 &&
          contactsArr.map(contact => {
            return (
              <li key={contact.id} className={css.contact}>
                {contact.name}: {contact.phone}
                <button
                  className={css.deleteButton}
                  onClick={() => handleRemove(contact.id)}
                  disabled={isDeliting}
                >
                  Delete
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
}
