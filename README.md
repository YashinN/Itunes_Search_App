# Itunes_Search_App

## Description
The site is used to search the Itunes library based on criteria specified by the user.The user can then view images along with basic details of their returned searched results.
The site too allows for user to favourite their desired products to refrence later.

## Install / Run
To run the site locally simply run ***npm start*** from the ***/frontend*** directory.  
The backend does not need to be initialised as its already running on a railway server.

## Hosting
The frontend is hosted on netlify & backend express is on railway.

## Link To Production Site

https://monumental-eclair-2fdb72.netlify.app/

## How It Works
- enter search criteria in input, if valid. App will display results from Itunes api.   
- define meda type to filter by eg movie,podcats etc. before running search.Default type is all.
- search results will be limited to a total of 25.
- favourite items by selecting 'favourite' button next to each item.
- View favourites by selecting pink button top of screen 'view favourites.'

## Security & Authentication
- The app makes api requests to Itunes api and does not require a api key.   
- There is no authentication required for the app.
- Helmet middleware is installed to secure the node.js express portion of the application and apply security headers.

## Testing
- Run frontend tests from the ***/frontend*** directory using ***npm test***.  
- Run backend tests from the ***/backend***  directory using ***npm test***.
- ***JEST*** is used fro testing both backend and frontend.


