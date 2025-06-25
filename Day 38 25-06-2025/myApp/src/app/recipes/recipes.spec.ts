import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Recipes } from './recipes';
import { RecipieService } from '../services/RecipeService';
import { of, throwError } from 'rxjs';
import { RecipeModel } from '../models/Recipe';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe',
  standalone: true,
  template: '',
})
class MockRecipeComponent {
  @Input() recipe!: RecipeModel;
}

describe('Recipes Component', () => {
  let component: Recipes;
  let fixture: ComponentFixture<Recipes>;
  let recipeServiceSpy: jasmine.SpyObj<RecipieService>;

  const mockRecipes: RecipeModel[] = [
    new RecipeModel(1, 'img1.jpg', 'Pasta', 30, 'Italian', ['Tomato', 'Basil']),
    new RecipeModel(2, 'img2.jpg', 'Sushi', 20, 'Japanese', ['Rice', 'Fish']),
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('RecipieService', ['getAllRecipes']);

    await TestBed.configureTestingModule({
      imports: [Recipes, MockRecipeComponent],
      providers: [{ provide: RecipieService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(Recipes);
    component = fixture.componentInstance;
    recipeServiceSpy = TestBed.inject(
      RecipieService
    ) as jasmine.SpyObj<RecipieService>;
  });

  it('should create the component', () => {
    recipeServiceSpy.getAllRecipes.and.returnValue(
      of({ recipes: mockRecipes })
    );
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call getAllRecipes and set recipes on init', () => {
    recipeServiceSpy.getAllRecipes.and.returnValue(
      of({ recipes: mockRecipes })
    );
    fixture.detectChanges();

    expect(recipeServiceSpy.getAllRecipes).toHaveBeenCalled();
    expect(component.recipes?.length).toBe(2);

    const recipeCards = fixture.debugElement.queryAll(By.css('app-recipe'));
    expect(recipeCards.length).toBe(2);
  });

  it('should log error if getAllRecipes fails', () => {
    const consoleSpy = spyOn(console, 'log');
    recipeServiceSpy.getAllRecipes.and.returnValue(
      throwError(() => new Error('Service failed'))
    );

    fixture.detectChanges();

    expect(consoleSpy).toHaveBeenCalledWith(jasmine.any(Error));
  });
});
