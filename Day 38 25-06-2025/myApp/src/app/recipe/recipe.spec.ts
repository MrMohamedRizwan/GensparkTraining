import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Recipe } from './recipe';
import { RecipeModel } from '../models/Recipe';
import { RecipieService } from '../services/RecipeService';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('Recipe Component ', () => {
  let component: Recipe;
  let fixture: ComponentFixture<Recipe>;

  const mockRecipe = new RecipeModel(
    1,
    'https://cdn.dummyjson.com/recipe-images/1.webp',
    'Classic Margherita Pizza',
    15,
    'Italian',
    ['Dough', 'Tomato Sauce', 'Mozzarella']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recipe, CommonModule],
      providers: [
        {
          provide: RecipieService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Recipe);
    component = fixture.componentInstance;
    component.recipe = mockRecipe;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display recipe name', () => {
    const nameEl = fixture.debugElement.query(By.css('h3.card-title'));
    expect(nameEl).toBeTruthy();
    expect(nameEl.nativeElement.textContent).toContain(
      'Classic Margherita Pizza'
    );
  });

  it('should render all ingredients in the list', () => {
    const ingredientEls = fixture.debugElement.queryAll(
      By.css('ul.list-group li')
    );
    expect(ingredientEls.length).toBe(3);
    expect(ingredientEls[0].nativeElement.textContent).toContain('Dough');
    expect(ingredientEls[1].nativeElement.textContent).toContain(
      'Tomato Sauce'
    );
    expect(ingredientEls[2].nativeElement.textContent).toContain('Mozzarella');
  });

  it('should display image with correct src and alt', () => {
    const imgEl = fixture.debugElement.query(By.css('img'));
    expect(imgEl).toBeTruthy();
    expect(imgEl.attributes['src']).toBe(mockRecipe.image);
    expect(imgEl.attributes['alt']).toContain(mockRecipe.name);
  });

  it('should display cook time and cuisine badges', () => {
    const badges = fixture.debugElement.queryAll(By.css('.badge'));
    expect(badges.length).toBe(2);
    expect(badges[0].nativeElement.textContent).toContain('Cook Time: 15 min');
    expect(badges[1].nativeElement.textContent).toContain('Italian');
  });
});
