# CoffeApp

## Angular Frontend

This is the frontend of the CoffeApp application, built with Angular. To use it, you need to have the Laravel backend running. The backend repository can be found at: https://github.com/XlHader/CoffeeApp.

After running the Laravel migrations, you can use the following test user to log in:

| Email | Password |
| ----- | -------- |
|admin@admin.com|admin123|

## Installation 

### 1. Clone the Git Repository

To get started with the installation of the application, you will first need to clone the Git repository. You can do this by running the following command in your terminal:

```bash
git clone https://github.com/XlHader/CoffeeApp-frontend
```

### 2. Node.js and Angular CLI.

You will need to have Node.js and npm installed on your machine. You can download Node.js from the following link: https://nodejs.org/en/download/

Once you have Node.js installed, you can install the dependencies by running the following command in your terminal:

#### 2.1 Install Angular CLI

You will also need to have the Angular CLI installed on your machine. You can install it by running the following command in your terminal:

```bash
npm install -g @angular/cli
```

I recommend the same version of the Angular CLI that I used to develop the application, which is 16.1.0. You can install this version by running the following command in your terminal:

```bash
npm install -g @angular/cli@16.1.0
```

#### 2.2 Install Dependencies

On the root directory of the project, run the following command in your terminal:


```bash
npm install
```

### 3. Configure the API URL

You will need to configure the URL of the API. To do this, open the file `src/environments/environment.ts` and change the value of the `apiUrl` variable to the URL of the API. For example:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```

### 4. Run the Application

You can run the application by running the following command in your terminal:

```bash
ng serve
```

The application will be running on http://localhost:4200

### 5. Build

You can build the application by running the following command in your terminal:

```bash
ng build
```

### Usage

Once the application is running, you can interact with the CoffeApp API by using the interface provided by the frontend. 