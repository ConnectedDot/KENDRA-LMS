// import * as React from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
// import 'videojs-youtube';

// interface IVideoPlayerProps {
//   options: videojs.PlayerOptions;
// }

// const initialOptions: videojs.PlayerOptions = {
//   controls: true,
//   fluid: true,
//   controlBar: {
//     volumePanel: {
//       inline: false,
//     },
//   },
// };

// const VideoPlayer: React.FC<IVideoPlayerProps> = ({ options }) => {
//   const videoNode = React.useRef<HTMLVideoElement>(null);
//   const player = React.useRef<videojs.Player | null>(null);

//   React.useEffect(() => {
//     if (videoNode.current) {
//       player.current = videojs(videoNode.current, {
//         ...initialOptions,
//         ...options,
//       });

//       // Add YouTube plugin support
//       if (options.sources && options.sources[0].src.includes('youtube.com')) {
//         player.current.src({
//           type: 'video/youtube',
//           src: options.sources[0].src,
//         });
//       }
//     }

//     return () => {
//       if (player.current) {
//         player.current.dispose();
//         player.current = null;
//       }
//     };
//   }, [options]);

//   return (
//     <div data-vjs-player>
//       <video ref={videoNode} className="video-js" />
//     </div>
//   );
// };

// export default VideoPlayer;

import React from 'react';

const index = () => {
  return <div>index</div>;
};

export default index;
