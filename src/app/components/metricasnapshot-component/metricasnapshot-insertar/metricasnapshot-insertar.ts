import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MetricaSnapshot } from '../../../models/MetricaSnapshot';
import { MetricasnapshotService } from '../../../services/metricasnapshot-service';
import { Transmision } from '../../../models/Transmision';
import { TransmisionService } from '../../../services/transmision-service';

@Component({
  selector: 'app-metricasnapshot-insertar',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './metricasnapshot-insertar.html',
  styleUrl: './metricasnapshot-insertar.css',
})
export class MetricasnapshotInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  obj: MetricaSnapshot = new MetricaSnapshot();
  listaTransmisiones: Transmision[] = [];

  constructor(private cS: MetricasnapshotService, private transmisionS: TransmisionService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.transmisionS.list().subscribe(data => { this.listaTransmisiones = data; });
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      transmision: [null, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.obj.nombre = this.form.value.nombre;
      this.obj.cantidad = this.form.value.cantidad;
      this.obj.transmision = this.form.value.transmision;
      this.cS.insert(this.obj).subscribe({ next: () => { this.router.navigate(['/metricas/lista']); } });
    }
  }
}
