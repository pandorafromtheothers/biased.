//reader writer van, cool
let initPosition = '0px';

function InitalizeAlbum() {
    let artist = document.getElementById('artist');
    let album = document.getElementById('title');
    if ((artist.value === '') || (album.value === '')) {
        alert('nincs kitölve valami');
    }
    else {
        let group = document.getElementById('labelgroup');
        let artistlbl = document.getElementById('artistLbl');
        let albumlbl = document.getElementById('albumLbl');

        let initbutton = document.getElementById('initAlbum');
        let addtrackbutton = document.getElementById('addtrack');

        artistlbl.textContent = artist.value;
        albumlbl.textContent = album.value;
        group.style.paddingTop = '0%';
        artist.setAttribute('class', 'invisbruh');
        album.setAttribute('class', 'invisbruh');
        initbutton.setAttribute('class', 'invisbruh');
        addtrackbutton.setAttribute('class', 'addbutton');
        CreateButtons();
    }
    // loadClient(); !!FONTOS SPOTIFY APIHOZ
}
function LetterSelected(e) {
    e.parentNode.previousSibling.previousSibling.textContent = "";
    e.parentNode.parentNode.childNodes[4].childNodes[0].textContent = e.textContent;
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
function DeleteParent(e) {
    if (confirm('Biztos törlöd bro?')) {
        e.parentNode.parentNode.remove();
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
        'final_rating': finalRating / musicaltracks *10
    }
    alert(
        "Artist: " + mainObj.artist + '\n'+
        "Album: " + mainObj.album + '\n'+
        "Interludes: " + mainObj.Interludes + '\n'+
        "Bangers: " + mainObj.Bangers + '\n'+
        "Mid: " + mainObj.Mid + '\n'+
        "Bad: "+mainObj.Bad + '\n'+
        "final_rating: " + mainObj.final_rating);
        // JSON.stringify(mainObj)
    // Download(mainObj);
}
function Download(obj) {
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = obj.artist + '-' + obj.album + '.json';
    a.href = url;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}