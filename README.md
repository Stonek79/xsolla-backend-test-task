## [Xsolla School 2021. Backend. Test task](https://github.com/xsolla/xsolla-school-backend-2021)

This is a test implementation of the api goods management system for an e-commerce site.
To demonstrate the API, the client part of the application is also implemented.
You can see it by this [*link*](https://afternoon-atoll-03426.herokuapp.com/)
Based on MongoDB

## Description

API Authorization:
- implemented user registration with a unique email and password
- email and password are validated during registration
API Product creation 
- the method adds product data to the MongoDB database and returns product data in json format
API Edit product:
- the method changes any product data by its id's in the MongoDB database and returns the changed product data in json format
API Removing a product:
- the method removes a product from the MongoDB database by its id and returns the current list of products in json format for display on the client side, as well as data for pagination and sorting
API Getting information about a product:
- the method returns data about the product by its id in json format
API Getting the product catalog:
- the method returns the list of all added products in json format for display on the client side, as well as data for pagination and sorting
- it is implemented to return a limited number of products from the list (10 items each) with the possibility of paginated view
- the method implements a variant of sorting the received goods by parameters using the 'query string'

## Requirements
* Node JS v.14.*
* MongoDB

## Installation

You must have node.js installed on your machine (version 14.0 or higher).

Open your console and enter the commands:

$ user@name: git clone https://github.com/Stonek79/xsolla-backend-test-task

Then find and go to the folder ../xsolla-backend-test-task/ on your machine and launch installation:

for server:
$ user@name/folder/xsolla-backend-test-task: npm install 

for client:
up to 'client' folder using 'cd client' command ant then install client side
$ user@name/folder/xsolla-backend-test-task/client: npm install

After installation you can use the development mode and modify the application to your needs:
$ user@name/folder/xsolla-backend-test-task/client: npm run dev

The login page will automatically open and you can test application

## API


