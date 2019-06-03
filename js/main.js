
//creates event Listener
const eleClickMe= document.querySelector("#clickMe");
const movieLists= document.querySelector("#movieLists");
//To be able to send HTTP request to an external server. You must create the below object
const xhr = new XMLHttpRequest();
const displayPosts = () =>
{

const endPoint=`https://api.themoviedb.org/3/movie/now_playing?api_key=f064c905e826d5e04ed8a01dfa803649&language=en-US`


    // /*
    //     1st argument is the HTTP method (which can be GET, POST,PUT oR DELETE)

    //     2nd Argument is the end of the API that you want to access
    // */
 xhr.open("GET",endPoint);
 xhr.send();
 xhr.addEventListener("readystatechange",populateValues)   
};



const populateValues=()=>
{
    if(xhr.readyState==4)
    {
      const jasonData=JSON.parse(xhr.responseText);
     for (let index = 0; index < jasonData.results.length; index++) {
      let movieId=jasonData.results[index].id;
      let movieDescription = jasonData.results[index].overview.substring(0, 135);
      let dateString = new Date(jasonData.results[index].release_date);
      let dateValue = dateString.toDateString();
        let movieImage = `https://image.tmdb.org/t/p/original/${jasonData.results[index].poster_path}`
        movieLists.innerHTML += `<div class="column-style column is-vcentered is-mobile is-tablet is-desktop is-widescreen is-fullhd">
        <article class="media" data-moveId=${movieId}>
          <figure class="media-left">
            <p class="image is-128x128">
            <img src="${movieImage}"><br>
            </p>
          </figure>
          <div  class="media-content">
            <div class="content">
                <strong>${jasonData.results[index].title}</strong><br><small><i>Release Date:</i> <strong>${dateValue}</strong><br><i>Movie Rating:</i> <strong>${jasonData.results[index].vote_average}/10</strong></small>
                <div align="justify" class="div-para-style">${movieDescription}...<a><i>Read more...</i></a></div>
            </div>
          </div>
        </article>
      </div>`
     }  
    }
}
