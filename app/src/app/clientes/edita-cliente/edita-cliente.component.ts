import { ClienteService } from './../../_services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuscaCepService } from 'src/app/_services/busca-cep.service';

@Component({
  selector: 'app-edita-cliente',
  templateUrl: './edita-cliente.component.html',
  styleUrls: ['./edita-cliente.component.css']
})
export class EditaClienteComponent implements OnInit {
  clienteForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  id:number;
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
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.builderClienteForm();
    this.getCliente(this.id);
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

  getCliente(id) {
    this.clienteService.getCliente(id)
      .subscribe(
        data => {this.setCliente(data)
        },
        errorResponse => {
          this.error = errorResponse.errors
          this.loading = false;
        }
        
      );
  }
  
  consultaCep(){
    let cep = this.clienteForm.get('cep').value;

    if(cep != null && cep !== '') {
      this.buscaCepService.buscaCep(cep)
        .subscribe(
          data => this.setEndereco(data));
    }
  }

  setCliente(data){
    this.clienteForm.patchValue({
        id: data.id,
        nome: data.nome,
        data_nascimento: data.data_nascimento,
        sexo: data.sexo,
        cep: data.cep,
        endereco: data.endereco,
        complemento: data.complemento,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
      
    });
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
    this.clienteService.editarCliente(this.clienteForm.value,this.id)
      .subscribe(res => {
        
        this.messageOk = true;
        this.loading = false;
        this.button = false;
        setTimeout(() => {
          this.router.navigate(['/clientes']);
      }, 2000); 

      },
        errorResponse => {
          this.error = errorResponse.errors
          this.loading = false;
        }
      );
    

  }


}
