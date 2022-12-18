## Introduction
A node.js application to provide config service, which is exposed by endpoint `/config`. The service will fetch a configuration json from AWS remote APPConfig service and return for consumer. If AWS AppConfig service is not available, it will return default json data from the local json file.


## User Guide
First, `cd <Source Code Directory>`
Then, run `npm i` for dependencies installation
As to unit test, run `npm run unit:test` for unit test, run `npm run unit:coverage` for coverage