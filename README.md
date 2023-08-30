# Rabobank Customer Transaction Processor

Welcome to the Rabobank Customer Transaction Processor, a RESTful web-service designed to process customer transaction records.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Demo

Check out the live demo of the application deployed on Github Pages: [Rabobank Customer Transaction Processor Client Demo](https://pedroknup.github.io/records-assignment-client/)

## Getting Started

Follow these steps to run the application locally:

### Clone the Repository

Clone the Rabobank Customer Transaction Processor repository to your local machine:

```bash
git clone https://github.com/pedroknup/records-assignment-client
```

### Install Dependencies

Navigate to the cloned directory and install the required dependencies using npm. Make sure you're using Node.js version 16:

```bash
cd records-assignment-client
npm install
```

### Run locally
```bash
npm run start
```

## Reviewer's Considerations:
My understanding is that any duplicate transactions are expected to be flagged as invalid.

Additionally, I'm assuming that the system has the capability to process multiple files concurrently, and that duplicate references will be cross-checked within all transactions of a given request.



Feel free to explore and test the features of the Rabobank Customer Transaction Processor.
