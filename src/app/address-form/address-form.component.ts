// address-form.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  private _address: any;

  @Input() set address(value: any) {
    this._address = { ...this.defaultAddress, ...value };
  }
  
  get address(): any {
    return this._address;
  }
  
  private defaultAddress = {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    formattedAddress: '',
    location: { coordinates: [0, 0] }
  };

  ngOnInit(): void {
    
  }
  @Output() addressChange = new EventEmitter<any>();

  onPlaceSelect(place: any): void {
    if (!place.address_components) return;

    this.address.formattedAddress = place.formatted_address;
    this.address.street = this.getAddressComponentValue(place.address_components, 'street_number') + ' ' +
                          this.getAddressComponentValue(place.address_components, 'route');
    this.address.city = this.getAddressComponentValue(place.address_components, 'locality');
    this.address.postalCode = +this.getAddressComponentValue(place.address_components, 'postal_code');
    this.address.state = this.getAddressComponentValue(place.address_components, 'administrative_area_level_1');
    this.address.country = this.getAddressComponentValue(place.address_components, 'country');
    this.address.location.coordinates = [
      place.geometry.location.lng(), // Longitude
      place.geometry.location.lat()  // Latitude
    ];

    console.log("Callled");
    
    console.log(this.address);
    
    this.addressChange.emit(this.address);
  }

  private getAddressComponentValue(components: any[], type: string): string {
    const component = components.find(comp => comp.types.includes(type));
    return component ? component.long_name : '';
  }
}
