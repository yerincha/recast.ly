var searchYouTube = (options, callback) => {
  // TODO
  $.ajax({
    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${options.max}&q=${options.query}&key=${options.key}`,
    type: "GET",
    contentType: "application/json",
    success: (data) => {
      callback(data.items);
    },
    error: function (error) {
      console.error("Failed to search", error);
    },
  });
};

export default searchYouTube;
