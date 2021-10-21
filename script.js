//// IMAGENS
var imagem1 = document.getElementById("imagempinypong1");
var imagem2 = document.getElementById("imagempinypong2");
var imagem3 = document.getElementById("imagempinypong3");

// Elementos
var vbtnIniciar;
var vJogador;
var vCpu;
var vBola;
var vPainelPontos;
var vPainelPontosCpu;

// Controle
var game;
var frames;
var pontos = 0;
var pontosCpu = 0;
var tecla;
jogo = false;

//Posições
var posBolaX;
var posBolaY;
var posJogadorX;
var posJogadorY;
var posCpuX;
var posCpuY;

//Direção com a tecla
var dirJy;

//Posições iniciais
var posJogadorInicialX = 10;
var posJogadorInicialY = 180;

var posCpuInicialX = 930;
var posCpuInicialY = 180;

var posBolaInicialX = 475;
var posBolaInicialY = 240;

var ang=0;
var anima;

//Tamanhos
var campoW = 960;
var campoH = 500;
var barraW = 20;
var barraH = 140;
var bolaW = 20;
var bolaH = 20;

//Direcão 
var bolaX = 0;
var bolaY = 0;
var cpuY = 0; 

//Velocidade
var velBola;
var velCpu;
var velJogador;

function controlaJogador(){
    if(jogo){
        posJogadorY += velJogador*dirJy;
        if( (posJogadorY+barraH >= campoH) || (posJogadorY <= 0)){
            posJogadorY+=(velJogador*dirJy)*(-1);
        }
        vJogador.style.top = posJogadorY+"px"; 
    }
}

function controlaCpu(){
    if(jogo){

        if((posCpuY <= (campoH-485))){ //toca em cima
            posCpuY-=velCpu*(-1);
            //posCpuY*=(-1);
            
            //posCpuY*=(-1);
        }else if( (posCpuY+(barraH) >= campoH-15)){
            posCpuY+=velCpu*(-1);
        }


        if((posBolaX > (campoW/2) && (bolaX > 0))){
            //Movimentar Cpu
            if(((posBolaY + (bolaH/2)) > ((posCpuY+(barraH/2))) + velCpu )){
                //Mover para baixo

                if((posCpuY+barraH) <= campoH){
                    posCpuY+=velCpu;
                }

            } else if((posBolaY + (bolaH/2)) < (posCpuY+(barraH/2)) - velCpu){
                //Mover para cima

                if(posCpuY >= 0){
                    posCpuY-=velCpu;
                }
            }

        } else {
            //Posicionar Cpu no centro
            if((posCpuY+(barraH/2)) < (campoH/2)){
                posCpuY+=velCpu;
            } else if((posCpuY+(barraH/2)) > (campoH/2)){
                posCpuY-=velCpu;
            }
        }
        vCpu.style.top=posCpuY+"px";
    }

}

function controlaBola(){
    //Movimentação da Bola
    posBolaX += velBola*bolaX;
    posBolaY += velBola*bolaY;

    //Colisão com o Jogador
    if(
        (posBolaX <= posJogadorX+barraW) && 
        ((posBolaY+bolaH >= posJogadorY) && (posBolaY <= posJogadorY+barraH)) 
    ){
        bolaY=(((posBolaY+(bolaH/2))-(posJogadorY+(barraH/2)))/35);
        bolaX*=-1; 
        play();

        if(btnPsycho.checked){
            pararAudio1();
            play4();
           }

    }

    //Colisão com o CPU
    if(
        (posBolaX >= posCpuX-barraW) && 
        ((posBolaY+bolaH >= posCpuY) && (posBolaY <= posCpuY+barraH))
        ){
        bolaY=(((posBolaY+(bolaH/2))-(posCpuY+(barraH/2)))/35);

       bolaX*=-1;
       velBola*=1.2; 
       play();

       if(btnPsycho.checked){
        pararAudio1();
        play4();
       }

    }

    // Limites superior e inferiores
    if((posBolaY >= 480) || (posBolaY <= 0)){
        bolaY*=-1;
        play2();

        if(btnPsycho.checked){
            pararAudio2();
            play3();
           }

    }

    // Golo (da direita para a esquerda)
    if(posBolaX >= (campoW-bolaW)){
        velBola = 0;
        posBolaX = posBolaInicialX;
        posBolaY = posBolaInicialY;
        posJogadorY = posJogadorInicialY;
        posCpuY = posCpuInicialY;
        pontos++; 
        vPainelPontos.value = pontos;
        jogo = false;
        vJogador.style.top = posJogadorY+"px"; 
        vCpu.style.top = posCpuY+"px"; 


        jogadorMarca(); ////////////////////
        

        
    } else if (posBolaX <= 0){
        velBola = 0;
        posBolaX = posBolaInicialX;
        posBolaY = posBolaInicialY;
        posJogadorY = posJogadorInicialY;
        posCpuY = posCpuInicialY;
        pontosCpu++; 
        vPainelPontosCpu.value = pontosCpu;
        jogo = false;
        vJogador.style.top = posJogadorY+"px"; 
        vCpu.style.top = posCpuY+"px"; 
        
    }


    vBola.style.top = posBolaY+"px";
    vBola.style.left = posBolaX+"px";
}

function teclaDw(){
    tecla = event.keyCode;
    if(tecla == 38){ //Cima
        dirJy=-1;
    } else if (tecla == 40){ //Baixo
        dirJy=+1;
    }
}

function teclaUp(){
    tecla = event.keyCode;
    if(tecla == 38){ //Cima
        dirJy=0;
    } else if (tecla == 40){ //Baixo
        dirJy=0;
    }
}

function game(){
    if(jogo){
        controlaJogador();
        controlaBola();
        controlaCpu();
    }
    frames = requestAnimationFrame(game);
}

function iniciaJogo(){
    if(!jogo){
        velBola = 6;
        velCpu = 10; //////////////////
        velJogador = 10;
        cancelAnimationFrame(frames);
        jogo = true;
        dirJy = 0;
        bolaX = 0;

        if(Math.random()*100 < 50){
            var x = (Math.random()*3);
            bolaY = -x; 
        } else {
            var x2 = (Math.random()*3); 
            bolaY = x2;
        }

        if(Math.random()*10 < 5){
            bolaX = -1;
        } else {
            bolaX = 1;
        }


        
        jogadorMarcaReset();////////////////////

        posBolaX = posBolaInicialX;
        posBolaY = posBolaInicialY;
        posJogadorY = posJogadorInicialY;
        posJogadorX = posJogadorInicialX;
        posCpuY = posCpuInicialY;
        posCpuX = posCpuInicialX;
        game();
    }

}

function inicializa(){
    velBola = 6;
    velCpu = 10;
    velJogador = 10;

    vbtnIniciar = document.getElementById("btnIniciar");
    vbtnIniciar.addEventListener("click", iniciaJogo);
    vJogador = document.getElementById("dvJogador");
    vCpu = document.getElementById("dvCpu");
    vBola = document.getElementById("dvBola");
    vPainelPontos = document.getElementById("txtPontos");
    vPainelPontosCpu = document.getElementById("txtPontosCpu");
    document.addEventListener("keydown", teclaDw);
    document.addEventListener("keyup", teclaUp);
}



var vCampo = document.getElementById("dvJogo");
var modo = document.getElementById('modo');
var modo2 = document.getElementById('modo2');
var modo3 = document.getElementById('modo3');
var logo = document.getElementById(`logo`);
var screen = document.getElementById(`screen`);
var footer = document.getElementById(`footer`);
var by = document.getElementById(`by`);

///DARK MODE
var btnDarkMode = document.getElementById('darkMode')

btnDarkMode.addEventListener('change', function dark() {
    if(btnDarkMode.checked){

        logo.src="logopong.png";

        vPainelPontos.style.color="rgb(255, 255, 255)";
        vPainelPontosCpu.style.color="rgb(255, 255, 255)";
        vJogador.style.backgroundColor="rgb(255, 255, 255)";
        vJogador.style.borderRadius="0px";
        vCpu.style.borderRadius="0px";
        vBola.style.borderRadius="0px";
        vCpu.style.backgroundColor="rgb(255, 255, 255)";
        vCampo.style.backgroundColor="rgb(0, 0, 0)"; //rgb(36, 36, 36)
        document.body.style.backgroundColor="rgb(251,193,0)";
        modo.style.color="rgba(0, 0, 0, 0.2)";
        modo.style.textShadow="var(--text-shadow2)";
        modo2.style.color="rgba(0, 0, 0, 0.2)";
        modo2.style.textShadow="var(--text-shadow2)";
        modo3.style.color="rgba(0, 0, 0, 0.2)";
        modo3.style.textShadow="var(--text-shadow2)";
        vCampo.style.borderColor="rgb(0, 0, 0)";
        vBola.style.backgroundImage="none";
        vBola.style.backgroundColor="rgb(255, 255, 255)";
        vJogador.style.backgroundImage="none";
        vCpu.style.backgroundImage="none";
        screen.style.display="flex";

        vbtnIniciar.style.color="rgb(155, 119, 0)";
        btnNewGame.style.color="rgb(155, 119, 0)";
        footer.style.backgroundImage="url(footer2.jpg)";
        footer.style.backgroundColor="#db58a200";
        by.style.textShadow="var(--text-shadow5)";

        pararMusica();   
    }
})

///Psycho MODE
var btnPsycho = document.getElementById("psycho");

    btnPsycho.addEventListener('change', function ver() {
    if(btnPsycho.checked){ 
        logo.src="logopsycho2.png";
        screen.zIndex="-1";
        vJogador.style.borderRadius="10px";
        vCpu.style.borderRadius="10px";
        vBola.style.borderRadius="50%";
        document.body.style.backgroundColor="#000000";
        vCampo.style.borderColor="rgb(0, 0, 0)";
        vPainelPontos.style.color="#000000";
        vPainelPontosCpu.style.color="#000000";
        modo.style.color="rgba(0, 0, 0, 0.2)";
        modo.style.textShadow="var(--text-shadow3)";
        modo2.style.color="rgba(0, 0, 0, 0.2)";
        modo2.style.textShadow="var(--text-shadow3)";
        modo3.style.color="rgba(0, 0, 0, 0.2)";
        modo3.style.textShadow="var(--text-shadow3)";


        var r = Math.floor(Math.random()*255);
        var g = Math.floor(Math.random()*255);
        var b = Math.floor(Math.random()*255);
        vCampo.style.backgroundColor="rgb("+r+", "+g+", "+b+")";

        var r2 = Math.floor(Math.random()*255*2);
        var g2 = Math.floor(Math.random()*255*2);
        var b2 = Math.floor(Math.random()*255*2);
        vBola.style.backgroundColor="rgb("+r2+", "+g2+", "+b2+"";

        var r3 = Math.floor(Math.random()*255*1.5);
        var g3 = Math.floor(Math.random()*255*1.5);
        var b3 = Math.floor(Math.random()*255*1.5);
        vJogador.style.backgroundColor="rgb("+r3+", "+g3+", "+b3+"";
        vCpu.style.backgroundColor="rgb("+r3+", "+g3+", "+b3+"";
        vBola.style.backgroundImage="none";
        vJogador.style.backgroundImage="none";
        vCpu.style.backgroundImage="none";
        screen.style.display="none";

        vbtnIniciar.style.color="var(--greyLight)";
        btnNewGame.style.color="var(--greyLight)";
        footer.style.backgroundImage="none";
        footer.style.backgroundColor="#db58a200";
        by.style.textShadow="var(--text-shadow6)";


        musica();
    }     
    var tmp;
    tmp = setTimeout(ver, 500);
});

//////////// Modo Standard
var btnStandard = document.getElementById("standard");

 btnStandard.addEventListener('change', function standard() {
    if(btnStandard.checked){
        logo.src="Logo 1-01.png";
        screen.zIndex="-1";
        vJogador.style.borderRadius="10px";
        vCpu.style.borderRadius="10px";
        vBola.style.borderRadius="50%";
        vPainelPontos.style.color="var(--greyLight)";
        vPainelPontosCpu.style.color="var(--greyLight)";
        vJogador.style.backgroundColor="none";
        vCpu.style.backgroundColor="none";
        vBola.style.backgroundColor="none";
        vBola.style.backgroundImage="url(Bola5-01.png)";
        vBola.style.backgroundSize="contain";
        vBola.style.backgroundRepeat="no-repeat";

        vJogador.style.backgroundImage="url(Barra5-01.png)";
        vJogador.style.backgroundSize="contain";
        vJogador.style.backgroundRepeat="no-repeat";

        vCpu.style.backgroundImage="url(Barra5-01.png)";
        vCpu.style.backgroundSize="contain";
        vCpu.style.backgroundRepeat="no-repeat";

        
        vCampo.style.backgroundColor="var(--greenLight)";
        document.body.style.backgroundColor="var(--pinkLight)";
        modo.style.color="var(--pinkLight2)";
        modo.style.textShadow="var(--text-shadow1)";
        modo2.style.color="var(--pinkLight2)";
        modo2.style.textShadow="var(--text-shadow1)";
        modo3.style.color="var(--pinkLight2)";
        modo3.style.textShadow="var(--text-shadow1)";
        vCampo.style.borderColor="rgb(255, 255, 255)";
        screen.style.display="none";

        vbtnIniciar.style.color="var(--greyLight)";
        btnNewGame.style.color="var(--greyLight)";
        footer.style.backgroundImage="none"; 
        footer.style.backgroundColor="var(--greyLight)";
        by.style.textShadow="var(--text-shadow4)";

        pararMusica();
    }
})


///Botão NEW GAME

var btnNewGame = document.getElementById("btnNewGame");
btnNewGame.addEventListener("click", reset);

function reset(){
    pontos = 0;
    pontosCpu = 0;
    vPainelPontos.value = "0";
    vPainelPontosCpu.value = "0";
    iniciaJogo()
}

/////Tecla Espaço ou Enter para inicar o jogo

document.addEventListener("keydown", teclaEnterEspaço);

function teclaEnterEspaço(){
    var teclaEnterEspaço;
    teclaEnterEspaço = event.keyCode;

    if(teclaEnterEspaço == 13 || teclaEnterEspaço == 32){
        iniciaJogo();
        event.preventDefault();
        //document.body.style.overflow="hidden";
        //document.body.style.position="static";
        }
    }

/// Audios
var audio1 = document.getElementById("audio1");
var audio2 = document.getElementById("audio2");  
var audio3 = document.getElementById("audio3"); 
var audio4 = document.getElementById("audio4"); 
var musica1 = document.getElementById("musica");


function play(){ 
    audio1.play(); 
    }

function play2(){ 
    audio2.play();
    }

function play3(){ 
    audio3.play();
    }

function play4(){ 
    audio4.play();
    }

function musica(){ 
    musica1.play();
    }

function pararMusica(){
    musica1.pause();
    musica1.currentTime = 0;
}

function pararAudio1(){
    audio1.pause();
    audio1.currentTime = 0;
}

function pararAudio2(){
    audio2.pause();
    audio2.currentTime = 0;
}

//// Não se usar as setas para não navegar dentro dos radios

function tecla2(){
    if (event.keyCode==39 || event.keyCode==37 || event.keyCode==38 || event.keyCode==40){
        return false;
    }
}
 document.onkeydown=tecla2;

 //// IMAGENS

 function jogadorMarca(){

    if(btnStandard.checked){
        imagem1.style.zIndex="999";
        imagem1.style.position="absolute";
        imagem1.style.display="flex";
        imagem1.style.transition="3s";
        imagem1.style.transform="translate(2500px)";
    }
}

function jogadorMarcaReset(){
    imagem1.style.transition="-10s";
    imagem1.style.transform="translate(0, 0)";
    imagem1.style.transform="translateX(-2500px)";
}

function mobileFullScreen() {
    if (screen.width < 480 && screen.height < 850) {
        document.documentElement.requestFullscreen();
    } 
}



function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

var elem = document.body; // Make the body go full screen.
requestFullScreen(elem);



window.addEventListener("load", inicializa);