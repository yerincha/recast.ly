import Search from './Search.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';
import searchYouTube from '../lib/searchYouTube.js';
import YOUTUBE_API_KEY from "../config/youtube.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: exampleVideoData[0],
      currentVideoList: exampleVideoData
    };
    this.titleClick = this.titleClick.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.setVideoList = this.setVideoList.bind(this);
  }

  titleClick(video) {
    this.setState({
      currentVideo: video
    });
  }

  searchClick() {
    var searchKeyword = document.getElementsByClassName("form-control")['0'].value;
    var options = {type: 'video', part: 'snippet', maxResults: 5, q: searchKeyword, key: YOUTUBE_API_KEY};
    searchYouTube(options, this.setVideoList);
  }

  setVideoList(data) {
    this.setState({
      currentVideoList: data.items,
      currentVideo: data.items[0]
    });
  }

  consoleFunc(data) {
    console.log(data);
  }

  render() {
    return (<div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search searchClick={this.searchClick}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div><VideoPlayer video={this.state.currentVideo} /></div>
          </div>
          <div className="col-md-5">
            <div><VideoList titleClick={this.titleClick} videos={this.state.currentVideoList} /></div>
          </div>
        </div>
      </div>);
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
