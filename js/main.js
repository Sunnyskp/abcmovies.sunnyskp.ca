
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

      let movieImage = `https://image.tmdb.org/t/p/original/${jasonData.results[index].poster_path}`
        movieLists.innerHTML += `<div class="column-style column is-vcentered is-mobile is-tablet is-desktop is-widescreen is-fullhd">
        <article class="media">
          <figure class="media-left">
            <p class="image is-128x128">
            <img src="${movieImage}"><br>
            </p>
          </figure>
          <div  class="media-content">
            <div class="content">
              <p>
                <strong>${jasonData.results[index].title}</strong><br>
                <div>${jasonData.results[index].overview}</div>
              </p>
            </div>
          </div>
        </article>
      </div>`
      
    // document.getElementById(`movieLists`).innerHTML+=jasonData.results[index].title;
     }
        
        
        
     
      
    }

}