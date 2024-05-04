import { Directive, ElementRef, EventEmitter, NgZone, Output } from '@angular/core';

declare var google: any;

@Directive({
  selector: '[autocompleteAddress]'
})
export class AutocompleteAddressDirective {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  private element: HTMLInputElement;

  constructor(private elRef: ElementRef, private ngZone: NgZone) {
    this.element = elRef.nativeElement;
  }

  // ngAfterViewInit () {
    
  //   const autocomplete = new google.maps.places.Autocomplete(this.element, {
  //     componentRestrictions: { country: 'US' },
  //     types: ['address']  // 'establishment' / 'address' / 'geocode'
  //   });
  //   google.maps.event.addListener(autocomplete, 'place_changed', () => {
  //     const place = autocomplete.getPlace();
  //     console.log("Place: ", place );
  //     this.onSelect.emit(place);
  //   });
  // }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.element, 
      {
        componentRestrictions: { country: 'US' },
        types: ['address']
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      this.ngZone.run(() => {
        const place = autocomplete.getPlace();
        this.onSelect.emit(place);
      });
    });
  }
}
