## Redux
* What is Redux?
    * Redux is a library to help you manage the state of your application.
        * It is something that you should consider using you're working with a medium-to-large single page application with complex data flows.
            * In small/simple apps, using Redux would add unnecessary complexity.
                * We can always start without Redux and then as it grows in complexity, refactor it and add Redux later on.
    * Large Single Page Apps
        * A component manages the logic and state behind a view (section of the screen). This model perfectly alligns with the OOP principle of encapsulation. However, this model doesn't work so well when multiple unrelated views are working with the same piece of data. 
            * In this case, we often have copies of the same data across each view and therefore have to do some extra work to sync the data in other views when we change a copy of the data in one view. You could use events to sync the view but this will grow to be too complex in a large application. It is also unpredictable and hard to maintain/extend.
                * Think of Facebook as an example. On the screen we have mulitple views that show you data related to messaging; let's say we are on the messages page, we'll have the number of unread message on the main section of the screen - plus it will also be part of the notifications in the nav bar and part of any open message tabs at the bottom of our screen. It is situations like this when we need to use Redux.
                    * Flux was an architecture that was design by Facebook; Redux is a lightweight implementation of this.
    * Redux Benefits:
        * Redux allows us to manage application state in a predictable way.
        * Redux has a decoupled architecture and so is independent of the presentation framework that we choose to use. This allows for one of Uncle Bob's clean architecture principles: delay the decision about external frameworks and libraries. We can choose to use either React or Angular, etc (no locked-in to one).
        * Redux also improves testability (relies heavily on Functional Programming concepts, avoids the need for mocks, spies, etc).
        * Great tooling - especially debugging.
        * Undo / redo features.
    * When to use Redux:
        * Independent copies of the same data in multiple places
        * Multiple views that need to work with the same data and be in-sync
        * The same data can be updated by multiple users / actions
* Building Blocks of Redux
    * 

