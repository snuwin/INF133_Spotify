import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistPageComponent } from './artist-page.component';

describe('ArtistPageComponent', () => {
  let component: ArtistPageComponent;
  let fixture: ComponentFixture<ArtistPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
