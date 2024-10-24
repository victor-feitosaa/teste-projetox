function checarParamsForms(){
    const urlParams = new URLSearchParams(window.location.search);
    const formasParams = urlParams.has('forma-ingresso');
    if (!formasParams) {
        window.location.href = 'inicio.html'
    }
};

// Função para criar o HTML do card
function criarCards(oferta) {
    const card = document.createElement('div'); // cria um novo div para o card
    card.classList.add("lg:card", "lg:transition-all", "lg:duration-300", "lg:hover:-translate-y-5", "cursor-pointer", "card-oferta", "w-full", "lg:w-1/3", "px-12", "md:px-0");
    
    // Aqui você pode configurar o conteúdo do card conforme a necessidade, por exemplo:
    card.innerHTML = `
                    <div class="lg:card lg:transition-all lg:duration-300 lg:hover:-translate-y-5
                    cursor-pointer  card-interno border-solid border-2 border-gray-400 w-full">
                        <div class="px-4 py-7 flex flex-col gap-5">
                            <span id="modalidade" class="flex justify-center rounded-full border-2 border-white  p-2 text-xs font-bold w-1/3">
                                ${oferta.modalidade}
                            </span>
    
                            <div class="py-5">
                                <h4 class="text-3xl font-bold ">${oferta.desconto}</h4>
                                <p class="text-sm font-semibold">${oferta.tipoDesconto}</p> 
                            </div>
    
                            <div class="flex flex-col md:flex md:flex-row md:justify-between lg:flex lg:flex-col gap-5 pb-10">
                                <div>
                                    <span class="text-xl font-semibold">R$${oferta.valorIntegral}</span>
                                    <p class="text-md font-medium">VALOR INTEGRAL</p>
                                </div>
    
                                <div>
                                    <span class="text-xl font-semibold">R$${oferta.valorPrimeira}</span>
                                    <p class="text-md font-medium">PRIMEIRA MENSALIDADE</p>
                                </div>
    
                                <div>
                                    <span class="text-xl font-semibold">R$${oferta.valorDemais}</span>
                                    <p class="text-md font-medium">DEMAIS MENSALIDADES</p>
                                </div>
                            </div>
    
                            <div class="flex flex-col gap-5 pb-7 ">
                                <div class="flex justify-between text-sm font-semibold">
                                    <p class="w-1/2">PERÍODO LETIVO</p>
                                    <p class="w-1/2 text-right ">${oferta.periodoLetivo}</p>
                                </div>
    
                                <div class="flex justify-between text-sm font-semibold">
                                    <p class="w-1/2">TURNO</p>
                                    <p class="w-1/2 text-right ">${oferta.turno}</p>
                                </div>
    
                                <div class="flex justify-between text-sm font-semibold">
                                    <p class="w-1/2">IES</p>
                                    <p class="w-1/2 text-right ">${oferta.ies}</p>
                                </div>
    
                                <div class="flex justify-between text-sm font-semibold">
                                    <p class="w-1/2">CAMPUS</p>
                                    <p class="w-1/2 text-right ">${oferta.campus}</p> 
                                </div>
                            </div>
                        </div>
                    </div>
    
    `;

    // Aplicar estilo ao card externo e interno
    card.addEventListener("click", () => {
        // Remover as classes de todos os cards
        const todosOsCards = document.querySelectorAll(".container-cards .card-oferta");
        todosOsCards.forEach(card => {
            card.classList.remove("bg-blue-700", "text-white"); // Remove o estilo de "selecionado"
            card.querySelector(".card-interno").classList.remove("bg-blue-700", "text-white"); // Remove o estilo do interno
            card.classList.add("bg-white", "text-black"); // Adiciona o estilo original
            card.querySelector(".card-interno").classList.add("bg-white", "text-black"); // Estilo original para o interno
        });

        // Adicionar as classes ao card clicado
        card.classList.remove("bg-white", "text-black"); // Remove o estilo original
        card.querySelector(".card-interno").classList.remove("bg-white", "text-black"); // Remove o estilo do interno
        card.classList.add("bg-blue-700", "text-white"); // Adiciona o estilo de "selecionado"
        card.querySelector(".card-interno").classList.add("bg-blue-700", "text-white"); // Estilo selecionado para o interno
    });
    
    return card;
}







// Esconde todas as divs com a classe 'row-escondida' no carregamento da página
window.addEventListener('DOMContentLoaded', function() {
    let rol = document.querySelectorAll('.row-escondida');
        rol.forEach(function(element) {
            element.style.display = 'none'; // Esconde as divs ao carregar a página
        });
});

async function chamarApiCursos() {
    // Obtém os parâmetros da URL da página
    const params = new URLSearchParams(document.location.search);
    
    // Obtém o valor do parâmetro 'cidade' da URL
    const cidadeParam = params.get('cidade');
    
    // Obtém o valor do parâmetro 'forma-ingresso' da URL
    const formaIngressoParam = params.get('forma-ingresso');
    
    // Constrói a URL para fazer uma requisição à API, passando os parâmetros 'cidade' e 'forma-ingresso'
    const cursosURL = 'https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/cursos?canal=019288cf-9615-7b8d-87d9-84f134d7b3ba&cidade=' + cidadeParam + '&forma-ingresso=' + formaIngressoParam;

    // Faz uma requisição para a API usando fetch e aguarda a resposta
    const respC = await fetch(cursosURL);

    // Verifica se a resposta foi bem-sucedida (status 200)
    if (respC.status === 200) {
        // Converte a resposta da API em um objeto JSON
        const objC = await respC.json();

        // Exibe a quantidade de resultados e o objeto retornado pela API no console
        console.log(objC.result.length);
        console.log(objC);

        // Seleciona o elemento do select (dropdown) onde os cursos serão exibidos
        const selC = document.getElementById('cursosDisponiveis__cursos');

        // Itera sobre cada resultado da API (cursos)
        for (let iC = 0; iC < objC.result.length; iC++) {
            // Obtém o nome do curso e o UID (identificador único) de cada curso
            const optValueC = `${objC.result[iC].nome}`;
            const optUid = `${objC.result[iC].uid}`;

            // Cria um elemento <option> para adicionar ao select
            const optC = document.createElement("option");
            optC.innerHTML = optValueC; // Define o nome do curso como o conteúdo visível
            selC.appendChild(optC); // Adiciona o <option> ao select
            optC.setAttribute("value", optUid); // Define o UID do curso como valor do <option>

            // Adiciona um event listener ao select para detectar quando o usuário seleciona um curso
            selC.addEventListener('change', function(event) {
                let value = event.target.value;

                let rol = document.querySelectorAll('.row-escondida');

                rol.forEach(function(element) {
                    if (value === '') {
                        element.style.display = 'none';
                    } else {
                        element.style.display = '';
                    }
                });
            });

            selC.addEventListener('change', async function(event) {
                let uid = event.target.value;

                const cidadeParam = new URLSearchParams(window.location.search);
                const cidade = cidadeParam.get('cidade');
                
                const formaIngressoParam = new URLSearchParams(window.location.search);
                const formaIngresso = formaIngressoParam.get("forma-ingresso");

                const cursosTextURL = "https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/ofertas/?canal=019288cf-9615-7b8d-87d9-84f134d7b3ba&cidade=" + cidade +"&forma-ingresso=" + formaIngresso + "&denominacao=" + uid;

                const respText = await fetch(cursosTextURL);

                if (respText.status == 200) {
                    const det = await respText.json();
                    
                    console.log(det);
                    const cursoNome = det.result[0].curso.especialidade.denominacao.nome;

                    document.getElementById("cursoNome").innerHTML = cursoNome;

                    const uid = det.result[0].curso.uid

                    const infExtra = "https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/conteudo/" + uid;

                    const respInfExtra = await fetch(infExtra);

                    if (respInfExtra.status == 200) {

                        const jsonExtra = await respInfExtra.json();

                        console.log(jsonExtra);

                        //inserir texto apresentação
                        document.getElementById("identifierApresentacao").innerHTML = jsonExtra.texts[0].identifier;

                        document.getElementById("textoApresentacao").innerHTML = jsonExtra.texts[0].text


                        //inserir texto atuação
                        document.getElementById("identifierAtuacao").innerHTML = jsonExtra.texts[1].identifier;

                        document.getElementById("textoAtuacao").innerHTML = jsonExtra.texts[1].text
                    }

                    gerarCards(det.result);  // Passando os dados completos para gerar os cards
                }
            });
        }
    }
}

// Função para gerar e inserir os cards
function gerarCards(det) {
    const containerCards = document.querySelector(".container-cards");

    containerCards.innerHTML = ""; // Limpar o container antes de adicionar novos cards

    for (let c = 0; c < det.length; c++) {

        const oferta = {
            modalidade: det[c].curso.especialidade.modalidade.nome,   // Exemplo de extração dos dados
            desconto: det[c].bolsa.percentual_desconto + '% DESCONTO',
            tipoDesconto: 'DESCONTO ATÉ O FINAL DO CURSO',
            valorIntegral: det[c].precificacao.valor,
            valorPrimeira: det[c].valor_primeira_mensalidade,
            valorDemais: det[c].valor_demais_mensalidades,
            periodoLetivo: det[c].processo_seletivo.periodo_letivo.nome,
            turno: det[c].curso.turno.nome,
            ies: det[c].campus.mantida.nome,
            campus: det[c].campus.nome
        };

        const card = criarCards(oferta); // Cria um novo card
        containerCards.appendChild(card); // Adiciona o card ao container

        card.addEventListener("click", () => {



        })
        




    }




}

checarParamsForms();
chamarApiCursos();
