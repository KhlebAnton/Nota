const btnInstr = document.getElementById('btn_instr_next');
const btnInstrClose = document.getElementById('btn_instr_close');
const instruction = document.getElementById('instruction');
const slideList = document.querySelectorAll('.slide');
const imageList = document.querySelectorAll('.img_inst');
const descList = document.querySelectorAll('.description_instr');
const check = document.getElementById('check');
const headRoad = document.getElementById('header_road');
const footRoad = document.getElementById('footer_road');
const popupList = document.querySelectorAll('.popup')
let scanningId = false;

//repeat instruction
function repeatInstr() {
    popupList.forEach(popup => {
        popup.classList.add('hidden')
    });
    btnInstr.classList.remove('hidden');
    btnInstrClose.classList.add('hidden')
    showInstr();
    hideFooter();
    hideHeader();
    slideList.forEach(el => {
        el.classList.remove('activ');
    });
    slideList[0].classList.add('activ');
    imageList.forEach(el => {
        el.classList.add('hidden')
    });
    imageList[0].classList.remove('hidden');
    descList.forEach(el => {
        el.classList.add('hidden')
    });
    descList[0].classList.remove('hidden');
}
//swipe down popup

popupList.forEach(popup => {
    let touchStartPosition = null;
    let touchMovePosition = null;
    let swipeDistance = null;

    popup.addEventListener('touchstart', (e) => {
        touchStartPosition = e.touches[0].clientY;
    });

    popup.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) return;

        touchMovePosition = e.touches[0].clientY;
        swipeDistance = touchMovePosition - touchStartPosition;


    });

    popup.addEventListener('touchend', () => {

        if (swipeDistance > 0) {
            popup.classList.add('hidden');
            swipeDistance = null;
        }
    });
})
//show popup
function showPopup(id) {
    document.getElementById(id).classList.remove('hidden')
}
function hidePopup(id) {
    document.getElementById(id).classList.add('hidden')
}

//show click popup
function showClickPopup() {
    document.getElementById('click_popup').classList.remove('hidden')
}
function hideClickPopup() {
    document.getElementById('click_popup').classList.add('hidden')
}
function showQuotePopup() {
    document.getElementById('quote_popup').classList.remove('hidden')
}

function hideQuotePopup() {
    document.getElementById('quote_popup').classList.add('hidden')
}
// hide screen instruction
function closeInstr() {
    instruction.classList.add('hidden');
}
function showInstr() {
    instruction.classList.remove('hidden');
}

//show/hide header_road 
function showHeader() {
    setTimeout(() => {
        headRoad.classList.remove('hidden')
    }, 1000)

}
function hideHeader() {
    headRoad.classList.add('hidden')
}
//show/hide footer_road 
function showFooter() {
    footRoad.classList.remove('hidden')
}
function hideFooter() {
    footRoad.classList.add('hidden')
}

// scanning ok 
function scanning() {
    if (!scanningId) {
        scanningId = true;
        check.classList.remove('hidden');
        setTimeout(() => {
            check.classList.add('hidden');
            showHeader();
            showFooter();
        }, 2000)
    }
}

//instruction slider
function nextSlide() {
    let activeSlide;
    slideList.forEach(el => {
        if (el.classList.contains('activ')) {
            activeSlide = el;
        }
    })
    if (activeSlide.nextElementSibling) {
        activeSlide.classList.remove('activ');
        activeSlide.nextElementSibling.classList.add('activ');
    }
    if (activeSlide == slideList[1]) {
        btnInstr.classList.add('hidden');
        btnInstrClose.classList.remove('hidden')
        // close instr and open scanning

        btnInstrClose.addEventListener('click', () => {
            closeInstr();
            if(scanningId) {
                showHeader();
                showFooter();
            }
        })

    }

}
function nextImage() {
    let activeImage;
    imageList.forEach(el => {
        if (!el.classList.contains('hidden')) {
            activeImage = el;
        }
    })
    if (activeImage.nextElementSibling) {
        activeImage.classList.add('hidden');
        activeImage.nextElementSibling.classList.remove('hidden');
    }
}

function nextDesc() {
    let activeDesc;
    descList.forEach(el => {
        if (!el.classList.contains('hidden')) {
            activeDesc = el;
        }
    })
    if (activeDesc.nextElementSibling) {
        activeDesc.classList.add('hidden');
        activeDesc.nextElementSibling.classList.remove('hidden');
    }
}

btnInstr.addEventListener('click', () => {
    nextSlide();
    nextImage();
    nextDesc();
})

//show/ hidee icon left/right
const leftIcon = document.getElementById('left_icon');
const rightIcon = document.getElementById('right_icon');

function showLeftIcon() {
    setTimeout(() => {
        leftIcon.classList.remove('hidden')
    }, 400);
}
function showRightIcon() {
    setTimeout(() => {
        rightIcon.classList.remove('hidden');
    }, 400);
}

function hideLeftIcon() {
    leftIcon.classList.add('hidden')
}
function hideRightIcon() {
    rightIcon.classList.add('hidden')
}

const iconColor = document.getElementById('icon');

///color icon
const colorToIcon = {
    '88, 86, 214': 'img/icons/labirint.svg',
    '237, 25, 216': 'img/icons/kapella.svg',
    '255, 149, 0': 'img/icons/zal-iskusstv.svg',
    '223, 179, 4': 'img/icons/komnata-kniga.svg',
    '52, 199, 89': 'img/icons/perever-room.svg',
    '0, 199, 190': 'img/icons/sad.svg',
    '48, 176, 199': 'img/icons/kvorking.svg',
    '50, 173, 230': 'img/icons/tonel.svg',
    '0, 122, 255': 'img/icons/office.svg',
    '35, 21, 198': 'img/icons/big-zal.svg',
    '175, 82, 222': 'img/icons/kids.svg',
    '255, 45, 85': 'img/icons/sound.svg',
    '176, 149, 255': 'img/icons/color.svg',
    '239, 139, 255': 'img/icons/sreda-sveta.svg',
    '255, 114, 114': 'img/icons/studio.svg'
};

function findIconByColor(color) {
    const [r, g, b] = color.split(', ').map(Number);
    const iconPath = colorToIcon[`${r}, ${g}, ${b}`];
    console.log(iconPath)
    return iconPath;

}

function setColor(r, g, b) {
    leftIcon.querySelector('.color_icon_nav').style.backgroundColor = `rgb(${r},${g},${b})`;
    rightIcon.querySelector('.color_icon_nav').style.backgroundColor = `rgb(${r},${g},${b})`;
    iconColor.style.backgroundColor = `rgb(${r},${g},${b})`;
    let numColor = +`${r}${g}${b}`;

    icon_url = findIconByColor(`${r}, ${g}, ${b}`);

    iconColor.style.backgroundImage = `url(${icon_url})`;

}
//title
const titleIcon = document.getElementById('title_icon')
function setTitle(title) {
    titleIcon.textContent = title;
}
//click 

const quotes = {
    'webb' : ['Бабушка говорит, чай помогает при любых неприятностях','"Почему плачит русалка" Холли Вебб'],
    'usachev': ['У каждого есть талант, просто не все могут его найти.','"Школа снеговиков" А.А. Усачев'] ,
    'esenin': ['Есть что-то прекрасное в лете, А с летом прекрасное в нас.','"Стихотворения, поэмы (Сборник)"<br> С.А. Есенин'],
    'block': ['Будет день — и свершится великое, Чую в будущем подвиг души.','"Будет день — и свершится великое..." А.А.Блок'],
    'lermontov': ['Что то есть прекрасное в лете<br>А с летом прекрасное в нас','"Герои нашего времени" М.Ю. Лермонтов'],
    'zaholder': ['Не вижу в этом большого смысла, - сказал Кролик. <br> - Нет, - сказал Пух скромно, - его тут нет. <br> Но он собирался тут быть, когда я начинал говорить. Очевидно, с ним что-то случилось по дороге.','"Винни-пух и Зачарованный лес" <br> Б.В. Заходер'],
    'dostoevsciy': ['Человек он умный, но чтоб умно поступать — одного ума мало.','"Преступление и наказание" <br> Ф.М. Достоевский'],
    'bulgakov': ['Тот, кто любит, должен разделять участь того, кого он любит.','"Мастер и Маргарита" М.А. Булгаков']
}

//quotes click 
const quoteContainer = document.getElementById('quote_container');
const quoteAuthor = document.getElementById('author_quote');

function clickAuthor(author) {
    quoteContainer.innerHTML = quotes[author][0];
    quoteAuthor.innerHTML = quotes[author][1];

    showQuotePopup();
}

function openTG() {
    // телеграм
}