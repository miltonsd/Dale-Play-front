import { TestBed } from '@angular/core/testing';

import { UserGamesService } from './user-games.service';

describe('UserGamesService', () => {
  let service: UserGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
