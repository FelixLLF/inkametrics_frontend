import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { Users } from '../../../models/Users';
import { UsersService } from '../../../services/users-service';
import { Empresa } from '../../../models/Empresa';
import { EmpresaService } from '../../../services/empresa-service';

@Component({
  selector: 'app-users-actualizar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatRadioModule, ReactiveFormsModule, CommonModule],
  templateUrl: './users-actualizar.html',
  styleUrl: './users-actualizar.css',
})
export class UsersActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: Users = new Users();
  id: number = 0;
  listaEmpresas: Empresa[] = [];

  constructor(private cS: UsersService, private empresaS: EmpresaService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.empresaS.list().subscribe(data => { this.listaEmpresas = data; });
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.form = this.fb.group({
      codigo: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      enabled: [true, Validators.required],
      empresa: [null, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.id = this.form.value.codigo;
      this.obj.username = this.form.value.username;
      this.obj.password = this.form.value.password;
      this.obj.enabled = this.form.value.enabled;
      this.obj.empresa = this.form.value.empresa;
      this.cS.update(this.obj).subscribe({ next: () => { this.router.navigate(['/usuarios/lista']); } });
    }
  }
}
