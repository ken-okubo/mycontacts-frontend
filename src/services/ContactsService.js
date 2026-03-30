import HttpClient from "./utils/HttpClient";

class ContactsService {
  async listContacts(orderBy = "asc") {
    return HttpClient.get(`http://localhost:3001/contacts?orderBy=${orderBy}`);
  }
}

const contactsService = new ContactsService();

export default contactsService;
