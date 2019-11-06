import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  //이 함수가 약간의 시간의 걸리므로 끝날때까지 기다려 달라고 지정해주는것 async
  getMovies = async () => {
    //await를 통해 정확히 어떤걸 기다려야 되는지 지정
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    //둘다 똑같은 동작
    //this.setState({movies: movies});
    this.setState({ movies, isLoading: false });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    //javascript안에서 class를 지정할때 javascript안에서의 class와 헷갈려하므로(충돌 비슷하게 생기므로?) className으로 지정해줌.......
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;
