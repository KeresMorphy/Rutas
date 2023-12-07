
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerModalService {
  private sellerDetailSubject = new BehaviorSubject<any>(null);
  sellerDetail$ = this.sellerDetailSubject.asObservable();

  setSellerDetail(seller: any) {
    this.sellerDetailSubject.next(seller);
  }
}
