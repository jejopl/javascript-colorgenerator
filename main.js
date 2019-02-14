function randomColor(){
    let r = (Math.random() * (255 - 0 + 1) ) << 0;
    let g = (Math.random() * (255 - 0 + 1) ) << 0;
    let b = (Math.random() * (255 - 0 + 1) ) << 0;

    const color = `rgb(${r}, ${g}, ${b})`;
    return color;
}

function getId(id){
    return document.getElementById(id);
}

function rgbToHex(rgb) { 
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
};

function fullColorHex(r,g,b) {   
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return ('#' + red+green+blue).toUpperCase();
};

window.onload = () => {
    const one = {id: getId("1"), lock: getId("1-"), color: getId("1---"), save: false};
    const two = {id: getId("2"), lock: getId("2-"), color: getId("2---"), save: false};
    const three = {id: getId("3"), lock: getId("3-"), color: getId("3---"), save: false};
    const four = {id: getId("4"), lock: getId("4-"), color: getId("4---"), save: false};
    const five = {id: getId("5"), lock: getId("5-"), color: getId("5---"), save: false};

    const allColumns = [one, two, three, four, five];

    window.addEventListener('keydown', event => {
        if(event.keyCode === 32){
            allColumns.forEach(item => {
                if(item.save){
                    return;
                }
                let currentColor = randomColor();
                item.id.style = `background: ${currentColor}`;
                item.color.innerHTML = currentColor;
            });
        }
    });

    allColumns.forEach(item => {
        item.lock.addEventListener('mousedown', event => {
            if(item.save){
                item.save = false;
                item.lock.innerHTML = 'LOCK';
                item.lock.style = '';
            } else if(!item.save) {
                item.save = true;
                item.lock.innerHTML = 'LOCKED';
                item.lock.style = 'opacity: 1 !important;';
            }
        });

    });
}
