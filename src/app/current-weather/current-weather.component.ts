import { Component , OnInit } from '@angular/core';
import { ICurrentWeather } from '../interfaces';
import { WeatherService } from '../weather/weather.service';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@ngbracket/ngx-layout';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, FlexModule],
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  current!: ICurrentWeather
  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    this.weatherService.getCurrentWeather('Bethesda', 'US')
      .subscribe((data) => this.current = data);
  }
}
