export default randomColor=()=>{
    var letters = '0123456789ABCDEF';
    var color = '#';
    do {
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    } while (color === '#FFFFFF' || color === '#000000');
    return color;
}

