function getList() {
    let _result = {} || undefined;

    let _htmlList = document.querySelectorAll("ytmusic-responsive-list-item-renderer[page-type]");
    _result.artist = document.getElementsByClassName("strapline-text style-scope ytmusic-responsive-header-renderer complex-string")[0].title;
    _result.album = document.getElementsByClassName("title style-scope ytmusic-responsive-header-renderer")[0].title;

    let _tracks = [];
    for (let index = 0; index < _htmlList.length; index++) {
        _tracks.push(_htmlList[index].querySelector("a").textContent);
    }
    _result.tracks = _tracks;

    console.log(_result);
    return _result;
}