let app = {
    URL: 'https://api.themoviedb.org/3/',
    INPUT: null,
    init: function () {
        //fetch the config info
        app.INPUT = document.getElementById('search-input');
        app.INPUT.focus();

        //add click listener
        let btn = document.getElementById('search-button');
        btn.addEventListener('click', app.runSearch);
        let btn2 = document.getElementById('back-button');
        btn2.addEventListener('click', app.back);
        //listen for enter or return
        document.addEventListener('keypress', function (ev) {
            let char = ev.char || ev.charCode || ev.which;
            if (char == 10 || char == 13) {
                //they hit <enter> or <return>
                btn.dispatchEvent(new MouseEvent('click'));
            }
        });

    },

    // ----------------------------------------------
    //               MOVIE SEARCH
    // ----------------------------------------------

    runSearch: function (ev) {

        ev.preventDefault();

        if (app.INPUT.value) {
            //if they actually typed something other than <enter>
            let url = app.URL + "search/movie?api_key=" + KEY;
            url += "&query=" + app.INPUT.value;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    app.showMovies(data.results);
                })
                .catch(err => {
                    console.log(err);
                });

        }
    },
    showMovies: function (movies) {

        let baseImageUrl = "https://image.tmdb.org/t/p/"
        let section = document.querySelector('#search-results .content');
        let df = document.createDocumentFragment();
        section.innerHTML = "";

        movies.forEach(function (movie) {

            let div = document.createElement('div');
            div.setAttribute("data-movie", movie.id);
            div.addEventListener('click', app.getRecommended);
            div.classList.add('movie');
            div.textContent = movie.title;

            let img = document.createElement('img');
            img.setAttribute("poster-movie", movie.poster_path);
            img.setAttribute("alt", "movie poster");
            img.src = "".concat(baseImageUrl, 'w500/', movie.poster_path);
            img.classList.add('poster');
            div.appendChild(img);

            let movieDes = document.createElement('movieDes');
            movieDes.classList.add('movie-desc');
            movieDes.setAttribute("id", "movieDes");
            movieDes.textContent = movie.overview;
            div.appendChild(movieDes);

            let releaseDate = document.createElement('releaseDate');
            releaseDate.setAttribute("id", "releaseDate");
            releaseDate.textContent = "Release Date: " + movie.release_date;
            div.appendChild(releaseDate);
            
            let rating = document.createElement('rating');
            rating.setAttribute("id", "rating");
            rating.textContent = "Movie score: " + movie.vote_average + "/10";
            div.appendChild(rating);

            df.appendChild(div);
                
        });
        section.appendChild(df);

    },


    // ----------------------------------------------
    //               MOVIE RECOMMEND
    // ----------------------------------------------

    getRecommended: function (recommendations) {
        let movie_id = recommendations.currentTarget.getAttribute("data-movie");
        let recommend = app.URL + "movie/" + movie_id + "/recommendations?api_key=" + KEY;
        fetch(recommend)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                app.showRecommended(data.results);
            })
            .catch(err => {
                console.log(err);
            });
    },
    showRecommended: function (movies) {

        let baseImageUrl = "https://image.tmdb.org/t/p/"
        let section = document.querySelector('#search-results .content');
        let df = document.createDocumentFragment();
        section.innerHTML = "";

        movies.forEach(function (movie) {

            let div = document.createElement('div');
            div.setAttribute("data-movie", movie.id);
            div.addEventListener('click', app.getRecommended);
            div.classList.add('movie');
            div.textContent = movie.title;

            let img = document.createElement('img');
            img.setAttribute("poster-movie", movie.poster_path);
            img.setAttribute("alt", "movie poster");
            img.src = "".concat(baseImageUrl, 'w500/', movie.poster_path);
            img.classList.add('poster');
            div.appendChild(img);

            let movieDes = document.createElement('movieDes');
            movieDes.classList.add('movie-desc');
            movieDes.setAttribute("id", "movieDes");
            movieDes.textContent = movie.overview;
            div.appendChild(movieDes);
            
            let releaseDate = document.createElement('releaseDate');
            releaseDate.setAttribute("id", "releaseDate");
            releaseDate.textContent = "Release Date: " + movie.release_date;
            div.appendChild(releaseDate);

            let rating = document.createElement('rating');
            rating.setAttribute("id", "rating");
            rating.textContent = "Movie score: " + movie.vote_average + "/10";
            div.appendChild(rating);

            df.appendChild(div);

        });
        section.appendChild(df);
    },

    back: function (movies) {
        
        location.reload(true);
      
        
        
    },

};


document.addEventListener('DOMContentLoaded', app.init);


//wait for DOMContent loaded event
//fetch the configuration info for image locations and sizes
//focus on the text field
//listen for click on the search button
//listen for keypress and <enter> or <return>

//after the click / <enter> press run a fetch
//results come back from the fetch
//show the movie results page
//loop through the results and build <div>s.

//make something in the div clickable
//get the id from the clickable element
//fetch the recommendations based on the movie id


//******************* URLS NEEDED ******************
// Search movie
// Movie reccomendations
// configuration??
