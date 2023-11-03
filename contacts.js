const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function readContacts() {
  try {
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
}

function writeContacts(contacts) {
  try {
    return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  } catch (error) {
    console.error(error);
  }
}

async function listContacts() {
  try {
    const contacts = await readContacts();
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await readContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await readContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    const newContacts = [
      ...contacts.slice(0, index),
      ...contacts.slice(index + 1),
    ];
    await writeContacts(newContacts);
    return contacts[index];
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await readContacts();
    const newBook = { name, email, phone, id: crypto.randomUUID() };
    contacts.push(newBook);
    await writeContacts(contacts);
    return newBook;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
