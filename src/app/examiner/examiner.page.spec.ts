import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExaminerPage } from './examiner.page';

describe('ExaminerPage', () => {
  let component: ExaminerPage;
  let fixture: ComponentFixture<ExaminerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExaminerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
