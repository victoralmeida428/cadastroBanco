import ehumcpf from "./valida-cpf.js";
import ehMaiorIdade from "./valida-nascimento.js";

const camposFormulario = document.querySelectorAll('[required]');
const form = document.querySelector('[data-formulario]');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const listaResposta = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaResposta));

    window.location.href = "./abrir-conta-form-2.html"
})

camposFormulario.forEach((campo) => {
    campo.addEventListener("blur", ()=> {verificaCampo(campo)})
    campo.addEventListener("invalid", elemento => elemento.preventDefault() )
} )

const tiposError = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo) {
    let mensagem = ""
    campo.setCustomValidity('')
    if (campo.name == 'cpf' && campo.value.length >= 11) {
        ehumcpf(campo)
    }
    if (campo.name == 'aniversario' && campo.value != ""){
        ehMaiorIdade(campo)
    }

    tiposError.forEach(error => {
        if (campo.validity[error]) {
            mensagem = mensagens[campo.name][error];
        }
    })

    const mensagemError = campo.parentNode.querySelector('.mensagem-erro');
    const validadorInput = campo.checkValidity();

    if (!validadorInput) {
        mensagemError.textContent = mensagem
    } else {
        mensagemError.textContent = ''
    }
}