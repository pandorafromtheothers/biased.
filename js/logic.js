//reader writer van, cool
let initPosition = '0px';
if ((chrome.runtime != undefined) || (chrome.runtime != null)) {
    chrome.runtime.onMessage.addListener((e) => {
        let data = e.message;
        if ((data == undefined) || (data == null))
            return Promise.reject();
        InitalizeAlbum(data.artist, data.album, data.tracks);
        return Promise.resolve();
    });
}
window.addEventListener("load", function () {
    document.getElementById("rate-btn").onclick = () => { SaveToJson() };
    document.getElementById("initAlbum").onclick = () => { InitalizeAlbum() };
    document.getElementById("addtrack").onclick = () => { CreateButtons() };
});

function InitalizeAlbum(artist_name = "", album_name = "", tracks = []) {
    let _artist = album_name == "" ? document.getElementById('artist').value : artist_name;
    let _album = album_name == "" ? document.getElementById('title').value : album_name;

    if ((_artist == "") || (_album == "")) {
        alert('nincs kitölve valami');
    }
    else {
        let _group = document.getElementById('labelgroup');
        let _artistlbl = document.getElementById('artistLbl');
        let _albumlbl = document.getElementById('albumLbl');

        let _initbutton = document.getElementById('initAlbum');
        let _addtrackbutton = document.getElementById('addtrack');

        _artistlbl.textContent = _artist;
        _albumlbl.textContent = _album;
        _group.style.paddingTop = '0%';

        document.getElementById('artist').setAttribute('class', 'invisbruh');
        document.getElementById('title').setAttribute('class', 'invisbruh');

        _initbutton.setAttribute('class', 'invisbruh');
        _addtrackbutton.setAttribute('class', 'addbutton');
        if (tracks.length == 0)
            CreateButtons();
        else {
            tracks.forEach(e => {
                CreateButtons(e);
            })
        }
    }
}
function LetterSelected(letterElement) {
    letterElement.parentNode.previousSibling.previousSibling.textContent = "";
    letterElement.parentNode.parentNode.childNodes[4].childNodes[0].textContent = letterElement.textContent;
}
function AppendTrackRating(e) {
    e.parentNode.childNodes.forEach(element => {
        if (element.id === 'raters') {
            element.classList.remove('ratingSelected-mid');
            element.classList.remove('ratingSelected-bad');
            element.classList.remove('ratingSelected-banger');
        }
    });
    e.parentNode.slot = e.value;
    switch (e.value) {
        case '0':
            e.classList.add("ratingSelected-bad");
            break;
        case '0.5':
            e.classList.add("ratingSelected-mid");
            break;
        case '1':
            e.classList.add("ratingSelected-banger");
            break;
    }
}
function SaveToJson() {
    let tracks = document.getElementById('Inserted').childNodes;
    let artistlbl = document.getElementById('artistLbl').textContent;
    let albumlbl = document.getElementById('albumLbl').textContent;
    var array = Array.from(tracks);
    var jObj;
    var jArray = [];
    var mainObj = {};
    let trackrating;
    let interlude = false;
    let finalRating = 0.0;
    let musicaltracks = 0;
    array = array.filter(x => x.id === 'track');
    array.forEach(element => {
        trackName = element.childNodes[4].childNodes[0].textContent;
        trackrating = element.childNodes[4].slot;
        if (trackrating === '-1') {
            interlude = true;
            trackrating = 0;
        }
        else {
            interlude = false;
            musicaltracks += 1;
        }
        finalRating += parseFloat(trackrating);
        jObj = {
            'track_namestart': trackName,
            'track_rating': trackrating,
            'interlude': interlude
        };
        jArray.push(jObj);
    });
    mainObj = {
        'artist': artistlbl,
        'album': albumlbl,
        // 'tracks': jArray,
        'Bangers': jArray.filter(e => e.track_rating == 1).length,
        'Mid': jArray.filter(e => e.track_rating == 0.5).length,
        'Bad': jArray.filter(e => e.track_rating == 0 && e.interlude == false).length,
        'Interludes': jArray.filter(e => e.interlude == true).length,
        'final_rating': finalRating / musicaltracks * 10
    }
    alert(
        "Artist: " + mainObj.artist + '\n' +
        "Album: " + mainObj.album + '\n' +
        "Interludes: " + mainObj.Interludes + '\n' +
        "Bangers: " + mainObj.Bangers + '\n' +
        "Mid: " + mainObj.Mid + '\n' +
        "Bad: " + mainObj.Bad + '\n' +
        "final_rating: " + mainObj.final_rating);
}