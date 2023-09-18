# Wish movie
***
If you can't remember the title of the movie, but remember the names of the actors or the genre of the movie 
Wish Movie is exactly what you need to help you find the film. 
Search movies with your preference and sort results by necessary order to find the best match for your wish.
## Motivation
***
* Use **React** and **Redux** to fetch multiple asynchronous requests to API, and store data in a single state.
* Use **SASS** to avoid repetition in CSS rules using mixins and make app maintenance easier using variables
* Use **React Router** to help handle navigation and redirects in the app
## Technologies
***
* React
* Redux
* React Router
* JavaScript (ES6)
* HTML5
* CSS3
* SASS
## APIs used
* [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs)
## Useful npm package used
* [Primereact](https://primereact.org/)
## Setup
* **git clone** {the url to the GitHub repo} or clone your own fork
* **cd** into the new folder
* **npm install**
* Add to **netlify.toml** file redirect rule to make it redirect in dev mode
    > [[redirects]]
        from="/movie/*"
        to="/:splat"
* For more info read Netlify redirects [docs](https://docs.netlify.com/routing/redirects/)
* **netlify dev** (using instead of npm start to handle serverless functions)