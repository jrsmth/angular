# Thermis
*This project contains examples of how to test Angular apps*

<br>

<img src="../../resources/thermis.jpeg" alt="Thermis" width="300">

> Thermis is the Greek Goddess of Justice

<br>

## Fundementals Refresher
* Official testing (documentation)[https://angular.io/guide/testing]
* Karma is the Angular test runner
* Jasmine is the framework that tests are written in
* Protactor is an E2E testing framework for Angular
    * Uses Selenium under the covers, which is also a browser automation tool (but not Angular specific)
        * Protractor has been deprecated in favour of Cypress (who have their own architecture instead of using Selenium)
            * Good Cypress [video](https://www.youtube.com/watch?v=wGiU4qdFL6U)
* Commands:
    * `ng test` is used to run Jasmine tests
    * `npm run cypress:open` is used to run Cypress tests

<br>

## Write Up

> I chose not to implement a new demo project for testing, in favour of testing Mr Eastwell's [app](https://github.com/JRSmiffy/owen-wowson-app)

* Jasmine unit and integration tests are not pragmatic
    * They are hard to write and don't seem to offer much
* Sack them off and stick with Cypress e2e testing for the time being
    * Experiment and get proficient, perhaps over time incoperate Cypress component testing