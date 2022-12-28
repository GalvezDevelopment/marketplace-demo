import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { Observable } from "rxjs";
import { selectLoading } from "../../../store/selectors/products.seletors";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  loader$: Observable<boolean> = this.store.select(selectLoading);

  constructor(private readonly store: Store<AppState>) {
  }

  ngOnInit(): void {
  }
}
