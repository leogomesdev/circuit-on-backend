# 🌐 CIRCUIT ON (Backend)

## ☁ Using AWS App Runner

If using AWS App Runner, set the **Build Settings** as below:

- Build command:

  ```bash
    npm install && npm run build
  ```

- Start command:

  ```bash
    npm run start:prod
  ```

- Port:

  ```bash
    3000
  ```

At the **Service Settings** section **Environment Variables**, add each variable as mentioned on file [.env.example](.env.example)

### 📝 Docs and external resources:

- [Docs: Deploying a new application version to App Runner](https://docs.aws.amazon.com/apprunner/latest/dg/manage-deploy.html)
