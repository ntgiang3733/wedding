var message = "NoRightClicking";

function defeatIE() {
    if (document.all) {
        (message);
        return false;
    }
}

function defeatNS(e) {
    // if (document.layers || (document.getElementById && !document.all)) {
    //     if (e.which == 2 || e.which == 3) {
    //         (message);
    //         return false;
    //     }
    // }
}
if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown = defeatNS;
} else {
    document.onmouseup = defeatNS;
    // document.oncontextmenu = defeatIE;
}
// document.oncontextmenu = new Function("return false")

// music

const audio_music = document.getElementById("audio_music");
const on_speaker = $(".on_speaker");
const off_speaker = $(".off_speaker");
on_speaker.hide();
off_speaker.hide();
function checkSpeaker() {
    if (!audio_music.paused) {
        off_speaker.hide()
        on_speaker.show()
    } else {
        off_speaker.show()
        on_speaker.hide()
    }
}
let rolePlay = false;
$(window).on('load', function () {
    audio_music.play()
    checkSpeaker();
})
$(window).on('scroll', function () {
    if (rolePlay == false) {
        audio_music.play().then(function () {
            rolePlay = true;
            checkSpeaker();
        }).catch(error => {
            console.log("Lỗi phát âm thanh:", error);
        });
    }
})

let roleTouch = false
document.addEventListener('touchstart', function (event) {

    if (roleTouch === false) {
        audio_music.play().then(function () {
            roleTouch = true;
            checkSpeaker();
        }).catch(error => {
            console.log("Lỗi phát âm thanh:", error);
        });
        checkSpeaker()
    }
    roleTouch = true
}, false);


window.addEventListener('blur', () => {
    if (!audio_music.paused) {
        rolePlay = false;
        roleTouch = false;
        audio_music.pause()
        checkSpeaker()
    }
});




// // báº­t thá»§ cĂ´ng
let checkCurrentMusic = false;
off_speaker.click(function () {
    if ("timeMusic" in window) {
        if (checkCurrentMusic === false) {
            audio_music.play().then(() => {
                audio_music.pause();
                audio_music.currentTime = timeMusic;
                audio_music.play();
                checkCurrentMusic = true
            }).catch(error => {
                console.error("KhĂ´ng thá»ƒ phĂ¡t nháº¡c:", error);
            });
        } else {
            audio_music.play()
        }

    } else {
        audio_music.play()
    }

    checkSpeaker()

})

on_speaker.click(function () {
    audio_music.pause()
    checkSpeaker()
})



