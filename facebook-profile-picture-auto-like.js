// ==UserScript==
// @name          FB Profile Picture Auto Like
// @namespace     http://test
// @description   auto facebook like<br>this script like first 60 post in your wall in facebook, its liking post with random time , so facebook cant detect you as spam<br><br><a href="http://silverboy.ir" rel="nofollow">http://silverboy.ir</a>
		
// @include     /^https?://www\.facebook\.com/.*
// @require       http://code.jquery.com/jquery-1.8.0.min.js
// @grant       none
// @version 0.0.1.20150114051653
// ==/UserScript==
console.log("running");

var ppage = sessionStorage.getItem("ppage");
if (!ppage) { // run this only once per page
    console.log("############### THIS RUNS ONLY ONCE PER PAGE ###############");
    sessionStorage.setItem("ppage",true);
    jQuery(document).ready(function($) {
        console.log("jQuery is ready");
        setTimeout(function(){
            console.log(">>> NOW LIKE PROFILE PIC ;)");
            like_profile_pic();
        }, 2000);
    });
    
    
}





var timerstop = sessionStorage.getItem("timerstop");
if (!timerstop) { // run this only once
    var myVar = setInterval(function () {GotoNextURL()}, 12000);
}
var alreadyRun = sessionStorage.getItem("runonce");
if (!alreadyRun) { // run this only once
    sessionStorage.setItem("runonce",true);
    sessionStorage.setItem("friends","friend1;friend2;friend3");
    //vist_friend(aFriends[0]); // start with first friend
}


function stopTimer(){
    clearTimeout(myVar);
    console.log("Timer stopped!");
    sessionStorage.setItem("timerstop",true);
        // print report
        var sRep = sessionStorage.getItem("report");
        var aRep = sRep.split(";");
        console.log(aRep);
}
function GotoNextURL() {
    console.log("GotoNextUrl");
    
    // get all friends
    var sFriends = sessionStorage.getItem("friends"); 
    var aFriends = sFriends.split(';');
    
    // set profile
    var sCurrProfil;
    if(!sessionStorage.getItem("currProfile")){ // set first profile
        sCurrProfil = aFriends[0];
        sessionStorage.setItem("currProfile",sCurrProfil);
    }else{ //  get next profile
        sCurrProfil = sessionStorage.getItem("currProfile");
        // idx next profile
        var idx = aFriends.indexOf(sCurrProfil)+1;
        // set next profile
        sCurrProfil = aFriends[idx];
        sessionStorage.setItem("currProfile",sCurrProfil);
    }
    console.log(">>> profile ist set to: "+sCurrProfil);
    //alert("current profile ist set to:"+sCurrProfil);
    
    var iAllF = aFriends.length;
    var iIdxF = aFriends.indexOf(sCurrProfil);
    
    
    location.href   = "https://www.facebook.com/"+sCurrProfil;
    sessionStorage.removeItem("ppage"); // set this false to run code when ppage loaded!
    
  
    
    iIdxF++;
    //alert(" current index:"+iIdxF+"/"+iAllF);
    if (iIdxF >= iAllF){ // end of profiles
        stopTimer();    
    }
}

function like_profile_pic(){
    jQuery(document).ready(function($) {
            $('.profilePicThumb')[0].click();
            jQuery(document).ready(function($) {
                setTimeout(function(){
                    console.log("checking likes...");
                    check_likes();
                    // close window
                    $('.fbPhotoSnowliftControls .closeTheater').first()[0].click();
                }, 2000);
            });
    });
}
function check_likes(){
	// get likes
	var likes = parseInt($('.uiScrollableAreaContent .uiUfi .UFILikeSentence .UFINoWrap').text());
	var isLiked;
	if( $('.uiScrollableAreaContent .uiUfi .UFILikeSentence span:contains(You)').length ){
	    isLiked = 1;
	}else{
	    isLiked = 0;
	}
	console.log('   like count: '+likes);
	console.log('liked from me: '+isLiked);
    // like if >4
    if(likes>4 && isLiked==0){
        $('.uiScrollableAreaContent .UIActionLinks .UFILikeLink')[0].click();
        console.log("pic liked! (:");
        var sCurrProfil = sessionStorage.getItem("currProfile");
        var report = sessionStorage.getItem("report");
        report += "PPic liked from: "+sCurrProfil+";";
        sessionStorage.setItem("report",report);
    }
}


// create menu
$('body').append('<ul id=menu><li><a id="menu_a" role="button" class="_42ft _4jy0 _4jy4"> Action 1 </a><li><a id="menu_b" role="button" class="_42ft _4jy0 _4jy4"> Action 2 </a><li><a id="menu_c" role="button" class="_42ft _4jy0 _4jy4"> Action 3 </a></ul>');
$('#menu').css({ 
	"position": "fixed",
	"right": 0,
	"top": "50%",
	"margin-top": "-2.5em",
	"z-index":99999,
	"background-color":"black"
});
function reload(){
    sessionStorage.clear();
    location.href='https://www.facebook.com';
}
$('#menu_a').attr('href', 'javascript:void(0)').click(function(){like_profile_pic()})
$('#menu_b').attr('href', 'javascript:void(0)').click(function(){reload()})
$('#menu_c').attr('href', 'javascript:void(0)').click(function(){stopTimer()})

/* ######### NOT IN USE ######### */
function get_friend_list(){
    var friends = "";
    $('a._5q6s').each(function( index ) { 
    var sUrl = $(this)[0].href;
    var aUrl = sUrl.split("?");
    sUrl = aUrl[0];
    aUrl = sUrl.split("com/");
    sUrl = aUrl[1];
    //console.log(sUrl);
    friends+=sUrl+";";
    //$(':nth-child(3) a span', this).text().trim();
    //console.log($(this).attr("href"));
    //console.log('----');
    });
    console.log(friends);
}