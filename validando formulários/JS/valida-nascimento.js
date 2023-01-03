export default function ehMaiorIdade(campo){
    const dataNascimento = new Date(campo.value)
    if (!validaIdade(dataNascimento)){
        campo.setCustomValidity('O usuário não é maior de idade')
    }
    
    }


function validaIdade(data) {
    const hoje = new Date() ;
    const maioridade = new Date(data.getUTCFullYear()+18, data.getUTCMonth(), data.getUTCDate());

    return hoje >= maioridade;
}