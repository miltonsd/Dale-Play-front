import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesUpdateComponent } from './games-update.component';

describe('GamesUpdateComponent', () => {
  let component: GamesUpdateComponent;
  let fixture: ComponentFixture<GamesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
