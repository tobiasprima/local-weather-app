import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { injectSpy } from 'angular-unit-test-helper'
import { of } from 'rxjs'

import { WeatherService } from '../weather/weather.service'
import { fakeWeather } from '../weather/weather.service.fake'
import { CurrentWeatherComponent } from './current-weather.component'

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent
  let fixture: ComponentFixture<CurrentWeatherComponent>
  let weatherServiceMock: jasmine.SpyObj<WeatherService>

  beforeEach(waitForAsync(() => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getCurrentWeather',
    ])

    TestBed.configureTestingModule({
      imports: [CurrentWeatherComponent],
      providers: [{ provide: WeatherService, useValue: weatherServiceSpy }],
    }).compileComponents()
    weatherServiceMock = injectSpy(WeatherService)
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    weatherServiceMock.getCurrentWeather.and.returnValue(of())
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it('should get currentWeather from weatherService', () => {
    weatherServiceMock.getCurrentWeather.and.returnValue(of())
    fixture.detectChanges()
    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1)
  })

  it('should eagerly load currentWeather in Bethesda from weatherService', () => {
    weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather))
    fixture.detectChanges() 
    expect(component.current).toBeDefined()
    expect(component.current.city).toEqual('Bethesda')
    expect(component.current.temperature).toEqual(280.32)
    const debugEl = fixture.debugElement
    const titleEl: HTMLElement = debugEl.query(By.css('span')).nativeElement
    expect(titleEl.textContent).toContain('Bethesda')
  })
})