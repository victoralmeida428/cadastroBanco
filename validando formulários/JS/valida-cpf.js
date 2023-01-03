export default function ehumcpf(campo) {
    const cpf = campo.value.replace(/\.|-/g,"");
    const veridicadores = cpf.slice(9,11).split('');
    const numero1 = verificarNumero1(cpf); 
    const numero2 = verificarNumero2(cpf);

    if (veridicadores[0] != numero1 | veridicadores[1] != numero2){
        campo.setCustomValidity('CPF Inválido')
    } 

}

function verificarNumero1(cpf) {
    const numero = cpf.slice(0,9).split('');
    return calculoVerificador(numero);

}

function verificarNumero2(cpf) {
    const numero = cpf.slice(1,9).split('');
    const numero1 = verificarNumero1(cpf)
    const push = numero.push(numero1)
    return calculoVerificador(numero);
}

function calculoVerificador(numero) {
    var cont = 10;
    var soma = 0;
    numero.forEach(item => {
        soma += parseInt(item) * cont;
        cont -= 1;

    });
    const resto = soma % 11;
    if(resto == 1 | resto ==0) {
        let numeroCorreto = 0
        return numeroCorreto
    } else {
        let numeroCorreto = 11 - resto
        return numeroCorreto
    }
}



