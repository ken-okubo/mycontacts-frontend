import HttpClient from "./utils/HttpClient";

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient("http://localhost:3001");
  }

  async listCategories() {
    return this.httpClient.get(`/categories`);
  }

  async createContact(formData) {
    return this.httpClient.post(`/contacts`, formData);
  }
}

const categoriesService = new CategoriesService();

export default categoriesService;
