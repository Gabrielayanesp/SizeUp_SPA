# Authentication & Roles Documentation
## 1. User registration

**Endpoint:** `POST /register`

- User sends `{ name, email, password }`.
- Password is hashed with `bcrypt.hash(password, 10)`.
  * bycrypt is used to protect them by transforming them into unreadable hashes.
- User is stored in the database via `createUser`.
- Response: User object (without raw password).

---


## 2. Login 

**Endpoint:** `POST /login`

- User sends `{ email, password }`.
- System searches user by email (`findUser`).
- If user not found → return `400 User not found`.
- Compare password with hashed one (`bcrypt.compare`).
  * The backend compares the entered password with the hash in the DB. If it matches, a session token (JWT) is generated. 
The role (user or admin) is also returned in the response.
- If invalid → return `401 Incorrect password`.
- If valid:
  - Generate **JWT token** with:
    - `id` (user ID)  
    - `role` (user role: `admin`, `customer`)  
    - Expiration: `1h`
  - Response:  
    ```json
    {
      "message": "Login successful",
      "token": "<jwt_token_here>"
    }
    ```
 *  A JWT is basically a JSON object that contains information (called "claims") about the user or entity that issued it, along with a digital signature that allows its integrity to be verified.


