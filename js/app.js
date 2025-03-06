let listaAmigos = []; //Lista onde será armazenado o nome dos participantes.
let contadorId = 0; //Variável para implantar um id para cada nome do participante.

//Função que adiciona cada nome ao campo de amigos incluídos.
function adicionar(){
    let nomeAmigo = document.getElementById('nome-amigo'); //Campo de input para adicionar participantes.
    let exibirNomes = document.getElementById('lista-amigos'); //Campo de exibição dos participantes.
    let tratarEspacosVazios = nomeAmigo.value.replace(/\s+/g, ''); //Variável que lidará com espaços vazios no campo.

    //Lida com espaços vazios no input do campo.
    if(tratarEspacosVazios == ''){
        alert("Insira algum nome no campo!");
        return;
    }

    //Validação de campos vazios.
    if(nomeAmigo.value.length == 0){
        alert("Insira algum nome no campo!");
        return;
    }
    
    for(let i of nomeAmigo.value){

        //Encerra o laço em caso de letra maiúscula no nome.
        if(i == i.toUpperCase() && isNaN(i)){
            break;
        }

        //Adiciona letra maiúscula na primeira ocorrência de letra caso tenha sido inputado um nome sem letras maiúsculas.
        if(isNaN(i)){
            let indicePrimeiraLetra = nomeAmigo.value.indexOf(i);
            let letraMaiuscula = nomeAmigo.value[indicePrimeiraLetra].toUpperCase();
            nomeAmigo.value = nomeAmigo.value.replace(nomeAmigo.value.charAt(indicePrimeiraLetra),letraMaiuscula);
            break;
        }
    }

     //Validação de nome repetido.
     if(listaAmigos.includes(nomeAmigo.value)){
        alert("Nome já adicionado no sorteio, selecione outro!");
        document.getElementById('nome-amigo').value = '';
        return;
    }

    //Adiciona no campo de exibição os nomes dos participantes.
    if(listaAmigos.length >= 1){
        exibirNomes.innerHTML += ` <span onclick="removerParticipante(${contadorId})" id= amigo-${contadorId++}>${nomeAmigo.value}</span>`;

        //Adiciona uma vírgula no nome anterior caso a lista incremente em 1 nome.
        let campoPrecedente = document.getElementById(`amigo-${contadorId - 2}`);
        let nomePrecedente = campoPrecedente.textContent;
        campoPrecedente.textContent =  nomePrecedente + ',';
    }else{
        exibirNomes.innerHTML += `<span onclick="removerParticipante(${contadorId})" id= amigo-${contadorId++}>${nomeAmigo.value}</span>`;
    }

    listaAmigos.push(nomeAmigo.value);
    document.getElementById('nome-amigo').value = ''; //Esvazia o campo input a cada adição.
}

//Funcionalidade de evento onde o participante é removido da lista após clicar em seu nome na tela.
function removerParticipante(id){
    let campoNomeParticipante = document.getElementById(`amigo-${id}`);
    let nomeParticipante = campoNomeParticipante.textContent;

    //Caso o nome do participante atual tenha vírgula, ela é removida para o nome ser removido do array.
    if(nomeParticipante[nomeParticipante.length - 1] == ','){ 
        nomeParticipante = nomeParticipante.replace(nomeParticipante[nomeParticipante.length - 1],'').trim();
    }

    //Remove do array o nome do participante.
    listaAmigos.splice(listaAmigos.indexOf(nomeParticipante),1);

    //Remove do campo de participantes o nome do participante atual.
    campoNomeParticipante.textContent = '';
}

//Função para fazer o sorteio.
function sortear(){
    
    //O sorteio não acontece se tiver menos que 3 participantes.
    if(listaAmigos.length < 3){
        alert("Deve ter no mínimo 3 participantes para realizar o sorteio!");
        return;
    }
    
    let sorteio = document.getElementById('lista-sorteio'); //Pega o campo do sorteio.
    sorteio.textContent = ''; //Esvazia o campo para adicionar outro sorteio por cima ao clicar no botão.

    //Algoritmo de fisher-yates para embaralhar os elementos no array.
    for(let i = listaAmigos.length - 1; i >= 0;i--){
        let valorAleatorio = Math.floor(Math.random() * (i + 1));
        [listaAmigos[i], listaAmigos[valorAleatorio]] = [listaAmigos[valorAleatorio], listaAmigos[i]];  
    }

    //Exibição do sorteio.
    for(let i = 0; i < listaAmigos.length;i++){
        if(i == listaAmigos.length - 1){
            sorteio.innerHTML += `${listaAmigos[i]} -> ${listaAmigos[i - i]}<br>`;
        }else{
            sorteio.innerHTML += `${listaAmigos[i]} -> ${listaAmigos[i + 1]}<br>`;
        }                      
    }
}

//Função que reinicia todos os campos e lista de participantes.
function reiniciar(){
    listaAmigos = [];
    document.getElementById('nome-amigo').value = '';
    document.getElementById('lista-amigos').textContent = '';
    document.getElementById('lista-sorteio').textContent = '';
}



