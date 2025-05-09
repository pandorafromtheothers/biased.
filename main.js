function getList() {
    let _result = {} || undefined;

    let _htmlList = document.querySelectorAll("ytmusic-responsive-list-item-renderer[page-type]");
    let _info = document.querySelectorAll("yt-formatted-string.ytmusic-responsive-header-renderer");
    _result.artist = _info[0].textContent;
    _result.album = _info[1].textContent;

    let _tracks = [];
    for (let index = 0; index < _htmlList.length; index++) {
        let _track = _htmlList[index].querySelector("a").textContent;
        let _score = [..._htmlList[index].querySelector("ytmusic-like-button-renderer").attributes].filter(_ => _.name == "like-status")[0].value;
        switch (_score.toUpperCase()) {
            case "LIKE":
                _score = 1;
                break;
            case "DISLIKE":
                _score = 0
                break;
            case "INDIFFERENT":
                let _time = _htmlList[index].querySelectorAll("yt-formatted-string[ellipsis-truncate-styling][ellipsis-truncate]")[2].textContent.split(":");
                if (_time[0] == "0")
                    _score = -1;
                else
                    _score = 0.5;
                break;
        }
        _tracks.push({ name: _track, score: _score });
    }
    _result.tracks = _tracks;

    console.log(_result);
    return _result;
}