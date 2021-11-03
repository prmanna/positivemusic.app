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
let filter_key = "relax";
let last_button_id = filter_key;

// Define the tracks that have to be played
let relax_tracks = [
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626869795/relax/FREE_ROYALTY_FREE_RELAXING_MUSIC_by_Liborio_Conti_No_Copyright__20m_00s__30m_00s_xpmteu.mp3",
    url: "https://www.youtube.com/watch?v=yFFk1gxlgt0"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626869780/relax/FREE_ROYALTY_FREE_RELAXING_MUSIC_by_Liborio_Conti_No_Copyright__30m_00s__40m_00s_fjulnl.mp3",
    url: "https://www.youtube.com/watch?v=yFFk1gxlgt0"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626869776/relax/FREE_ROYALTY_FREE_RELAXING_MUSIC_by_Liborio_Conti_No_Copyright__00m_00s__10m_00s_rh4g1a.mp3",
    url: "https://www.youtube.com/watch?v=yFFk1gxlgt0"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626869772/relax/FREE_ROYALTY_FREE_RELAXING_MUSIC_by_Liborio_Conti_No_Copyright__40m_00s__50m_00s_ngdso4.mp3",
    url: "https://www.youtube.com/watch?v=yFFk1gxlgt0"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626869770/relax/FREE_ROYALTY_FREE_RELAXING_MUSIC_by_Liborio_Conti_No_Copyright__10m_00s__20m_00s_str9ge.mp3",
    url: "https://www.youtube.com/watch?v=yFFk1gxlgt0"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626871806/relax/Soft_Piano_Music_For_Relaxation___Snowing_Background___Relax_Music_Meditation-DRnyxlaqqLk_30m_00s__40m_00s_crowdr.mp3",
    url: "https://www.youtube.com/watch?v=DRnyxlaqqLk"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626871804/relax/Soft_Piano_Music_For_Relaxation___Snowing_Background___Relax_Music_Meditation-DRnyxlaqqLk_00m_00s__10m_00s_rmjgvk.mp3",
    url: "https://www.youtube.com/watch?v=DRnyxlaqqLk"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626871798/relax/Soft_Piano_Music_For_Relaxation___Snowing_Background___Relax_Music_Meditation-DRnyxlaqqLk_20m_00s__30m_00s_mvz8kb.mp3",
    url: "https://www.youtube.com/watch?v=DRnyxlaqqLk"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626871799/relax/Soft_Piano_Music_For_Relaxation___Snowing_Background___Relax_Music_Meditation-DRnyxlaqqLk_10m_00s__20m_00s_rvanze.mp3",
    url: "https://www.youtube.com/watch?v=DRnyxlaqqLk"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626871798/relax/Soft_Piano_Music_For_Relaxation___Snowing_Background___Relax_Music_Meditation-DRnyxlaqqLk_70m_00s__80m_00s_yk1ior.mp3",
    url: "https://www.youtube.com/watch?v=DRnyxlaqqLk"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626871797/relax/Soft_Piano_Music_For_Relaxation___Snowing_Background___Relax_Music_Meditation-DRnyxlaqqLk_60m_00s__70m_00s_dsae6m.mp3",
    url: "https://www.youtube.com/watch?v=DRnyxlaqqLk"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626871796/relax/Soft_Piano_Music_For_Relaxation___Snowing_Background___Relax_Music_Meditation-DRnyxlaqqLk_40m_00s__50m_00s_crnlwn.mp3",
    url: "https://www.youtube.com/watch?v=DRnyxlaqqLk"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626871791/relax/Soft_Piano_Music_For_Relaxation___Snowing_Background___Relax_Music_Meditation-DRnyxlaqqLk_50m_00s__60m_00s_o6atcq.mp3",
    url: "https://www.youtube.com/watch?v=DRnyxlaqqLk"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626872306/relax/Free_relaxing_music_No_Copyrights_-CbN1tDSmD2s_00m_00s__10m_00s_kn8yas.mp3",
    url: "https://www.youtube.com/watch?v=CbN1tDSmD2s"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626872306/relax/Free_relaxing_music_No_Copyrights_-CbN1tDSmD2s_40m_00s__50m_00s_kpjqzc.mp3",
    url: "https://www.youtube.com/watch?v=CbN1tDSmD2s"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626872306/relax/Free_relaxing_music_No_Copyrights_-CbN1tDSmD2s_50m_00s__60m_00s_dfemox.mp3",
    url: "https://www.youtube.com/watch?v=CbN1tDSmD2s"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626872305/relax/Free_relaxing_music_No_Copyrights_-CbN1tDSmD2s_20m_00s__30m_00s_nlr6kz.mp3",
    url: "https://www.youtube.com/watch?v=CbN1tDSmD2s"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626872302/relax/Free_relaxing_music_No_Copyrights_-CbN1tDSmD2s_30m_00s__40m_00s_t1aonr.mp3",
    url: "https://www.youtube.com/watch?v=CbN1tDSmD2s"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626872299/relax/Free_relaxing_music_No_Copyrights_-CbN1tDSmD2s_10m_00s__20m_00s_qguewg.mp3",
    url: "https://www.youtube.com/watch?v=CbN1tDSmD2s"
  },
  {
    name: "7",
    artist: "7",
    category: "relax",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626872297/relax/Free_relaxing_music_No_Copyrights_-CbN1tDSmD2s_60m_00s__64m_00s_15h_zr8kiv.mp3",
    url: "https://www.youtube.com/watch?v=CbN1tDSmD2s"
  },
];
let focus_tracks = [
  {
    name: "5",
    artist: "5",
    category: "focus",
    image: "https://cdn.pixabay.com/photo/2017/04/08/22/26/buddhism-2214532__340.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623689596/focus/Almusic34-Harmony-in-the-night_vrzymr.mp3",
    url: ""
  },
  {
    name: "6",
    artist: "6",
    category: "focus",
    image: "https://www.mcislanguages.com/website/wp-content/uploads/iStock-1161561165.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623689573/focus/Cambo-4-Focus_gwp5xh.mp3",
    url: ""
  },
  {
    name: "7",
    artist: "7",
    category: "focus",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623689561/focus/Cambo-2-Breathe_mntif1.mp3",
    url: ""
  },
  {
    name: "7",
    artist: "7",
    category: "focus",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623689541/focus/Almusic34-Peace-landscape_hlhbya.mp3",
    url: ""
  },
  {
    name: "7",
    artist: "7",
    category: "focus",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623689538/focus/Cambo-1-Welcome_eq3q21.mp3",
    url: ""
  },
  {
    name: "7",
    artist: "7",
    category: "focus",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623689532/focus/Almusic34-Journey-in-the-wind_t4puml.mp3",
    url: ""
  },
  {
    name: "7",
    artist: "7",
    category: "focus",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623689524/focus/Cambo-3-Love-Yourself_krhpqk.mp3",
    url: ""
  },
  {
    name: "7",
    artist: "7",
    category: "focus",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626961380/focus/Best_Deep_Focus_Background_Music_For_Studying_and_Work_20m_00s__30m_00s_umxsyg.mp3",
    url: "https://www.youtube.com/watch?v=vsHxaj1s5mE"
  },
  {
    name: "7",
    artist: "7",
    category: "focus",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626961379/focus/Best_Deep_Focus_Background_Music_For_Studying_and_Work_30m_00s__40m_00s_kvweua.mp3",
    url: "https://www.youtube.com/watch?v=vsHxaj1s5mE"
  },
  {
    name: "7",
    artist: "7",
    category: "focus",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626961379/focus/Best_Deep_Focus_Background_Music_For_Studying_and_Work_10m_00s__20m_00s_sutpyz.mp3",
    url: "https://www.youtube.com/watch?v=vsHxaj1s5mE"
  },
  {
    name: "7",
    artist: "7",
    category: "focus",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626961365/focus/Best_Deep_Focus_Background_Music_For_Studying_and_Work_50m_00s__60m_00s_ymgii5.mp3",
    url: "https://www.youtube.com/watch?v=vsHxaj1s5mE"
  },
  {
    name: "7",
    artist: "7",
    category: "focus",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626961364/focus/Best_Deep_Focus_Background_Music_For_Studying_and_Work_00m_00s__10m_00s_eftp55.mp3",
    url: "https://www.youtube.com/watch?v=vsHxaj1s5mE"
  },
  {
    name: "7",
    artist: "7",
    category: "focus",
    image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/what_happens_to_your_body_when_you_relax_slideshow/1800x1200_what_happens_to_your_body_when_you_relax_slideshow.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1626961356/focus/Best_Deep_Focus_Background_Music_For_Studying_and_Work_40m_00s__50m_00s_iboxkq.mp3",
    url: "https://www.youtube.com/watch?v=vsHxaj1s5mE"
  },
];
let electronic_tracks = [
  {
    name: "4",
    artist: "4",
    category: "electronic",
    image: "https://images.unsplash.com/photo-1505673542670-a5e3ff5b14a3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmlnaHQlMjBza3l8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623694399/electronic/Mr.ruiZ_-_Artic_Air.mp3_cn7ovl.mp3",
    url: ""
  },
  {
    name: "4",
    artist: "4",
    category: "electronic",
    image: "https://i.pinimg.com/originals/9b/e6/bb/9be6bbc89b5b18f0f99e177eff62edd1.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623694397/electronic/Mr.ruiZ_-_Lifeforce_9.mp3_xkbgmp.mp3",
    url: ""
  },
  {
    name: "4",
    artist: "4",
    category: "electronic",
    image: "https://i.ytimg.com/vi/1bLTSokZHsU/maxresdefault.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623694397/electronic/Mr.ruiZ_-_Winter_Wandering.mp3_etbbgn.mp3",
    url: ""
  },
  {
    name: "4",
    artist: "4",
    category: "electronic",
    image: "https://video.fsetyt.com/wp-content/uploads/2019/07/1562331127_maxresdefault_live.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623694396/electronic/Mr.ruiZ_-_Daddy_s_Outta_Town.mp3_yuugkp.mp3",
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
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623694402/electronic/Mr.ruiZ_-_Beach_Ballin_.mp3_flqxjg.mp3",
    url: ""
  },
  {
    name: "4",
    artist: "4",
    category: "nature",
    image: "https://assets.hongkiat.com/uploads/nature-photography/autumn-poolside.jpg",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623694402/electronic/Mr.ruiZ_-_A_Rush_Of_Blood_To_The_Heart.mp3_r18efu.mp3",
    url: ""
  },
  {
    name: "4",
    artist: "4",
    category: "nature",
    image: "https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1623694401/electronic/Mr.ruiZ_-_Take_A_Breath.mp3_wgkzs0.mp3",
    url: ""
  },
];
let sleep_tracks = [
  {
    name: "1",
    artist: "1",
    category: "relax",
    image: "https://images.everydayhealth.com/images/emotional-health/meditation/a-complete-guide-to-meditation-722x406.jpg?sfvrsn=e47f03cd_0",
    path: "https://res.cloudinary.com/dbkbw1o6v/video/upload/v1625678507/sleep/Relaxing_010m_00s__020m_00s_onywww.mp3",
    url: ""
  },
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

  document.getElementById("focus").style.background = "black";
  document.getElementById("relax").style.background = "black";
  document.getElementById("electronic").style.background = "black";
  document.getElementById("nature").style.background = "black";
  document.getElementById("sleep").style.background = "black";

  document.getElementById("focus").style.color = "white";
  document.getElementById("relax").style.color = "white";
  document.getElementById("electronic").style.color = "white";
  document.getElementById("nature").style.color = "white";
  document.getElementById("sleep").style.color = "white";

  document.getElementById(e).style.background = "white";
  document.getElementById(e).style.color = "black";
  document.getElementById(e).style.backgroundImage = "url('https://res.cloudinary.com/dbkbw1o6v/image/upload/v1626867748/images/cool-background_iumcjq.png')";

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


