const videoContainer = document.getElementById("videoContainer");
const randomButton = document.getElementById("randomButton");
const loadMoreButton = document.getElementById("loadMoreButton");

let videosLoaded = 0;

randomButton.addEventListener("click", loadRandomVideos);
loadMoreButton.addEventListener("click", loadRandomVideos);

function loadRandomVideos() {
  const videosToLoad = Math.min(4, 8 - videosLoaded);

  for (let i = 0; i < videosToLoad; i++) {
    axios.get("https://lust.scathach.id/xvideos/random")
      .then(response => {
        const data = response.data;
        if (data.success && data.data) {
          const embedUrl = data.assets[0];
          if (embedUrl) {
            const videoDiv = document.createElement("div");
            videoDiv.classList.add("video-card");

            const randomVideoEmbed = document.createElement("iframe");
            randomVideoEmbed.classList.add("random-video-embed");
            randomVideoEmbed.src = embedUrl;
            randomVideoEmbed.frameBorder = "0";
            randomVideoEmbed.allowFullscreen = true;

            const randomVideoTitle = document.createElement("p");
            randomVideoTitle.classList.add("random-video-title");
            randomVideoTitle.textContent = data.data.title || "No title available";

            videoDiv.appendChild(randomVideoEmbed);
            videoDiv.appendChild(randomVideoTitle);
            videoContainer.appendChild(videoDiv);
          }
        }
      })
      .catch(error => {
        console.error("API request error:", error);
      });

    videosLoaded++;
    if (videosLoaded >= 8) {
      loadMoreButton.style.display = "none";
      break;
    }
  }
}
