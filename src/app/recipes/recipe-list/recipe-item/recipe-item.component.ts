import {Component, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../recipe.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styles: []
})
export class RecipeItemComponent implements OnInit {

  // @ts-ignore
  @Input() recipe: Recipe;
  @Input() index: number;

  ngOnInit(): void {
  }

}
