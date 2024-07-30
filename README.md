# TouchStone AI

## Table of Contents

- [Description](#description)
- [Deployment and System Requirements](#deployment-and-system-requirements)
- [Plans for Improvement](#plans-for-improvement)
- [Link to Touchstone AI](#link-to-touchstone-ai)

## Description & Features

TouchStone AI is a sophisticated project developed during my time at TripleTen. It leverages OpenAI's GPT-4 model to create interactive and intelligent responses, providing a seamless experience for users. The backend architecture is designed with robust features and best practices:

- **AI Integration**: Utilizes OpenAI's API through well-structured controllers and models, facilitating dynamic user interactions.
- **Middleware Implementation**: Includes comprehensive middleware for authentication, global error handling, and request validation using Joi. A request limiter ensures the system's stability by controlling the number of requests per endpoint.
- **Logging and Monitoring**: A custom logger provides detailed logging, aiding in debugging and monitoring application performance.
- **Schema Design**: Custom schemas are designed to return data in a structured and readable format, enhancing the user experience.
- **Routing**: Routes are organized into separate files for clarity and maintainability, supporting GET, POST, DELETE, and USE methods.
- **Utilities and Configuration**: A utils folder contains error messages with corresponding error codes, improving code readability and consistency. The configuration setup facilitates easy environment management, pulling from the .env file during production.

## Deployment and System Requirements

To deploy TouchStone AI, ensure your system meets the following requirements:

- **Language**: JavaScript (ES6+)
- **Node.js**: Version 14.x or higher
- **npm**: Version 22.2.0 or higher
- **Essential Plugins**:
  - OpenAI Plugin: For interacting with the GPT-4 model.
  - Other npm packages as listed in `package.json`.

### Deployment Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/XDRO/TouchStone_BackEnd.git
   cd TouchStone_Backend
   npm init
   npm install
   touch .env
   ```

   **Contents For .env**
   OPENAI_API_KEY=your_openai_api_key -- Replace your_openai_api_key with your actual OpenAI API key
   PORT=your_desired_port -- Replace your_desired_port with your desired port
   **Running BackEnd**
   npm run dev

## Plans for Improvement

- **Speech-to-Text Integration**: Implementing speech-to-text controllers and functions to expand user interaction capabilities.
- **Code Block Generation**: Enhancing user experience by generating code blocks upon request for programming-related queries
- **Update README.md**: Pictures, GIFs, or screenshots that detail the project features, A demo video of the project

## Link to Touchstone AI

[Touchstone AI server](https://touchstone.ai.zanity.net/)

---

TouchStone AI aims to drive the innovations of AI-driven applications, continually evolving with new features and improvements. Contributions and feedback are always welcome!
