function CreateButtons() {
    let newElement = document.createElement('li');
    newElement.classList.add("dropdown", "listElementPad");
    newElement.id = 'track';
    newElement.appendChild(AddDropDownButton());
    newElement.appendChild(document.createElement('br'));
    newElement.appendChild(AddDropDownList());
    newElement.appendChild(document.createElement('br'));
    newElement.appendChild(AddRatingListContainer());
    InsertIntoTable(newElement);
}
function InsertIntoTable(e) {
    document.getElementById('anchor').insertAdjacentElement("beforebegin", e);
}
function AddDropDownButton() {
    let abcButton = document.createElement('button');
    abcButton.classList.add("btn", "btn-secondary", "dropdown-toggle", "kozgaz");
    abcButton.type = 'button';
    abcButton.id = 'dropdownMenuButton';
    abcButton.dataset.toggle = 'dropdown';
    abcButton.ariaHasPopup = 'true';
    abcButton.ariaExpanded = 'false';
    abcButton.textContent = 'Letter of track';
    return abcButton;
}
function AddDropDownList() {
    let abcList = document.createElement('div');
    abcList.classList.add("dropdown-menu", "rollerBladeSeven");
    abcList.ariaLabel = 'dropdownMenuButton';
    abcList.id = 'abcContainer';
    AddABCOption(abcList, ABCArray);
    return abcList;
}
function AddRatingListContainer() {
    let trackrate = document.createElement('li');
    trackrate.classList.add("btn-group", "padbtnbetween");
    trackrate.role = 'group';
    trackrate.id = 'track';
    trackrate.slot = '-1';
    trackrate.step = 'any';
    trackrate.appendChild(CreateDragButton());
    trackrate.appendChild(CreateRatingButton(1, 'Banger'));
    trackrate.appendChild(CreateRatingButton(0.5, 'Mid'));
    trackrate.appendChild(CreateRatingButton(0, 'Bad'));
    trackrate.appendChild(CreateDeleteButton());
    return trackrate;
}
function CreateRatingButton(trackValue, text) {
    let rateButton = document.createElement('button');
    rateButton.type = 'button';
    rateButton.id = 'raters';
    rateButton.onclick = function () { AppendTrackRating(this) };
    rateButton.classList.add("btn", "btn-secondary", "raters");
    rateButton.value = trackValue;
    rateButton.textContent = text;
    return rateButton;
}
function CreateDeleteButton() {
    let DeleteButton = document.createElement('button');
    DeleteButton.type = 'button';
    DeleteButton.onclick = function () { DeleteParent(this) };
    DeleteButton.classList.add("delete", "btn", "raters");
    DeleteButton.textContent = 'X';
    return DeleteButton;
}
function CreateDragButton() {
    let dragg = document.createElement('div');
    let dragButton = document.createElement('button');
    dragButton.onclick = function() {AppendTrackRating(this)};
    dragButton.type = 'button';
    dragButton.id = 'raters';
    dragButton.value = -1;
    dragButton.classList.add("drag", "btn", "btn-secondary", "raters");
    dragButton.textContent = '-';
    dragButton.draggable = 'true';
    return dragButton;
}

function Kinezes(e) {
    e = e;
}
function AddABCOption(list, ABCArray) {
    ABCArray.forEach(elem => {
        list.appendChild(AddListMember(elem));
    }
    );
}
function AddListMember(elem) {
    let char = document.createElement('li');
    char.classList.add('dropdown-item');
    char.value = elem;
    char.onclick = function () { LetterSelected(this) };
    char.textContent = elem;
    return char;
}
function CopyTrackElement() {
    const button = document.getElementById('track');
    InsertIntoTable(button);
}
//Így kell json-t olvasni
// async function ReadABCJson(list) {
//     var response = await fetch('./json/abc.json);
//     const jsonData = await response.json();
//     AddABCOption(list, jsonData);
// }

let ABCArray = ["A", "Á", "B", "C", "D", "E", "É", "F", "G", "H", "I", "Í", "J", "K", "L", "M", "N", "O", "Ó", "Ö", "Ő", "P", "Q", "R", "S", "T", "U", "Ú", "Ü", "Ű", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];