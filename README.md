# Seznam Shopping List

## About The Project

Shopping list, part of technical task for Seznam interview

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* Typescript
* React
* Node.js
* Express.js
* MongoDB + Mongoose

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Installed Docker and Node.js

* npm
  ```sh
  npm install npm@latest -g
  ```
* pull MongoDB docker
  ```sh
  docker pull mongo:latest
  ```
  
* docker + MongoDB
  ```sh
  docker run -d --name mongodb -p 27017:27017 -v mongodata:/data/db mongo:latest
  ```
  
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/VanDeny/SEZNAM_shopping_list.git
   ```
2. Install NPM dependencies for both backend and frontend
   ```sh
   ../frontend $ npm install
   ```
   ```sh
   ../backend/db $ npm install
   ```
   ```sh
   ../backend/rest $ npm install
   ```
3. Run backend
      ```sh
        npm run backend:run
      ```
4. Run frontend
      ```sh
        npm run frontend:start
      ```
5. Enjoy the app

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## What would be added next

1. Testing
2. Some form of authentication(Keycloak probably)
3. Drag and drop(react-dnd)
4. Item whisperer
5. Improve styling
