# Getting Started
Backend Developer Assignment

# Table of Contents

* [Prerequisites](#prerequisites)
* [Installing](#installing)
* [Running The App](#running-the-app)
    * [Development Mode](#development-mode)
    * [Production Mode](#production-mode)
    * [Test Cases](#test-cases)
* [Error Documentation](#error-documentation)
* [API Endpoint](#API-Endpoint)
    * [Validate Card](#validate-card)
        * [Verify Card](#verify-card)
    * [Services](#services)
        * [Get Services](#get-services)
    * [Balance](#balance)
        * [Get Balance](#get-balance)
    
* [Author](#author)
* [What i Do](#what-i-do)



# Prerequisites
you need to have the following installed on your machine
```
    node v11.3.0 or <=
```

# Installing
Clone the Repository
```
    git clone https://github.com/raphealolams/gokada_waffle.git
```
Install Dependency
```
    npm install
```

# Runnning The App
## Development Mode
```
    npm run dev
```

## Production Mode
```
    npm start
```

## Test Cases
```
    npm run test
```

# API Endpoint

## Validate Card
* *Handles card validation*

### Verify Card
* *This method send's card details after the card reader captures the account information stored on the magnetic stripe*

    **URL** : `/api/verifyCard`

    **Method** : `POST`

    **Auth required** : `NO`

    **Body**: 
    ```json
    {
        "pin": "",
        "bank": "",
        "accountNumber": "",
        "cardType": "",
        "cardNumber": ""	
    }
    ```

    **Success Response**

    **Description** : `Response Object`

    **Code** : `200 OK`

    **Content**
    ```json
    {
        "status": true,
        "message": "",
        "token":  ""
    }
    ```

    **Error Responses**

    **Description** : `Return a error object.`

    **Code** : ``

    **Content** :
    ```json
    {
        "status": false,
        "message": "invalid credentials",
        "pinLimitReached": false,
        "retainCard": false
    }
    ```

## Balance
* *Handles Balance Inquiry*

### Get Balance
* *Get's Account Balance*

    **URL** : `/api/getBalance`

    **Method** : `GET`

    **Auth required** : `YES`

    **Auth Header**: 
    ```json
    {
        "USER-KEY": "bearer "
    }
    ```

    **Body**: 
    ```json

    ```

    **Success Response**

    **Description** : `Response Object`

    **Code** : `200 OK`

    **Content**
    ```json
    {
       "status": true,
        "message": "",
        "balance": {
            "availableBalance": "NGN10,000.00",
            "ledgerBalance": "NGN10,000.00"
        }
    }
    ```

    **Error Responses**

    **Description** : `Return a error object.`

    **Code** : ``

    **Content** :
    ```json
    {
        "status": false,
        "message": "Financial Institution Not Available",
        "balance": null
    }
    ```

## Services
* *Handles Services Available*

### Get Services
* *Get*

    **URL** : `/api/getAvailableServices`

    **Method** : `GET`

    **Auth required** : `YES`

    **Auth Header**: 
    ```json
    {
        "USER-KEY": "bearer "
    }
    ```

    **Body**: 
    ```json

    ```

    **Success Response**

    **Description** : `Response Object`

    **Code** : `200 OK`

    **Content**
    ```json
    {
        "status": true,
        "message": "Here are the available services",
        "services": [
            "Cash Withdrawal",
            "Balance Inquiry",
            "Bills Payment",
            "Quick Teller",
            "Change Pin"
        ]
    }
    ```

    **Error Responses**

    **Description** : `Return a error object.`

    **Code** : ``

    **Content** :
    ```json
    {
        "status": false,
        "message": "Financial Institution Not Available",
    }
    ```

# Author
* **Ajilore Raphael Olamide** - *All works* - [github](https://github.com/raphealolams)


# What I Do
* eat
* code
* sleep
* repeat


