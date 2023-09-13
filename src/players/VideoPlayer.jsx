import React, { useEffect } from "react";
import { useScript } from "../hooks/UseScript";
import VideoJS from "./VideoJs";

const VideoPlayer = ({url, thumbnail, height, width, id}) => {
    useEffect(()=>{
        var medias = Array.prototype.slice.apply(document.querySelectorAll('audio,video'));
            medias.forEach(function(media) {
            media.addEventListener('play', function(event) {
                medias.forEach(function(media) {
                if(event.target != media) media.pause();
                });
            });
        });
    },[])

    const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
     fluid: true,
    sources: [{
      src: url,
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    // player.on('waiting', () => {
    //   videojs.log('player is waiting');
    // });

    // player.on('dispose', () => {
    //   videojs.log('player will dispose');
    // });
  };

  //  const script = useScript("https://unpkg.com/video.js@8.3.0/dist/video.min.js")
       return(<div style={{width:width}}>
                  {/* <video
                    id="my-player"
                     className="video-js vjs-theme-sea vjs-16-9"
                    controls
                    preload="auto"
                   
                    data-setup='{"fluid" : true }'
                    aspectRatio="16:9"
                >
                    <source src={url} type="video/mp4" />
                    <source src={url} type="video/webm" />
                    <source src={url} type="video/ogg"></source>
                    <p className="vjs-no-js">
                    To view this video please enable JavaScript, and consider upgrading to a
                    web browser that
                    <a href="https://videojs.com/html5-video-support/" target="_blank"
                        >supports HTML5 video</a>
                    </p>
                </video> */}
                <VideoJS options={videoJsOptions} onReady={handlePlayerReady}/>
        </div>
    )
}
export default VideoPlayer;