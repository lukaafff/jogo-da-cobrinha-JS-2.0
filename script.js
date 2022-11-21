window.onload = function(){
    var tela = document.getElementById("tela");
    var ctx = tela.getContext("2d"); //é dentro do context que vai ser criada toda a parte gráfica
    document.addEventListener("keydown", keyPush);
    setInterval(jogo, 100); //define um intervalo para a função ser chamada todas as vezes
    
    const velocidade = 1; //qunatas casas a cobrinha anda 

    var velocidadeX = velocidadeY =0;
    var posicaoX = 10; //posição onde inicia a cobrinha
    var posicaoY = 15; //posição onde inicia a cobrinha
    var tamanhoPeca = 30;
    var quantidadePeca = 20;
    var macaX = macaY = 15; //posição inicial da maça

    var pontuacao = 0;

    var rastro = []; //o reastro começa com a array vazia, pois não tem nenhum elemento
    calda = 5; //calda da cobrinha começa com tamanho 5

    function jogo (){
        pontuacaobox.innerHTML = "Pontuação: " + pontuacao;
        posicaoX += velocidadeX; //cobrinha começa parada
        posicaoY += velocidadeY; //cobrinha começa parada

        if (posicaoX < 0){
            posicaoX = quantidadePeca - 1;
        }
        if (posicaoX > quantidadePeca - 1){
            posicaoX = 0;
        }
         if (posicaoY < 0){
            posicaoY = quantidadePeca - 1;
         }
         if (posicaoY > quantidadePeca - 1){
            posicaoY = 0;
         }
    
        //tela
        ctx.fillStyle = "black"; //estilo de preechimento
        ctx.fillRect(0,0, tela.width, tela.height); //forma um retângulo e pinta toda a tela

        //maça
        ctx.fillStyle = "red"; //estilo de preechimento
        ctx.fillRect(macaX*tamanhoPeca, macaY*tamanhoPeca, tamanhoPeca,tamanhoPeca); 

        //cobra
        ctx.fillStyle = "green"; //estilo de preechimento
        for (var i = 0; i < rastro.length; i++){
            ctx.fillRect(rastro[i].x*tamanhoPeca, rastro[i].y*tamanhoPeca, tamanhoPeca-1,tamanhoPeca-1);
            if (rastro[i].x == posicaoX && rastro[i].y == posicaoY){ //se a posição do rastro for igual a posição da cobrinha 
                velocidadeX = velocidadeY = 0; //para a cobrinha
                calda = 2;
                pontuacao = 0;
            }
        }
        //cobrinha andar
        rastro.push({x:posicaoX, y:posicaoY}) //objeto em que vai ter o elemento x (que usou no for) que vai ter a posição atual. o memso para o y
        while (rastro.length > calda){ //se o rastro estiver maior que a calda
            rastro.shift(); //tirar o primeiro elemento do array
        }

        //aumentar a calda
        if (macaX == posicaoX && macaY == posicaoY){ //se a posição da maça for igual a posição da cabeça
            calda ++; //colocar mais um elemento na calda
            macaX = Math.floor(Math.random()*quantidadePeca); //reposiciona a maçã
            macaY = Math.floor(Math.random()*quantidadePeca); //reposiciona a maçã
            //pontuação
            pontuacao += 1;
        }
    }
        //controle da cobrinha
        function keyPush(event){

        switch (event.keyCode) {
            case 37: //esquerda
                velocidadeX = -velocidade;
                velocidadeY = 0;
                break;
            case 38: //cima
                velocidadeX = 0;
                velocidadeY = -velocidade;
                break;
            case 39: //direita
                velocidadeX = velocidade;
                velocidadeY = 0;
                break;
            case 40: //baixo
                velocidadeX = 0;
                velocidadeY = velocidade;
                break;          
            default:
                
                break;
        }
    }
}