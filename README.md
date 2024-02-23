<div align=center>

<h1>DNA News</h1>

**DNA News** is a web application that provides news from around the world

![DNA News Preview](/src/assets/preview.png)

</div>

## Table of Contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction

**DNA News** is a web application that provides news from around the world. It fetches news data from the **[NewsAPI]** service. Users can browse through a list of news articles, search for specific articles, and keep track of articles they have read or clicked on. The website is built using [**Vite + React.js**][vite] and leverages local storage for storing the user's reading history.

## Demo

- **[Presentation]**
- **[Demo Video]**

## Tech Stack

![React](https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

## Features

- Display a list of news articles retrieved from the **[NewsAPI]**.
- Implement a search function to filter news articles.
- Clicking on a news article redirects the user to the corresponding URL provided by the API.
- Maintain a list of read/clicked news articles.

## Getting Started

Follow these instructions to get the **DNA News** up and running on your local machine.

### Prerequisites

You need a web browser to run this project.

### Installation

1. Sign up for an account on **[NewsAPI]** to obtain an API key.

2. Clone this repository:

   ```bash
   git clone https://github.com/rhnas110/dna-news.git
   ```

   Navigate to the project directory:

   ```bash
   cd .\your-folder-create\dna-news\
   ```

3. Add the `.env` file and add the variable `VITE_NEWS_API_KEY=your-news-api-key`

4. Run `npm install` to install dependencies.

5. Run `npm run dev` to start the development server.

6. Visit `http://localhost:5173` in your web browser to view the website.

7. If you find this project useful, please consider the following:

- Follow on GitHub: Click the "Follow" button on the GitHub project page to stay updated with the latest developments.
- Star the project: Click the "Star" button on the GitHub project page to show your appreciation and support.

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

- Fork the repository.
- Create a new branch.
- Make your changes.
- Test your changes thoroughly.
- Submit a pull request with a clear description of your changes.

Your support is greatly appreciated! Thank you for contributing to the project.

## License

This project is licensed under the [**MIT License**](/LICENSE).

Feel free to contribute or provide feedback to improve the **DNA News** website. Happy reading, and Happy coding! 📰🌐

## Acknowledgments

- **[NewsAPI]** for providing such a cool API

[comment]: <> (LINK VARIABLE)
[newsapi]: https://newsapi.org/
[vite]: https://vitejs.dev/

[presentation]: https://drive.google.com/file/d/1E136T985bt0BvKOAh2r5kv7gt4DdLm1j/view?usp=sharing
[demo video]: https://asset.cloudinary.com/dlzoyg2ox/82559666af1dbb39c77cecc866fa5932
