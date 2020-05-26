import YOUTUBE_API_KEY from "../config/youtube.js";
import exampleVideoData from "../data/exampleVideoData.js";
import Search from "./Search.js";
import VidioPlayer from "./VideoPlayer.js";
import VideoList from "./VideoList.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: exampleVideoData[0],
      videos: exampleVideoData,
      query: "cat",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  componentDidMount() {
    this.fetchVideos();
  }

  fetchVideos() {
    let options = {
      key: YOUTUBE_API_KEY,
      query: this.state.query,
      max: 5,
    };
    console.log(this.state.query);
    this.props.searchYouTube(options, (data) =>
      this.setState({
        videos: data,
        video: data[0],
      })
    );
  }

  handleClick(video) {
    this.setState({
      video: video,
    });
  }

  handleQuery(e) {
    this.setState(
      {
        query: e.target.value,
      },
      () => this.fetchVideos()
    );
  }

  handleSearchClick() {
    this.fetchVideos();
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div>
              <Search
                handleSearchClick={this.handleSearchClick}
                handleQuery={this.handleQuery}
              />
            </div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div>
              <VidioPlayer video={this.state.video} />
            </div>
          </div>
          <div className="col-md-5">
            <div>
              <VideoList
                videos={this.state.videos}
                handleClick={this.handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
