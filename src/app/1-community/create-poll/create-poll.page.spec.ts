import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePollPage } from './create-poll.page';

describe('CreatePollPage', () => {
  let component: CreatePollPage;
  let fixture: ComponentFixture<CreatePollPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
