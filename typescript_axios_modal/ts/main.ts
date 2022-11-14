import axios from "axios";
import { IMovie } from "./models/IMovie";
import { IMovieExtended } from "./models/IMovieExtended";
import { IOmbdResponse } from "./models/IOmbdResponse";

axios.get<IOmbdResponse>("http://omdbapi.com?apikey=416ed51a&s=life")
.then((response) => {
    console.log(response.data.Search);
    createHTML(response.data.Search);
});

const createHTML = (movies:IMovie[]) => {
    console.log(movies)
    for (let i=0; i<movies.length; i++) {
        console.log(movies[i].Title);

        let container: HTMLDivElement = document.createElement("div");
        let title: HTMLHeadingElement = document.createElement("h3");
        let img: HTMLImageElement = document.createElement("img");

        container.addEventListener("click", () => {
            handleClick(movies[i]);
        });

        title.innerHTML=movies[i].Title;
        img.src = movies[i].Poster;
        img.alt = movies[i].Title

    container.setAttribute("data-bs-toggle", "modal");
    container.setAttribute("data-bs-target", "#exampleModal");
    container.appendChild(title);
    container.appendChild(img);

    document.body.appendChild(container);
    }
};

const handleClick = (movie:IMovie) => {
    console.log("du klickade på: ", movie.imdbID);

    axios.get<IMovieExtended>("http://omdbapi.com?apikey=416ed51a&i=" +movie.imdbID)
    .then((response) => {
        console.log(response.data)

        let modalTitle: HTMLHeadingElement = document.getElementById("exampleModalLabel") as HTMLHeadingElement;
        modalTitle.innerHTML=movie.Title;

        let modalBody: HTMLDivElement = document.getElementById("modal-body") as HTMLDivElement;
        modalBody.innerHTML = " ";

        let img: HTMLImageElement = document.createElement("img");
      let plot: HTMLParagraphElement = document.createElement("p");
      let release: HTMLParagraphElement = document.createElement("p");
      let director: HTMLHeadingElement = document.createElement("h4");

      img.src = response.data.Poster;
      plot.innerHTML=response.data.Plot;
      release.innerHTML=response.data.Released;
      director.innerHTML=response.data.Director;

      modalBody.appendChild(img);
      modalBody.appendChild(plot);
      modalBody.appendChild(release);
      modalBody.appendChild(director);

    })
}