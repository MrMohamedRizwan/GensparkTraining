import { TestBed } from '@angular/core/testing';
import { RecipieService } from './RecipeService';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RecipeModel } from '../models/Recipe';

describe('RecipieService', () => {
  let service: RecipieService;
  let httpMock: HttpTestingController;

  const mockRecipes: RecipeModel[] = [
    new RecipeModel(1, 'img1.jpg', 'Pizza', 15, 'Italian', [
      'Tomato',
      'Cheese',
    ]),
    new RecipeModel(2, 'img2.jpg', 'Paneer', 20, 'Indian', [
      'Paneer',
      'Spices',
    ]),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecipieService],
    });

    service = TestBed.inject(RecipieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all recipes', () => {
    service.getAllRecipes().subscribe((response) => {
      expect(response.recipes.length).toBe(2);
      expect(response.recipes).toEqual(mockRecipes);
    });

    const req = httpMock.expectOne('https://dummyjson.com/recipes');
    expect(req.request.method).toBe('GET');

    req.flush({ recipes: mockRecipes });
  });
});
