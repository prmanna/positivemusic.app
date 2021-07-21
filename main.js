let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// let curr_track = document.querySelector(".focus-song");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');


let track_list = [];
let filter_key = "focus";

// Define the tracks that have to be played
let focus_tracks = [
  {
    name: "1",
    artist: "1",
    category: "focus",
    image: "https://images.unsplash.com/photo-1594138029756-fe257377853b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1625678517/sleep/Relaxing_050m_00s__060m_00s_uzdsqi.mp3",
    url: ""
  },
  {
    name: "1",
    artist: "1",
    category: "focus",
    image: "https://cdn-scraplogo.pearltrees.com/38/48/38486e1e53e4ea217fe4302a84623c94-pearlsquare.jpg?v=2019-16-09",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1625678512/sleep/Relaxing_020m_00s__030m_00s_k5y4du.mp3",
    url: ""
  },
  {
    name: "1",
    artist: "1",
    category: "focus",
    image: "https://images.unsplash.com/photo-1594457841637-ee1a4f1e754c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1625678511/sleep/Relaxing_030m_00s__040m_00s_kg3cnm.mp3",
    url: ""
  },
  {
    name: "1",
    artist: "1",
    category: "focus",
    image: "https://images.unsplash.com/photo-1506533159314-92937d1ea0f3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1625678510/sleep/Relaxing_000m_00s__010m_00s_jiir17.mp3",
    url: ""
  },
];
let relax_tracks = [
  {
    name: "1",
    artist: "1",
    category: "relax",
    image: "https://images.everydayhealth.com/images/emotional-health/meditation/a-complete-guide-to-meditation-722x406.jpg?sfvrsn=e47f03cd_0",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1625678507/sleep/Relaxing_010m_00s__020m_00s_onywww.mp3",
    url: ""
  },
  {
    name: "5",
    artist: "5",
    category: "relax",
    image: "https://cdn.pixabay.com/photo/2017/04/08/22/26/buddhism-2214532__340.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623689541/focus/Almusic34-Peace-landscape_hlhbya.mp3",
    url: ""
  },
  {
    name: "6",
    artist: "6",
    category: "relax",
    image: "https://www.mcislanguages.com/website/wp-content/uploads/iStock-1161561165.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623689524/focus/Cambo-3-Love-Yourself_krhpqk.mp3",
    url: ""
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623689573/focus/Cambo-4-Focus_gwp5xh.mp3",
    url: ""
  },
];
let electronic_tracks = [
  {
    name: "8",
    artist: "8",
    category: "electronic",
    image: "https://musicianonamission.com/wp-content/uploads/2019/05/audio-blur-close-up-164745.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623689538/focus/Cambo-1-Welcome_eq3q21.mp3",
    url: ""
  },
  {
    name: "9",
    artist: "9",
    category: "electronic",
    image: "https://i.ytimg.com/vi/ypQZV03l80g/maxresdefault.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623689561/focus/Cambo-2-Breathe_mntif1.mp3",
    url: ""
  },
  {
    name: "1",
    artist: "1",
    category: "electronic",
    image: "https://a10.gaanacdn.com/images/occasion/web_header_image_EDM_1521097899.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623689813/relax/Nesh-Carrot-Epick_jjuuzu.mp3",
    url: ""
  },
  {
    name: "3",
    artist: "3",
    category: "electronic",
    image: "https://images.unsplash.com/photo-1549046675-dd779977de88?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZWRtfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623689596/focus/Almusic34-Harmony-in-the-night_vrzymr.mp3",
    url: ""
  },
];
let nature_tracks = [
  {
    name: "4",
    artist: "4",
    category: "nature",
    image: "https://images.unsplash.com/photo-1420593248178-d88870618ca0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3ByaW5nJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623689532/focus/Almusic34-Journey-in-the-wind_t4puml.mp3",
    url: ""
  },
  {
    name: "4",
    artist: "4",
    category: "nature",
    image: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?size=626&ext=jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623694402/instrumental/Mr.ruiZ_-_Beach_Ballin_.mp3_flqxjg.mp3",
    url: ""
  },
  {
    name: "4",
    artist: "4",
    category: "nature",
    image: "https://assets.hongkiat.com/uploads/nature-photography/autumn-poolside.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623694402/instrumental/Mr.ruiZ_-_A_Rush_Of_Blood_To_The_Heart.mp3_r18efu.mp3",
    url: ""
  },
  {
    name: "4",
    artist: "4",
    category: "nature",
    image: "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623694401/instrumental/Mr.ruiZ_-_Take_A_Breath.mp3_wgkzs0.mp3",
    url: ""
  },
];
let sleep_tracks = [
  {
    name: "4",
    artist: "4",
    category: "sleep",
    image: "https://images.unsplash.com/photo-1505673542670-a5e3ff5b14a3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmlnaHQlMjBza3l8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623694399/instrumental/Mr.ruiZ_-_Artic_Air.mp3_cn7ovl.mp3",
    url: ""
  },
  {
    name: "4",
    artist: "4",
    category: "sleep",
    image: "https://i.pinimg.com/originals/9b/e6/bb/9be6bbc89b5b18f0f99e177eff62edd1.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623694397/instrumental/Mr.ruiZ_-_Lifeforce_9.mp3_xkbgmp.mp3",
    url: ""
  },
  {
    name: "4",
    artist: "4",
    category: "sleep",
    image: "https://i.ytimg.com/vi/1bLTSokZHsU/maxresdefault.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623694397/instrumental/Mr.ruiZ_-_Winter_Wandering.mp3_etbbgn.mp3",
    url: ""
  },
  {
    name: "4",
    artist: "4",
    category: "sleep",
    image: "https://video.fsetyt.com/wp-content/uploads/2019/07/1562331127_maxresdefault_live.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623694396/instrumental/Mr.ruiZ_-_Daddy_s_Outta_Town.mp3_yuugkp.mp3",
    url: ""
  },
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadSpecificTrackList(e) {
  filter_key = e;

  if (e == "focus")
      track_list = focus_tracks;
  else if (e == "relax")
      track_list = relax_tracks;
  else if (e == "electronic")
      track_list = electronic_tracks;
  else if (e == "nature")
      track_list = nature_tracks;
  else 
      track_list = sleep_tracks;

  track_index = Math.floor((Math.random() * track_list.length));
  loadTrack(track_index);
  pauseTrack();
}

function filterTracks(tracks) {
  return tracks.category == filter_key;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  console.log(track_list[track_index]);
  track_name.textContent = "Playing Track: " + track_index;
  //track_artist.textContent = track_list[track_index].artist;
  //now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  //random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadSpecificTrackList(filter_key);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
#if 0
  if (track_index >= track_list.length - 1) {
    track_index = 0;
  } else {
    track_index += 1;
  }
#endif
  track_index = Math.floor(Math.random() * track_list.length);

  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length - 1;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


