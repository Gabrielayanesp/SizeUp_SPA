# Document inventory endpoints  

## 1. GET /products
### Description
Creates a new product in the inventory. 

- **Method:** `GET`  
- **Endpoint:** `/products`  
- **Auth Required:** No (public access).  
- **Response 200 (OK):**

### Flow
1. Receives the **name**, **price**, and **stock** fields from the `req.body`.  
2. If any are missing → responds with **400 Bad Request**.  
3. Inserts the product into the database's **products** table (using `pool.query`).  
4. Returns the newly created product (`RETURNING *`) with a status of **201 Created**.  
5. If an error occurs → responds with a **500 Internal Server Error**. 

## 2. POST /sales
### Description
This endpoint allows you to register a new sale (order) in the database.

Function: `addOrder(req, res)`

### Flow
1. **Receive customer data** from `req.body`:
- `id_user` → identifies the user making the purchase.
- `total` → total sale amount.

2. **Validation of required fields**:
- If `id_user` or `total` is missing, respond with a **400 Bad Request** and an error message.

3. **Database insertion**:
- Execute a SQL query to insert the sale into the `orders` table:
```sql
INSERT INTO orders (id_user, total) VALUES ($1, $2) RETURNING *;
```
- `RETURNING *` returns the newly created record.

4. **Successful response**:
- Returns the new order in JSON format with code **201 Created**.

5. **Error Handling**:
- If an error occurs in the database or on the server, respond with a **500 Internal Server Error** and a descriptive message.
