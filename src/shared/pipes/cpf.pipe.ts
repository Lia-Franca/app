import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
  standalone: true
})
export class CpfPipe implements PipeTransform {
  public transform(cpf: string): string {
    if (!cpf) return ''
    return cpf && cpf.length === 11 ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '';
  }

  public formatCPf(cpf: string): string {
    return cpf?.replace(/[.-]/g, '') ?? '';
  }
}