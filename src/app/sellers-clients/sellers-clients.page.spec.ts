import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SellersClientsPage } from './sellers-clients.page';

describe('SellersClientsPage', () => {
  let component: SellersClientsPage;
  let fixture: ComponentFixture<SellersClientsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SellersClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
