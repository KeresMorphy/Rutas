import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellersPage } from './sellers.page';

describe('SellersPage', () => {
  let component: SellersPage;
  let fixture: ComponentFixture<SellersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SellersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
