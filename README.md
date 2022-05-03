# API of DN Token

This project is main to be blockchain research

Set up .env\
See in [./functions/.env.example.txt](https://github.com/t3201v/dntoken-backend/blob/main/functions/.env.example.txt)

---

### In the project root, you should go to **functions** directory:

```
cd ./functions
```

Then install the lib\

```
npm i
```

Run project:\

```
npm start
```

Run test:\

```
npm run test
```

Check lint:\

```
npm run lint
```

---

### Run project with docker:

Build docker image\

```
docker build -t be-dntoken .\functions\
```

Run image\

```
docker run -d -p 8080:8080 be-dntoken
```

---

##### Nodejs, Express, Firebase, TS
