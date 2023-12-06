import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUsersPage } from './create-users.page';

describe('CreateUsersPage', () => {
  let component: CreateUsersPage;
  let fixture: ComponentFixture<CreateUsersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
