import { useEffect } from "react";
import { useScript } from "../hooks/UseScript";

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
    const script = useScript("https://unpkg.com/video.js@8.3.0/dist/video.min.js")
       return(<>
                  <video
                    id="my-player"
                     className="video-js vjs-theme-sea"
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
                </video>
        </>
    )
}
export default VideoPlayer;