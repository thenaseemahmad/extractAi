# ExtractionAi (Data Extraction from Images using Chrome-build-in AI)

This project extracts data from scanned images using **Tesseract OCR** for text recognition and processes the extracted data using **Chrome's Built-in AI Prompt Generation Model**. Designed with a modern, scalable architecture, the project is ideal for automating workflows involving image-based data.

---

## Features

- **Image-to-Text Conversion**: Leverages Tesseract OCR for accurate text extraction.
- **AI Data Processing**: Utilizes Chrome’s built-in AI prompt model for intelligent data manipulation and insights.
- **Monorepo Architecture**: Built using **Nx Monorepo** for modular and maintainable development.
- **Containerized Deployment**: Facilitated by **Docker** and **Kubernetes**.
- **Continuous Local Development**: Achieved through **Skaffold** for rapid iteration.

---

## Prerequisites

Ensure the following are installed on your system before starting:

1. **Node.js** (v16 or later)
2. **Nx CLI**: Install with `npm install -g nx`
3. **Docker Desktop**: For containerization.
4. **Kubernetes**: Enabled via Docker Desktop.
5. **Skaffold**: Install from [Skaffold CLI](https://skaffold.dev/docs/install/).
6. **Tesseract OCR**: Install from [Tesseract OCR Installation Guide](https://github.com/tesseract-ocr/tesseract).
7. **Google Chrome**: For accessing the built-in AI prompt model. This require Build-in AI model readily available on your chrome browser, follow the [Steps] (https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c/edit?tab=t.0) to install the model on your chrome.

---

## Setup Instructions

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/image-text-ai-extraction.git
cd image-text-ai-extraction
```
### 2. Install Dependencies
Run the following command to install all required dependencies:
```bash
npm install
```
### 3. Log in to Docker Hub
To interact with Docker images and push to your repository, you need to log in to Docker Hub. Ensure you have Docker Desktop installed and logged in:
```bash
docker login
```
### 4. Add a Custom Host (exai.dev)
Add the custom host exai.dev to your computer's host file to resolve internal services:
- **On Linux/macOS:**
    - Open /etc/hosts in a text editor and add:
    ```bash
    127.0.0.1 exai.dev
    ```
- **On Windows:**
    - Open C:\Windows\System32\drivers\etc\hosts and add:
    ```bash
    127.0.0.1 exai.dev
    ```
### 5. Set Up Ingress-NGINX Controller
Set up the Ingress-NGINX controller to deploy initial infrastructure:
Run the following command to apply the NGINX ingress controller configuration:
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.0-beta.0/deploy/static/provider/cloud/deploy.yaml
```
### 6. Build the Project
Run the following command to build all the applications within the Nx monorepo:
```bash
nx run-many --target=build --all
```
### 7. Run the Development Environment with Skaffold
Start the local development environment using Skaffold:
```bash
skaffold dev
```
This will start the local Kubernetes cluster with the necessary configurations and deploy the applications for continuous development.

### How It Works
1. **Tesseract OCR**: Used to extract text from scanned images.
2. **Chrome-Built-in-AI Prompt Model**: Google Chrome's AI model processes the extracted text to generate prompts for data extraction.

### LICENCE
This project is licensed under the MIT License