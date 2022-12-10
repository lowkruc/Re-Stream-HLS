const NodeMediaServer = require("node-media-server");

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    mediaroot: "media/",
    port: 8000,
    allow_origin: "*",
  },
  fission: {
    ffmpeg: "/ffmpeg/bin/ffmpeg.exe",
    tasks: [
      {
        rule: "live/*",
        model: [
          {
            ab: "192k",
            vb: "5000k",
            vs: "1080x1920",
            vf: "60",
          },
          {
            ab: "128k",
            vb: "2800k",
            vs: "720x1280",
            vf: "30",
          },
          {
            ab: "64k",
            vb: "1400k",
            vs: "480x854",
            vf: "24",
          },
          {
            ab: "32k",
            vb: "800k",
            vs: "360x640",
            vf: "20",
          },
        ],
      },
    ],
  },
};
var nms = new NodeMediaServer(config);
nms.run();
