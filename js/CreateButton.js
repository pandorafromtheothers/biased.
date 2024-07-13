let ButtonCreation = {} || undefined;
ButtonCreation.ABCArray = ["A", "Á", "B", "C", "D", "E", "É", "F", "G", "H", "I", "Í", "J", "K", "L", "M", "N", "O", "Ó", "Ö", "Ő", "P", "Q", "R", "S", "T", "U", "Ú", "Ü", "Ű", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function CreateButtons(trackName = "") {
    let _result = document.createElement('li');
    _result.classList.add("dropdown", "listElementPad");
    _result.id = 'track';

    _result.appendChild(ButtonCreation.AddDropDownButton());
    _result.appendChild(document.createElement('br'));
    _result.appendChild(ButtonCreation.AddDropDownList());
    _result.appendChild(document.createElement('br'));

    _result.appendChild(ButtonCreation.AddRatingListContainer());
    if (trackName != "") {
        let _trackNameStart = Array.from(trackName)[0].toUpperCase();
        let _array = _result.children[2];
        let _element = undefined;
        for (let _index = 0; _index < _array.children.length; _index++) {
            _element = _array.children[_index];
            if (_element.textContent == _trackNameStart) {
                LetterSelected(_element);
                break;
            }
        }
    }
    document.getElementById('anchor').insertAdjacentElement("beforebegin", _result);
}

ButtonCreation.AddDropDownButton = () => {
    let _result = document.createElement('button');
    _result.classList.add("btn", "btn-secondary", "dropdown-toggle", "kozgaz");
    _result.type = 'button';
    _result.id = 'dropdownMenuButton';
    _result.dataset.toggle = 'dropdown';
    _result.ariaHasPopup = 'true';
    _result.ariaExpanded = 'false';
    _result.textContent = 'Letter of track';
    return _result;
}
ButtonCreation.AddDropDownList = () => {
    let _result = document.createElement('div');
    _result.classList.add("dropdown-menu", "rollerBladeSeven");
    _result.ariaLabel = 'dropdownMenuButton';
    _result.id = 'abcContainer';
    ButtonCreation.ABCArray.forEach(elem => {

        let _htmlElement = document.createElement('li');
        _htmlElement.classList.add('dropdown-item');
        _htmlElement.value = elem;
        _htmlElement.onclick = () => { LetterSelected(_htmlElement) };
        _htmlElement.textContent = elem;
        _result.appendChild(_htmlElement);
    });
    return _result;
}
ButtonCreation.AddRatingListContainer = () => {
    let _result = document.createElement('li');
    _result.classList.add("btn-group", "padbtnbetween");
    _result.role = 'group';
    _result.id = 'track';
    _result.slot = '-1';
    _result.step = 'any';
    _result.appendChild(ButtonCreation.CreateInterludeButton());
    _result.appendChild(ButtonCreation.CreateRatingButton(1, 'Banger'));
    _result.appendChild(ButtonCreation.CreateRatingButton(0.5, 'Mid'));
    _result.appendChild(ButtonCreation.CreateRatingButton(0, 'Bad'));
    _result.appendChild(ButtonCreation.CreateDeleteButton());
    return _result;
}
ButtonCreation.CreateInterludeButton = () => {
    let _result = document.createElement('button');
    _result.type = 'button';
    _result.id = 'raters';
    _result.onclick = () => { AppendTrackRating(_result) };
    _result.value = -1;
    _result.classList.add("drag", "btn", "btn-secondary", "raters");
    _result.textContent = '-';
    _result.draggable = 'true';
    return _result;
}
ButtonCreation.CreateRatingButton = (trackValue, text) => {
    let _result = document.createElement('button');
    _result.type = 'button';
    _result.id = 'raters';
    _result.onclick = () => { AppendTrackRating(_result) };
    _result.classList.add("btn", "btn-secondary", "raters");
    _result.value = trackValue;
    _result.textContent = text;
    return _result;
}
ButtonCreation.CreateDeleteButton = () => {
    let _result = document.createElement('button');
    _result.type = 'button';
    _result.onclick = () => {
        if (confirm('Are u sure you want to delete track?')) {
            _result.parentNode.parentNode.remove();
        }
    };
    _result.classList.add("delete", "btn", "raters");
    _result.textContent = 'X';
    return _result;
}