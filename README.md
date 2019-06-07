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
        * [Stripe Charge](#stripe-charge)
        * [Stripe Webhook](#stripe-webhook)
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
* *Handles card validation after card has read by Card reader*

### Verify Card
* *This method receive a front-end payment and create a chage.*

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

    **Description** : `Object from Stripe`

    **Code** : `200 OK`

    **Content**
    ```json
    {
        "status": `boolean`,
        "message": `string`,
        "token": `string`
    }
    ```

    **Error Responses**

    **Description** : `Return a error object.`

    **Code** : `400`

    **Content** :
    ```json
    {
        "code": "USR_02",
        "message": "The field example is empty.",
        "field": "example",
        "status": "500"
    }
    ```

    **Description**: `Unauthorized`

    **Code**: `401` 

    **Content** : 
    ```json
    {
        "error": {
            "status": 401,
            "code": "AUT_02",
            "message": "Access Unauthorized",
            "field": "NoAuth"
        }
    }
    ```


# Author
* **Ajilore Raphael Olamide** - *All works* - [github](https://github.com/raphealolams)


# What I Do
* eat
* code
* sleep
* repeat


