import {
  Component,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import jspdf from "jspdf";
import html2canvas from 'html2canvas';
import {FichaMembroService} from "./ficha-membro.service";
import {MembroModel} from "../model/MembroModel";
import {Utils} from "../utils";
(window as any).html2canvas = html2canvas;

@Component({
  selector: 'app-ficha-membro',
  templateUrl: './ficha-membro.component.html',
  styleUrls: ['./ficha-membro.component.css']
})
export class FichaMembroComponent implements OnInit, OnChanges {

  @Input() membro: MembroModel = new MembroModel();
  @ViewChild('content', {static: true}) el!: ElementRef

  profileForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private fichaMembroService: FichaMembroService, private utils: Utils) {
  }

  teste(){
    const doc = new jspdf;
    doc.text('Membro nome: ', 10, 10);
    doc.save("14.pdf");
  }

  printPDF(){
    let pdf = new jspdf('p', 'pt', 'a4');

    pdf.html(this.el.nativeElement, {
      callback: (pdf) =>{
        pdf.save(`ROL-${this.membro.rol}.pdf`)
      }
    });
  }

  ngOnInit(): void {
    this.fichaMembroService.invocarComponenteFichaObservable.subscribe(() => this.printPDF());
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
