const { Command } = require("commander");
const program = new Command();

const Contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();
      console.table(contacts);
      break;
    case "get":
      const contact = await Contacts.getContactById(id);
      console.log(contact);
      break;
    case "add":
      const addedContact = await Contacts.addContact(name, email, phone);
      console.log(addedContact);
      break;
    case "remove":
      const removedContact = await Contacts.removeContact(id);
      console.log(removedContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

invokeAction(options);
console.table(options);
