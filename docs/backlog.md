# Initial documentation db

## Features
- Homepage 
- Login users (form, authentication)
- CRUD products
- Sales register
- Metrics Dashboard

## Database
### users
- id_user
- name
- email
- password_hash
- role
- created_at

### products
- id_product
- name
- price
- stock
- created_at

### sales
- id_sales
- id_user
- id_product
- quantity
- total
- created_at
