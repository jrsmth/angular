import { ErrorHandler } from "@angular/core"

export class AppErrorHandler implements ErrorHandler {

    handleError(error: any): void {
        alert('An unexpected error occurred.'); // simulated toast notification
        console.log(error); // simulated log to database
    }
}