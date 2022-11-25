import { HttpClient, HttpEvent } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Jogo } from "src/app/models/jogo.model";

@Component({
  selector: "app-palpitar-jogo",
  templateUrl: "./palpitar-jogo.component.html",
  styleUrls: ["./palpitar-jogo.component.css"],
})
export class PalpitarJogoComponent implements OnInit {
  constructor(private http: HttpClient,private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute,) {}

  id!: number;
  TimeAId?: string;
  golsTimeA?: number;
  TimeBId?: string;
  golsTimeB?: number;
  partida!: Jogo;

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        let { id } = params;
        if (id !== undefined) {
          this.http.get<Jogo>(`https://localhost:5001/api/jogo/buscar/${id}`).subscribe({
            next: (jogo) => {
              this.partida = jogo;
              this.id = id;
            }
          });
        }
      },
    });
  }
}
