# CPU Monitor App

## Table of Contents

---

- [Technology](#technology)
- [Installation](#installation)
- [Load Monitoring Web Application](#load-monitoring-web-application)
- [Product requirements](#product-requirements)
- [Engineering requirements](#engineering-requirements)
- [Screenshots](#screenshots)
- [Future Work](#future-work)

## Technology

---

- Nx (Repo aggregation)
- NestJS (Backend)
- Angular / Typescript (Frontend)
- Angular Material (Frontend - UI Components)
- ng2-Charts / chart.js (Frontend - Charts)
- RxJS (Data Management)

## Installation

---

The following command will install and launch (app and api)

```bash
$ npm ci
$ npm start
```

The following command will run all unit tests (app and api)

```bash
$ npm test
```

## Load Monitoring Web Application

---

This application will display time-series data.
A user should be able to view your application to answer the following questions about their computer:

- What is my computer's current average CPU load?
- How did the average CPU load change over a 10 minute window?
- Has my computer been under heavy CPU load for 2 minutes or more? When? How many times?
- Has my computer recovered from heavy CPU load? When? How many times?

## Product requirements

---

- The front-end application should communicate with a local back-end service to retrieve CPU load average information from your computer (see below).
- The front-end application should retrieve CPU load information every 10 seconds.
- The front-end application should maintain a 10 minute window of historical CPU load information.
- The front-end application should alert the user to high CPU load.
- The front-end application should alert the user when CPU load has recovered.

## Engineering requirements

---

- The alerting logic in your application should have tests.
- The back-end service does not need to persist data.
- Please write up a small explanation of how you would extend or improve your application design if you were building this for production.

Thresholds for high load and recovery:

- A CPU is considered under high average load when it has exceeded 1 for 2 minutes or more.
- A CPU is considered recovered from high average load when it drops below 1 for 2 minutes or more.

## Screenshots

---

![Screen 1 - Good cpu usage](/images/image1.png)
![Screen 2 - Medium cpu usage](/images/image2.png)
![Screen 3 - High cpu usage](/images/image3.png)
![Screen 4 - Alerts notifications](/images/image4.png)
![Screen 5 - Fail to connect to the server error](/images/image5.png)

## Future Work

---

- Backend should be responsible to arrange value and date (not relay on the client date)
- Add destroy to observables (avoid memory leaking)
- Test with windows
- Improve responsive
- Translation
- e2e tests
