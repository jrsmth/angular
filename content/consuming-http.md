## Consuming HTTP Services
* Angular is a JS framework for creating frontend/client-side applications that deal with the presentation logic of data; we should leave processing and storage to backend/server-side applications, written in frameworks like Spring.
    * This means that we need to consume HTTP services in the backend to perform CRUD operations on data.
* For this section, we will use ```https://jsonplaceholder.typicode.com/``` to act as a backend service that we can make REST calls to.
* To perform HTTP requests in Angular, we neeed to import the ```HttpModule``` into ```src/app/app.module.ts```.
    * In this section, I will create my examples in ```../exercises/exercise-consuming-http/examples```.
* Getting data (GET, READ)
    * 
