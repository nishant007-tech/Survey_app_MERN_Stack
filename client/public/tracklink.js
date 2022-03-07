function tracklink(){
    var link = document.getElementById("openBtn");
    var link2 = document.getElementById("openBtn1");
    console.log(link,link2)
    window.sendinblue.trackLink(link);
    window.sendinblue.trackLink(link2);
  };
  tracklink();
