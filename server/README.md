# Copartying api
## Create a coparty
```
POST /api/1/coparties
```
### Data
```
{
  "coparty": {    
    "name": "Party no. 1",
    "date": "2015-11-16T16:00:00Z",
    "place": "Impacthub Brno",
    "createdAt": "2015-11-15T16:04:44.985Z",
    "adminHash": "4454f5c8d92f89733f28fc65c8165eb62bebafb5",
    "items": [
      {
        "id": "1",
        "amount": 10,        
        "name": "Beer",        
      },
      {
        "id": "2",
        "amount": 10,        
        "name": "Pizza",        
      }
    ]
  }
}
```
### Success
```
{
  "coparty": {
    "id": "93e068bf-e08b-4e56-8b1f-3e81a47da76d",
    "name": "Party no. 1",
    "date": "2015-11-16T16:00:00Z",
    "place": "Impacthub Brno",
    "createdAt": "2015-11-15T16:04:44.985Z",
    "items": [
      {
        "id": "1",
        "amount": 10,        
        "name": "Beer",        
      },
      {
        "id": "2",
        "amount": 10,        
        "name": "Pizza",        
      }
    ],
    "guests": []
  },
  "errors": []
}
```
## Get one coparty as a guest
```
GET /api/1/coparties/:copartyId
```
### Success
```
{
  "coparty": {
    "id": "93e068bf-e08b-4e56-8b1f-3e81a47da76d",
    "name": "Party no. 1",
    "date": "2015-11-16T16:00:00Z",
    "place": "Impacthub Brno",
    "createdAt": "2015-11-15T16:04:44.985Z",
    "items": [
      {
        "id": "1",
        "amount": 10,        
        "name": "Beer",
        "reservedAmount": 0        
      },
      {
        "id": "2",
        "amount": 10,        
        "name": "Pizza",  
        "reservedAmount": 0      
      }
    ],
    "guests": []
  },
  "errors": []
}
```
## Get one coparty as a admin
```
GET /api/1/coparties/:copartyId?s=:adminHash
```
### Success
```
{
  "coparty": {
    // same as guest response
    "adminHash": "4454f5c8d92f89733f28fc65c8165eb62bebafb5"
  },
  "errors": []
}
```
## Update a coparty as a admin
Check if item has enough amount for already reserverAmount
```
PUT /api/1/coparties/:copartyId?s=:adminHash
```
### Data
```
{
  "coparty": {    
    "name": "Party no. 1 - best party",
    "date": "2015-11-16T16:00:00Z",
    "place": "Impacthub Brno",
    "createdAt": "2015-11-15T16:04:44.985Z",    
    "items": [
      {
        "id": "1",
        "amount": 10,        
        "name": "Beer",        
      },
      {
        "id": "3",
        "amount": 10,        
        "name": "Vine",        
      }
    ]
  }
}
```
### Success
```
{
  "coparty": {
    "id": "93e068bf-e08b-4e56-8b1f-3e81a47da76d",
    "name": "Party no. 1 - best party",
    "date": "2015-11-16T16:00:00Z",
    "place": "Impacthub Brno",
    "createdAt": "2015-11-15T16:04:44.985Z",
    "items": [
      {
        "id": "1",
        "amount": 10,        
        "name": "Beer",
        "reservedAmount": 0        
      },
      {
        "id": "3",
        "amount": 10,        
        "name": "Vine",
        "reservedAmount": 0        
      }
    ],
    "guests": []
  },
  "errors": []
}
```
## Add a guest to coparty
Check if there is no email duplicity and if item has enough amount
```
POST /api/1/coparties/:copartyId/guests
```
### Data
```
{
  "guest": {    
    "email": "guest1@example.com",
    "name": "Guest 1",
    "items": [
        {"id": "1",
        "amount": 3}
    ]
  }
}
```
### Success
```
{
  "coparty": {
    "id": "93e068bf-e08b-4e56-8b1f-3e81a47da76d",
    "name": "Party no. 1 - best party",
    "date": "2015-11-16T16:00:00Z",
    "place": "Impacthub Brno",
    "createdAt": "2015-11-15T16:04:44.985Z",
    "items": [
      {
        "id": "1",
        "amount": 10,        
        "name": "Beer",        
      },
      {
        "id": "3",
        "amount": 10,        
        "name": "Vine",        
      }
    ],
    "guests": [
      {
        "email": "guest1@example.com",
        "name": "Guest 1",
        "items": [
            {"id": "1",
            "amount": 3}
        ]
      }
    ]
  },
  "errors": []
}
```
## Get coparties
```
GET /api/1/coparties
```
