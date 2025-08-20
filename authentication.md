# Authentication Flow
## User registration

- User sends name, email, password, role.
* Password is encrypted with bcrypt (It is used to protect them by transforming them into unreadable hashes.)
* The role is saved in DB.role by default = user.

## Login
- User sends email, password.

The backend compares the entered password with the hash in the DB. If it matches, a session token (JWT) is generated. 
The role (user or admin) is also returned in the response.

## Acceso a rutas
- The JWT token is sent in every request.
* A JWT is basically a JSON object that contains information (called "claims") about the user or entity that issued it, along with a digital signature that allows its integrity to be verified.

validation_roles validate the token. 
The role is reviewed before allowing access to certain routes.
