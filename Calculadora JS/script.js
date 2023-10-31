// Variáveis
let currentInput = document.querySelector('.currentInput');
let answerScreen = document.querySelector('.answerScreen');
let buttons = document.querySelectorAll('button');
let erasebtn = document.querySelector('#erase');
let clearbtn = document.querySelector('#clear');
let evaluate = document.querySelector('#evaluate');

function calculateExpression(expression) {
    try {
        return new Function('return ' + expression)();
    } catch (error) {
        return 'Erro';
    }
}

// Valor da tela em tempo real
let realTimeScreenValue = [];

// Para limpar
clearbtn.addEventListener("click", () => {
    realTimeScreenValue = [''];
    answerScreen.innerHTML = 0;
    currentInput.className = 'currentInput'
    answerScreen.className = 'answerScreen';
    answerScreen.style.color = "rgba(150, 150, 150, 0.87)";
})

// Obter o valor de qualquer botão clicado e exibir na tela
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        // Quando o botão clicado não é o de apagar
        if (!btn.id.match('erase')) {
            // Para exibir o valor em botão pressione
            realTimeScreenValue.push(btn.value);
            currentInput.innerHTML = realTimeScreenValue.join('');

            // Para avaliar a resposta em tempo real
            if (btn.classList.contains('num_btn')) {
                answerScreen.innerHTML = calculateExpression(realTimeScreenValue.join(''));
            }
        }

        // Quando o botão apagar é clicado
        if (btn.id.match('erase')) {
            realTimeScreenValue.pop();
            currentInput.innerHTML = realTimeScreenValue.join('');
            answerScreen.innerHTML = calculateExpression(realTimeScreenValue.join(''));
        }

        // Quando o botão clicado é o botão de avaliar
        if (btn.id.match('evaluate')) {
            currentInput.className = 'answerScreen';
            answerScreen.className = 'currentInput';
            answerScreen.style.color = "white";
        }

        // //Para evitar erro indefinido na tela
        if (typeof calculateExpression(realTimeScreenValue.join('')) == 'undefined') {
            answerScreen.innerHTML = 0;
        }
    })
})