function getList() {
    let _result = {} || undefined;

    let _htmlList = document.querySelectorAll("ytmusic-responsive-list-item-renderer[page-type]");
    _result.artist = document.getElementsByClassName("strapline-text style-scope ytmusic-responsive-header-renderer complex-string")[0].title;
    _result.album = document.getElementsByClassName("title style-scope ytmusic-responsive-header-renderer")[0].title;

    let _tracks = [];
    for (let index = 0; index < _htmlList.length; index++) {
        let _track = _htmlList[index].querySelector("a").textContent;
        let _score = _htmlList[index].querySelector("yt-button-shape[aria-pressed='true']");
        if (_score != null) {
            if (_score.id.includes("dislike"))
                _score = 0
            else
                _score = 1;
        } else
            _score = 0.5;

        _tracks.push({ name: _track, score: _score });
    }
    _result.tracks = _tracks;

    console.log(_result);
    return _result;
}