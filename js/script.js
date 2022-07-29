const $ = (tag) => document.querySelector(tag);

const cnv = $('canvas');
cnv.width = innerWidth;
cnv.height = innerHeight;

const ctx = cnv.getContext('2d');


/* Funções */
function loop(){
    requestAnimationFrame(loop, cnv);
}
















//console.log(cnv);





















