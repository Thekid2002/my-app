import { Component, OnInit } from '@angular/core';
import { FurnitureService } from '../furniture.service';
import { Furniture } from '../Furniture';
import { Sort } from '@angular/material/sort';
@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.css']
})
export class FurnitureComponent implements OnInit {
  furnitures: Furniture[] = [];

  constructor(private furnitureService: FurnitureService) { }
  searchText = '';
  getFurniture(): void{
    this.furnitureService.getFurnitures().subscribe(furnitures => this.furnitures = furnitures);
  }

  ngOnInit(): void {
    this.getFurniture();
  }
  sortData(sort: Sort) {
    const data = this.furnitures.slice();
    if (!sort.active || sort.direction === '') {
      this.furnitures = data;
      return;
    }

    this.furnitures = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        case 'id':
          return compare(a.id, b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
