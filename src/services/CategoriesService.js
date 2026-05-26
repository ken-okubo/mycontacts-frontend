import CategoryMapper from "./mappers/CategoryMapper";
import HttpClient from "./utils/HttpClient";

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient("http://localhost:3001");
  }

  async listCategories() {
    const persistenceCategories = await this.httpClient.get(`/categories`);
    return persistenceCategories.map(CategoryMapper.toDomain);
  }
}

const categoriesService = new CategoriesService();

export default categoriesService;
