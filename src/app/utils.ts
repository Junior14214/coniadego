import { utcToZonedTime } from 'date-fns-tz';
import * as moment from 'moment-timezone';
import { MembroModel } from './model/MembroModel';
import { EnderecoModel } from './model/EnderecoModel';

export class Utils {

    constructor() { }

    formatarData(data: string): string {
        let date = new Date(data);
        let dataFormatada = date.toISOString().slice(0, 10);

        return dataFormatada;
    }

    formatarCPF(cpf: string): string {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');

        // Aplica a formatação
        cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');

        return cpf;
    }

    formatarRG(rg: string): string {
        // Converte a string para um número
        const numero = parseFloat(rg.replace(/\D/g, ''));

        // Verifica se a conversão foi bem-sucedida
        if (!isNaN(numero)) {
            // Formata o número como milhar usando toLocaleString
            return numero.toLocaleString();
        } else {
            // Retorna a string original se a conversão falhar
            return rg;
        }
    }

    removeCaracteresNaoNumericos(num: string) {
        return num.replace(/\D/g, '');
    }

    validarFormatarEmail(email: string): string | null {
        // Expressão regular para validar um endereço de e-mail simples
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (regexEmail.test(email)) {
            // O e-mail é válido, nenhum formato adicional é necessário
            return email;
        } else {
            // O e-mail não é válido, ou seja, pode ter espaços ou não seguir o formato básico
            // Aqui você pode adicionar lógica adicional para formatar ou corrigir o e-mail se necessário
            console.warn("O endereço de e-mail não é válido.");
            return null;
        }
    }

    formatarTelefone(telefone:string) {
        // Remove todos os caracteres não numéricos
        const numeroLimpo = telefone.replace(/\D/g, '');
        let numeroTelefoneFormatado = "";

        // Formata o número de telefone conforme o usuário digita
        if (numeroLimpo.length >= 2) {
            numeroTelefoneFormatado = `(${numeroLimpo.substring(0, 2)}`;
        }

        if (numeroLimpo.length >= 6) {
            numeroTelefoneFormatado += `) ${numeroLimpo.substring(2, 6)}`;
        }

        if (numeroLimpo.length >= 10) {
            numeroTelefoneFormatado += `-${numeroLimpo.substring(6, 10)}`;
        }

        return numeroTelefoneFormatado;
    }

    formatarDataDoBancoDeDados(dataString: string): string {
        const data = new Date(dataString);

        // Verifica se a data é válida
        if (!moment(data).isValid()) {
            return 'Data inválida';
        }

        // Formata a data no estilo desejado
        const dataFormatada = moment(data).locale('pt-br').format('DD [de] MMMM [de] YYYY [às] HH:mm[hrs]');
        return dataFormatada;
    }

    areFieldsFilled(model: any): boolean {
        for (const key in model) {
          if (model.hasOwnProperty(key)) {
            const value = model[key];

            // Verifica se o valor é nulo, indefinido ou uma string/objeto/array vazio
            if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '') ||
                (typeof value === 'object' && Object.keys(value).length === 0) ||
                (Array.isArray(value) && value.length === 0)) {
              return false;  // Pelo menos um campo não foi preenchido
            }
          }
        }

        return true;  // Todos os campos estão preenchidos
      }

      preencheFormMembro(model: MembroModel){
        return {
            nome: model.nome,
            data_nascimento: model.data_nascimento,
            nome_mae: model.nome_mae,
            nome_pai: model.nome_pai,
            sexo: model.sexo,
            nacionalidade: model.nacionalidade,
            naturalidade: model.naturalidade,
            nome_conjuje: model.nome_conjuje,
            data_nascimento_conjuje: model.data_nascimento_conjuje,
            cpf: model.cpf,
            rg: model.rg,
            email: model.email,
            telefone: model.telefone,
            cargo_id: model.cargo_id,
            estado_civil_id: model.estado_civil_id,
            situacao_id: model.situacao_id,
            ministerio_id: model.ministerio_id,
            cep: model.endereco.cep,
            complemento: model.endereco.complemento,
            endereco: model.endereco.endereco,
            numero: model.endereco.numero
        }
      }

}
