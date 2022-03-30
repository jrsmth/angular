## Authentication & Authorisation
* Generic Architecture
    * In general, the client authenticates a user by making a HTTP request to an authenticate endpoint on the server, with the user's login credentials. If successful, the server will respond with a JWT - which contains specific information about this user and is used to identify this particular user on both the client-side and server-side.

    <br>
    <img src="../resources/auth_architecture.png" width="500" alt="Authentication Architecture">

    <br>

    * We need to persist our JWT so it can exist across session restarts; if the user closes the browser and then opens it again, they should still have the JWT. Browser local storage is used to do this.
    * On the client, a JWT is used to identify the user. This allows us to:
        * display their name on the page
        * show/hide certain parts of a page
        * prevent access to certain routes
* JSON Web Tokens (JWT)
    * [jwt.io](https://jwt.io/)
        * example JWT:
            ```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.IgfIWP_XtusfBW3ltGuDKdGk4xJZkOjmyoqkjkAkWSI```
            * decoded:
                ```json
                    {
                        "alg": "HS256",
                        "typ": "JWT"
                    }
                ```
                ```json
                    {
                        "sub": "1234567890",
                        "name": "John Doe",
                        "admin": true
                    }
                ```
                ```html
                    HMACSHA256(
                        base64UrlEncode(header) + 
                        "." +
                        base64UrlEncode(payload),
                        <YOUR-256-BIT-SECRET>
                    )
                ```
    * The example JWT above is base64 encoded. This means that it is easier to send across the network but it isn't encrypted. Therefore we must avoid putting sensitive information in it.
    * A JWT is comprised of 3 parts, each seperated by a dot (```.```).
        * The first part is the ```HEADER```
            * This contains the 'signing' algorithm. This is a standard header that we don't have to worry about in most cases.
        * The second part is the ```PAYLOAD```
            *  The payload contains attributes for the given user. In the example above, the ```sub``` or 'subject' property is the user's id. The ```name``` property is also given, as well as their role (```admin```). We include commonly used basic properties of the user, to avoid having to look them up each time we want to use them in a HTTP request.
        * The third part is the ```DIGITAL SIGNATURE```
            *  The signature is used to prevent a malicious user from modifying any of the properties in the JWT. The signature is based on a 'secret' that exists on the server. Therefore a malicious user cannot generate the right digital signature to make a fake JWT. 
                * The signature is constructed using the encoded header and payload and therefore needs to be regenerated if we need to change either of these other two sections.
                    * To modify a property of the JWT payload, you need to regenerate the signature - which a malicious user couldn't do becuase the don't know the secret.
    * Good Stack Overflow [post](https://stackoverflow.com/questions/58341833/why-base64-is-used-in-jwts#:~:text=JWT%20uses%20Base64url%2C%20which%20is,be%20sent%20in%20the%20URL.) on JWT.
    * We include a few basic properties of the user in the JWT object, such as their name and id, so that we don't have to fetch this info from the database, everytime they are needed to make a request to the backend.
    * Base64 conversion in CLI
        * ```echo "STRING" | base64```
        * ```echo "ENCODED_STRING" | base64 --decode```
* Authentication vs Authorisation
    * Authentication is the process where we determine ***WHO*** a user is.
    * Authorisation is the process where we determine ***WHAT*** this user can do (permissions).
    * Good [article](https://www.okta.com/uk/identity-101/authentication-vs-authorization/)
        * "Authentication confirms that users are who they say they are. Authorisation gives those users permission to access a resource."

    <br>
    <img src="../resources/authenticate_vs_authorise.png" width="500" alt="Authentication Architecture">

    <br>

* Implementing Login
    * In this section my example code can be found in ```../exercises/exercise-authenticate-authorise/examples```
    * just come up with your own...