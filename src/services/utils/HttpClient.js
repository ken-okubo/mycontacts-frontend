import APIError from "../../errors/APIError";
import delay from "../../utils/delay";
class HttpClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    await delay(500);

    const response = await fetch(`${this.baseUrl}${path}`);

    const contentType = response.headers.get("Content-Type");

    let body;
    if (contentType && contentType.includes("application/json")) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(response, body);
    // não usa return aqui porque o throw já interrompe a execução da função, ou seja, o código abaixo do throw não será executado.
    // O throw é usado para lançar um erro e interromper a execução normal do código, enquanto o return é usado para retornar um valor e encerrar a função normalmente.
  }

  async post(path, body) {
    await delay(500);

    const headers = new Headers({
      "Content-Type": "application/json",
    });

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });

    const contentType = response.headers.get("Content-Type");

    let responseBody;
    if (contentType && contentType.includes("application/json")) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
