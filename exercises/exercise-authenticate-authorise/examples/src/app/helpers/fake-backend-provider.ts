import { of } from 'rxjs';

export class FakeBackendProvider {

    private static token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDciLCJuYW1lIjoiSlJTbWlmZnkiLCJhZG1pbiI6dHJ1ZX0.CG6ky6D4OgwFHdEDRh_WkEKCsqE07a8uBsnG5FiEOUU';

    static mockAuthenticateHttpRequest(url: string, body: any){
        console.log("mockAuthenticateHttpRequest: " + url);

        let credentials = JSON.parse(body);
        let result: any;

        if (credentials.email === 'james@smith.com' && credentials.password === 'joker') {
            result = {
                status: 200,
                body: {
                    token: this.token
                }
            }
        } else {
            result = {
                status: 400
            }
        }

        return of(result);
    } 
}