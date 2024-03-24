import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

declare var google: any;

@Directive({
  selector: '[autocompleteAddress]'
})
export class AutocompleteAddressDirective {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef) { }

  ngAfterViewInit () {
    
    const autocomplete = new google.maps.places.Autocomplete(this.el.nativeElement, {
      componentRestrictions: { country: 'US' },
      types: ['address']  // 'establishment' / 'address' / 'geocode'
    });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.onSelect.emit(place);
    });
  }
}
