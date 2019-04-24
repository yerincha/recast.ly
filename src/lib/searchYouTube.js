var searchYouTube = (options, callback) => {
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search`,
    type: `GET`,
    data: options,
    contentType: `application/json`,
    success: callback
  });
};


export default searchYouTube;