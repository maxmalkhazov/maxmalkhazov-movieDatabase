const poster      = document.querySelector(".poster"),
      info        = document.querySelector(".main--info"),
      title       = document.querySelector(".main--title"),
      tagline     = document.querySelector(".main--tagline"),
      rating      = document.querySelector(".main--rating"),
      overview    = document.querySelector(".main--overview"),
      runtime     = document.querySelector(".main--runtime"),
      aditInfo    = document.querySelector(".additional--info"),
      searchBtn   = document.querySelector(".search-btn");

window.onload = () => {
	init();
	document.querySelector(".search-field").focus();
}

searchBtn.addEventListener("click", function() {
	let searchField = document.querySelector(".search-field").value;
	let url = "https://api.themoviedb.org/3/search/movie?api_key=b99c241766327cb2935458f26027398d&query=" + searchField;
	document.querySelector(".search-field").value = "";
	fetch(url).then(response => response.json())
	.then(data => fetchURL(data));
});

const init = () => {
	fetch("https://api.themoviedb.org/3/movie/157336?api_key=b99c241766327cb2935458f26027398d")
	.then(response => response.json())
	.then(initialData => setData(initialData));
}

const setData = (data) => {
	poster.setAttribute("src", "https://image.tmdb.org/t/p/w500/" + data.poster_path);
	title.textContent = data.title + " (" + data.release_date.slice(data.release_date.length -10, data.release_date.length -6) + ")";
	tagline.textContent = data.tagline;
	rating.textContent = data.vote_average + "/10";
	overview.textContent = data.overview;
	if (data.overview.length > 450) {
		overview.style.fontSize = ".8rem";
	} else if (data.overview.length < 450) {
		overview.style.fontSize = "1rem";
	}
	runtime.textContent = data.runtime + " min";
	aditInfo.style.background = "linear-gradient(to bottom, rgba(0, 0, 0, .6), rgba(0, 0, 0, 1)),  url('https://image.tmdb.org/t/p/w500/" + data.backdrop_path + "') center/cover no-repeat";
};

const fetchURL = (data) => {
	let movieID = data.results[0].id;
	fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=b99c241766327cb2935458f26027398d`)
	.then(response => response.json())
	.then(data => setData(data));
}

