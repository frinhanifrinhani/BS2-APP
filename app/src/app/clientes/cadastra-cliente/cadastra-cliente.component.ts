import { ClienteService } from './../../_services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuscaCepService } from 'src/app/_services/busca-cep.service';

@Component({
  selector: 'app-cadastra-cliente',
  templateUrl: './cadastra-cliente.component.html',
  styleUrls: ['./cadastra-cliente.component.css']
})
export class CadastraClienteComponent implements OnInit {
  clienteForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  messageOk = false;
  button = true;

  Sexo: any = [{ 'tipo': 'Masculino', 'value': 'M' }, { 'tipo': 'Feminino', 'value': 'F' }]

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private buscaCepService: BuscaCepService
  ) {
    this.clienteService = clienteService;
  }

  ngOnInit() {
    this.builderClienteForm()
  }

  private builderClienteForm() {
    this.clienteForm = this.formBuilder.group({
      nome: ['',Validators.required],
      data_nascimento: ['', Validators.required],
      sexo: ['', Validators.required],
      cep: [''],
      endereco: [''],
      complemento: [''],
      numero: [''],
      bairro: [''],
      cidade: [''],
      estado: [''],

    });
  }

  // f retorna os controles do form
  get f() { return this.clienteForm.controls; }

  changeSexo(e) {
    this.sexo.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get sexo() {
    return this.clienteForm.get('sexo');
  }

  consultaCep(){
    let cep = this.clienteForm.get('cep').value;

    if(cep != null && cep !== '') {
      this.buscaCepService.buscaCep(cep)
        .subscribe(
          data => this.setEndereco(data));
    }
  }

  setEndereco(data){
    this.clienteForm.patchValue({
        endereco: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
      
    });
  }

  onSubmit() {

    this.submitted = true;

    if (this.clienteForm.invalid) {
      return;
    }
    this.loading = true;
    
    this.clienteService.cadastrarCliente(this.clienteForm.value)
      .subscribe(res => {
        
        this.messageOk = true;
        this.loading = false;
        this.button = false;
        setTimeout(() => {
          this.router.navigate(['/clientes']);
      }, 3000); 

      },
        errorResponse => {
          this.error = errorResponse.errors
          this.loading = false;
        }
      
      );
      
    

  }


}
