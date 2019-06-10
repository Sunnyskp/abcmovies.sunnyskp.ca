
//creates event Listener
const eleClickMe= document.querySelector("#clickMe");
const movieLists= document.querySelector("#movieLists");
//To be able to send HTTP request to an external server. You must create the below object
const xhr = new XMLHttpRequest();
const xhr2 = new XMLHttpRequest();
const displayPosts = () =>
{

const endPoint=`https://api.themoviedb.org/3/movie/now_playing?api_key=f064c905e826d5e04ed8a01dfa803649&language=en-US`


    // /*
    //     1st argument is the HTTP method (which can be GET, POST,PUT oR DELETE)

    //     2nd Argument is the end of the API that you want to access
    // */
 xhr.open("GET",endPoint);
 xhr.send();
 xhr.addEventListener("readystatechange",populateValues,displayModal)   
};

window.onload = displayPosts;




const populateValues=()=>
{
    if(xhr.readyState==4)
    {
      const jasonData=JSON.parse(xhr.responseText);
     for (let index = 0; index < jasonData.results.length; index++) {
      let movieId=jasonData.results[index].id;
      let movieDescription = jasonData.results[index].overview;
      let movieDescriptionSubstring= movieDescription.substring(0, 135);
      let dateString = new Date(jasonData.results[index].release_date);
      let dateValue = dateString.toDateString();
        let movieImage = `https://image.tmdb.org/t/p/original/${jasonData.results[index].poster_path}`
        movieLists.innerHTML += `<div class="column-style column is-mobile is-tablet is-desktop is-widescreen is-fullhd">
        <article class="media" Id=${movieId}>
          <figure class="media-left">
            <p class="image is-128x128">
            <img src="${movieImage}"><br>
            </p>
          </figure>
          <div  class="media-content">
            <div class="content">
                <strong>${jasonData.results[index].title}</strong><br><small><i>Release Date:</i> <strong>${dateValue}</strong><br><i>Movie Rating:</i> <strong>${jasonData.results[index].vote_average}/10</strong></small>
                <div align="justify" class="div-para-style">${movieDescriptionSubstring}...<a><i>Read more...</i></a></div>
            </div>
          </div>
        </article>
      <div class="moreInfo">
      <a><i><strong>More Info...</strong></i></a>
      </div>
      </div>`
     }  
    }
}

movieLists.addEventListener(`click`, (event) => {
  let selectedMovie = event.target.closest(`.media`);
  if (!selectedMovie) return;
  let selectedMovieId= selectedMovie.id;
// getselectedMoviesAsHTML(selectedMovieId);
displayModal(selectedMovieId);
});

// const getselectedMoviesAsHTML = (receivedMovieId) => {
//   const movieEndPoint=`https://api.themoviedb.org/3/movie/${receivedMovieId}/videos?api_key=f064c905e826d5e04ed8a01dfa803649&language=en-US`
//   xhr2.open("GET",movieEndPoint);
//   xhr2.send();
//   xhr2.addEventListener("readystatechange",displayTrailer)  
//      }; 

const displayModal = (receivedMovieId) =>
{
  const jasonData=JSON.parse(xhr.responseText);
  let obj = jasonData.results.find(obj => obj.id == `${receivedMovieId}`);
  movieLists.innerHTML += `<div class="modal is-active">
  <div class="modal-background"><img src="https://image.tmdb.org/t/p/original/${obj.backdrop_path}"></div>
  <div class="modal-card  is-transparent">
  <header class="modal-card-head">
  <strong>${obj.title}</strong>
</header>
    <section class="modal-card-body">
    <article class="media" Id=${receivedMovieId}>
    <figure class="media-left">
      <p class="image is-128x128">
      <img src="https://image.tmdb.org/t/p/original/${obj.poster_path}"><br>
      </p>
    </figure>
    <div  class="media-content">
      <div class="content">
    <small><i>Release Date:</i> <strong>${obj.release_date}</strong><br><i>Movie Rating:</i> <strong>${obj.vote_average}/10</strong></small>
          <div align="justify" class="div-para-style">${obj.overview}</div>
      </div>
    </div>
  </article>
    </section>
    <footer class="modal-card-foot">
      <button onclick="location.href = '../index.html';" class="button is-link">Go Back to Home Page</button>
    </footer>
  </div>
</div>`;  
}


