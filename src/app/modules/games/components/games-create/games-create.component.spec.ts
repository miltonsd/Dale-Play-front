import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesCreateComponent } from './games-create.component';

describe('GamesCreateComponent', () => {
  let component: GamesCreateComponent;
  let fixture: ComponentFixture<GamesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
