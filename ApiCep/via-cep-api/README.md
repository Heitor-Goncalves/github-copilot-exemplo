# Via CEP API

This project is a simple Node.js API that fetches address data from the ViaCEP service based on a provided Brazilian postal code (CEP). It is designed for easy consumption by developers.

## Features

- Fetch address information using a CEP.
- Returns data in JSON format.
- Simple and intuitive API endpoints.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd via-cep-api
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the Application

To start the application, run the following command:

```
npm start
```

The API will be available at `http://localhost:3000`.

### API Endpoint

- **GET /cep/:cep**: Fetch address information for the provided CEP.

  **Example Request:**

  ```
  GET http://localhost:3000/cep/01001-000
  ```

  **Example Response:**

  ```json
  {
      "cep": "01001-000",
      "logradouro": "Praça da Sé",
      "complemento": "lado ímpar",
      "bairro": "Sé",
      "localidade": "São Paulo",
      "uf": "SP",
      "ibge": "3550308",
      "gia": "1004",
      "ddd": "11",
      "siafi": "7087"
  }
  ```

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.