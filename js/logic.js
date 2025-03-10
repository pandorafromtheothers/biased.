if ((chrome.runtime != undefined) || (chrome.runtime != null)) {
    chrome.runtime.onMessage.addListener((e) => {
        let data = e.message;
        if ((data == undefined) || (data == null))
            return Promise.reject();
        InitalizeAlbum(data.artist, data.album, data.tracks);
        return Promise.resolve();
    });
}

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
        let _ratinglbl = document.getElementById('ratingLbl');

        let _initbutton = document.getElementById('initAlbum');
        let _addtrackbutton = document.getElementById('addtrack');

        _artistlbl.textContent = _artist;
        _albumlbl.textContent = _album;
        _ratinglbl.textContent = "0/10";
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
            document.getElementById('ratingLbl').textContent = ShowRating(false).final_rating + "/10";
        }
    }
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
    document.getElementById('ratingLbl').textContent = ShowRating(false).final_rating + "/10";
}
function ShowRating(showAlert = true) {
    let _tracks = document.getElementById('Inserted').childNodes;
    let _artistlbl = document.getElementById('artistLbl').textContent;
    let _albumlbl = document.getElementById('albumLbl').textContent;
    var _array = Array.from(_tracks);
    var _jObj;
    var _jArray = [];
    var _result = {};
    let _trackrating;
    let _interlude = false;
    let _finalRating = 0.0;
    let _musicaltracks = 0;
    _array = _array.filter(x => x.id === 'track');
    _array.forEach(element => {
        trackName = element.childNodes[4].childNodes[0].textContent;
        _trackrating = element.childNodes[4].slot;
        if (_trackrating === '-1') {
            _interlude = true;
            _trackrating = 0;
        }
        else {
            _interlude = false;
            _musicaltracks += 1;
        }
        _finalRating += parseFloat(_trackrating);
        _jObj = {
            'track_namestart': trackName,
            'track_rating': _trackrating,
            'interlude': _interlude
        };
        _jArray.push(_jObj);
    });
    _result = {
        'artist': _artistlbl,
        'album': _albumlbl,
        // 'tracks': jArray,
        'Bangers': _jArray.filter(e => e.track_rating == 1).length,
        'Mid': _jArray.filter(e => e.track_rating == 0.5).length,
        'Bad': _jArray.filter(e => e.track_rating == 0 && e.interlude == false).length,
        'Interludes': _jArray.filter(e => e.interlude == true).length,
        'final_rating': (_finalRating / _musicaltracks * 10).toFixed(2)
    }
    if (showAlert)
        alert(
            "Artist: " + _result.artist + '\n' +
            "Album: " + _result.album + '\n' +
            "Interludes: " + _result.Interludes + '\n' +
            "Bangers: " + _result.Bangers + '\n' +
            "Mid: " + _result.Mid + '\n' +
            "Bad: " + _result.Bad + '\n' +
            "final_rating: " + _result.final_rating);
    return _result;
}

window.addEventListener("load", function () {
    document.getElementById("rate-btn").onclick = () => { ShowRating() };
    document.getElementById("initAlbum").onclick = () => { InitalizeAlbum() };
    document.getElementById("addtrack").onclick = () => { CreateButtons() };
});
window.addEventListener("keydown", function (e) {
    if (e.key = "c") {
        let _list = document.querySelectorAll("button[value='-1']").forEach(e => {
            e.click();
        });
    }
})