import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPageCreatorComponent } from './new-page-creator.component';

describe('NewPageCreatorComponent', () => {
  let component: NewPageCreatorComponent;
  let fixture: ComponentFixture<NewPageCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPageCreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPageCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
