import { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Container } from './ContactForm/ContactForm.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    if (this.checkContact(name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = { id: nanoid(), name, number };

    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
  };

  checkContact = name => {
    return this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilterChange = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const filteredContacts = this.filterContacts();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter
          filterValue={this.state.filter}
          onChangeFilter={this.handleFilterChange}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
  addContact: PropTypes.func,
  checkContact: PropTypes.func,
  deleteContact: PropTypes.func,
  handleFilterChange: PropTypes.func,
  filterContacts: PropTypes.func,
};
