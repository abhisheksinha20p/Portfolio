# Deployment Guide

## 1. Docker Deployment (Recommended)

This project includes a multi-stage `Dockerfile` optimized for production with Nginx.

### Build the Image
```bash
docker build -t portfolio-abhishek .
```

### Run the Container
```bash
docker run -p 8080:80 -d portfolio-abhishek
```
Access the site at `http://localhost:8080`.

---

## 2. Vercel Deployment

1.  Connect your GitHub repository to Vercel.
2.  Vercel will automatically detect the **Vite** framework.
3.  Deploy! (No configuration needed usually).

---

## 3. Manual Deployment (Static)

1.  Run the build command:
    ```bash
    npm run build
    ```
2.  Upload the contents of the `dist/` folder to any static host (AWS S3, Netlify, Apache/Nginx `html` folder).
