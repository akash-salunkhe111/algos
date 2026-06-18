Flow - 
```
1. User clicks Checkout

We have checkout_context db
{
    cartId: CART-123
    status: pending
}

if not exists then create new record
{
    IDEMP-1001
    CART-123
    PENDING
}

2. User refreshes page
Frontend checks if for same cartId we have 
Server finds that
No new key is created


3. User clicks Pay 
with idempotency key generated from previous step from frontend

then flow from diagram
```