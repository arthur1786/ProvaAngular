import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Jogo } from "src/app/models/jogo.model";
import { Selecao } from "src/app/models/selecao.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-cadastrar-jogo",
  templateUrl: "./cadastrar-jogo.component.html",
  styleUrls: ["./cadastrar-jogo.component.css"],
  
})
export class CadastrarJogoComponent implements OnInit {
  
  
  TimeAId!: number;
  TimeBId!: number;
  PercorrerSelect!: Selecao[];

  constructor(private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.http.get<Selecao[]>("https://localhost:5001/api/selecao/listar").subscribe({
      next: (PercorrerSelect) => {
        this.PercorrerSelect = PercorrerSelect;
      }
    })
  }

  cadastrar(){
    let jogo: Jogo = {
      selecaoA: this.PercorrerSelect.filter(time => time.id == this.TimeAId)[0],
      selecaoB: this.PercorrerSelect.filter(time => time.id ==this.TimeBId)[0]
    };
    this.http.post<Jogo>("Https://localhost:5001/api/jogo/cadastrar", jogo).subscribe({
      next: (jogo) => {
        this._snackBar.open("Partida/Jogo Cadastrados!", "Ok!", {
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.router.navigate(["pages/jogo/listar"]);
      },
      error: (error) => {
        console.error("Algum erro aconteceu!");
      },
    });
  }


}
