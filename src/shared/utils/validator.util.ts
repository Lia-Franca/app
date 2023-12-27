import { AbstractControl, ValidationErrors } from "@angular/forms";

export const cpfValidator = (control: AbstractControl): ValidationErrors | null => {
    const cpf = control.value;

    if (cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999")
        return { cpf: true };
        
    let add = 0;
    for (let i=0; i < 9; i ++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
      let rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
        rev = 0;
      if (rev != parseInt(cpf.charAt(9)))
        return { cpf: true };

    add = 0;
    for (let i = 0; i < 10; i ++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
      return { cpf: true };

    return null
  }

export const ageValidator = (control: AbstractControl): ValidationErrors | null => {
    const birth = control.value;

    const day = +birth.substr(0, 2);
    const month = +birth.substr(2, 2);
    const year = +birth.substr(4, 4);
  
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const minAge = 18;
    const maxAge = 60;
  
    const minTime = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    const maxTime = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  
  
    return birthDate >= maxTime || birthDate <= minTime ? { age: true } : null;
  }

export const surnameValidator = (controle: AbstractControl): ValidationErrors | null => {
    const fullName = controle.value;
    const splitfullName = fullName.trim().split(' ');

    return splitfullName.length < 2 ? { surname: true } : null;
  }