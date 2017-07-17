import { Component, Input } from '@angular/core';
import { AdComponent } from '../ad.component';

@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.scss']
})
export class CultureComponent implements AdComponent {

  @Input() data: any;


}
