//umiejetnosci Poczatek --------
const ikonas = document.querySelectorAll('.ikona');

const ikonHover = function () {
    this.classList.add('makeMargin');
    let elPositonTop = this.offsetTop;
    let elPositonLeft = this.offsetLeft;
    let changePositionDivTop = elPositonTop + 110;
    let changePositionDivLeft = elPositonLeft;
    let divId = this.id;
    let numberLvl;
//    sprawdzam ktory element jest i wtedy ustawiam poziom
    switch (divId) {
        case 'html':
            numberLvl = lvlHtml;
            break;
            case 'css':
            numberLvl = lvlCss;
            break;
            case 'php7':
            numberLvl = lvlPhp7;
            break;
            case 'gulp':
            numberLvl = lvlGulp;
            break;
            case 'sql':
            numberLvl = lvlSql;
            break;
            case 'git':
            numberLvl = lvlGit;
            break;
            case 'javaScript':
            numberLvl = lvlJs;
            break;
            case 'jQuery':
            numberLvl = lvlJq;
            break;
            case 'react':
            numberLvl = lvlReact;
            break;
            case 'adobePremier':
            numberLvl = lvlPr;
            break;
            case 'Photoshop':
            numberLvl = lvlPs;
            break;
        default:
            numberLvl = 3;
    }
    let lvlString;
    if(numberLvl ==1){
        lvlString = 'słaby';
    }else if(numberLvl ==2){
        lvlString = 'średni';
    }else{
        lvlString = 'dobry';
    }
    let text = `${divId} poziom: ${lvlString}`;

    createDivSkill(text, `${changePositionDivTop}px`, `${changePositionDivLeft}px`, numberLvl);
    for (let i = 0; i < ikonas.length; i++) {
        if (this != ikonas[i]) {
            ikonas[i].classList.add('makeOpacity');

        }
    }
}
const ikonOut = function () {
    this.classList.remove('makeMargin');
    removeDivSkill();
    for (let i = 0; i < ikonas.length; i++) {
        ikonas[i].classList.remove('makeOpacity');
    }
}

for (let i = 0; i < ikonas.length; i++) {
    ikonas[i].addEventListener('mouseover', ikonHover);
    ikonas[i].addEventListener('mouseout', ikonOut);
}

function createDivSkill(text, top, left, lvl) {
    const divSkill = document.querySelector('.content-skill');
    const divLvl = document.createElement('DIV');
    const divLvlClass = divLvl.classList.add('skill-lvl');
    const divLvlLine1 = document.createElement('DIV');
    const divLvlLine2 = document.createElement('DIV');
    const divLvlLine3 = document.createElement('DIV');
    const divLvlScal = document.createElement('DIV');
    const textInDiv = document.createTextNode(text);
    divSkill.appendChild(divLvl);

    divLvl.appendChild(textInDiv);
    divLvl.style.top = top;
    divLvl.style.left = left;
    //tworze linie z skillami 
    const divLvlParent = document.querySelector('.skill-lvl');
    divLvlParent.appendChild(divLvlScal);
    divLvlScal.classList.add('line-lvl');
    //    tworzenie divów w skill-lvl
    const divLvlLineParent = document.querySelector('.line-lvl');
    for (let i = 0; i < lvl; i++) {
        if (i == 0) {

            divLvlLine1.classList.add('lvl');
            divLvlLine1.classList.add('lvl-1');
            divLvlLineParent.appendChild(divLvlLine1);
        } else if (i == 1) {

            divLvlLine2.classList.add('lvl');
            divLvlLine2.classList.add('lvl-2');
            divLvlLineParent.appendChild(divLvlLine2);
        } else {

            divLvlLine3.classList.add('lvl');
            divLvlLine3.classList.add('lvl-3');
            divLvlLineParent.appendChild(divLvlLine3);
        }

    }
    //    console.log(divLvlParent.appendChild(divLvlScal));
    //        console.log(divLvlLine1);
}

function removeDivSkill() {
    document.querySelector('.skill-lvl').remove('div');
}

const lvlHtml = 3;
const lvlCss = 3;
const lvlJs = 3;
const lvlPr = 2;
const lvlPs = 2;
const lvlJq = 1;
const lvlSql = 1;
const lvlPhp7 = 2;
const lvlGulp = 1;
const lvlGit = 2;
const lvlReact = 1;


const btnOmnie= document.querySelector('#omnie');
const opis = document.querySelector('.opis');
const btnHobby= document.querySelector('#hobby');
const hobby = document.querySelector('.zainteresowania');
const btnClose = document.querySelectorAll('#about_me button');
const imgAboutMe = document.querySelector("#about_me > div > div:nth-child(2) > img");

btnOmnie.addEventListener('click', function(){
    opis.style.display = 'block';
    imgAboutMe.style.opacity='0.15';
})
btnOmnie.addEventListener('mouseover', function(){
    document.querySelector('.aboutme_text').style.display='block';
})
btnOmnie.addEventListener('mouseout', function(){
    document.querySelector('.aboutme_text').style.display='none';
})
btnHobby.addEventListener('mouseover', function(){
    document.querySelector('.hobby_text').style.display='block';
})
btnHobby.addEventListener('mouseout', function(){
    document.querySelector('.hobby_text').style.display='none';
})
btnHobby.addEventListener('click', function(){
    hobby.style.display = 'block';
    imgAboutMe.style.opacity='0.15';
})
for(let i=0; i<btnClose.length; i++){
btnClose[i].addEventListener('click', function(e){
    e.preventDefault();
    opis.style.display = 'none';
    hobby.style.display = 'none';
    imgAboutMe.style.opacity='1';
})
}