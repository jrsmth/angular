import { of } from 'rxjs';

export class FakeBackendProvider {

    private static token_admin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDciLCJuYW1lIjoiSlJTbWlmZnkgYWRtaW4iLCJhZG1pbiI6dHJ1ZX0.MocWr2pV_OrKR6mCBpX20PAkKgjlRQM2kXSDl9cKPRs';
    private static token_not_admin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDciLCJuYW1lIjoiSlJTbWlmZnkiLCJhZG1pbiI6ZmFsc2V9.n3C5bdrG5QebE5fgEkO88DsHpgRSnR2H-pr7Y6muoQc';

    static mockAuthenticateHttpRequest(url: string, body: any){
        console.log("mockAuthenticateHttpRequest: " + url);

        let credentials = JSON.parse(body);
        let result: any;

        if (credentials.email === 'james@smith.com' && credentials.password === 'joker') {
            let token = (Math.random() > 0.5) ? this.token_admin : this.token_not_admin;

            result = {
                status: 200,
                body: {
                    token: token
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