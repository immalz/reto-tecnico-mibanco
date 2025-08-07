import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableComponent } from '../components/table/table.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, MatDialogModule, RouterModule, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {


  edit(event: any): void{
    // Logic to handle edit action
    console.log('Edit action triggered', event);
  }

}
