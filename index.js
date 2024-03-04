const btnInstr = document.getElementById('btn_instr_next');
const btnInstrClose = document.getElementById('btn_instr_close');
const instruction = document.getElementById('instruction');
const scan = document.getElementById('scan');
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

// hide screen instruction
function closeInstr() {
    instruction.classList.add('hidden');
}
function showInstr() {
    instruction.classList.remove('hidden');
}
//show/hide screen scanning
function showScan() {
    scan.classList.remove('hidden')
}
function hideScan() {
    scan.classList.add('hidden')
}
//show/hide header_road 
function showHeader() {
    headRoad.classList.remove('hidden')
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
    hideScan();
    check.classList.remove('hidden');
    setTimeout(() => {
        check.classList.add('hidden');
        showHeader();
        showFooter();
    }, 2000)


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
            if(!scanningId) {
                showScan();
                scanningId = true;
            } else {
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


const iconColor = document.getElementById('icon')
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
    '88, 86, 214': 'img/icons/big zal.svg',
    '175, 82, 222': 'img/icons/kids.svg',
    '255, 45, 85': 'img/icons/sound.svg',
    '176, 149, 255': 'img/icons/color.svg',
    '239, 139, 255': 'img/icons/sreda sveta.svg',
    '255, 114, 114': 'img/icons/studio.svg'
  };

function findIconByColor(color) {
    const [r, g, b] = color.split(', ').map(Number);
    const iconPath = colorToIcon[`${r}, ${g}, ${b}`];
    console.log(iconPath)
    return iconPath;

  }

function setColor(r,g,b) {
    iconColor.style.backgroundColor = `rgb(${r},${g},${b})`;
    let numColor = +`${r}${g}${b}`;
    
    icon_url = findIconByColor(`${r}, ${g}, ${b}`);
    
    iconColor.style.backgroundImage = `url(${icon_url})`;

}

//click 

function authorClick(author) {
    showPopup('click_popup');
}