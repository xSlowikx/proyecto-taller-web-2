import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTareaComponent } from './add-edit-tarea.component';

describe('AddEditTareaComponent', () => {
  let component: AddEditTareaComponent;
  let fixture: ComponentFixture<AddEditTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditTareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
