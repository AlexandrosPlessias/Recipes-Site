import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}

// export class DropdownDirective {
//   @HostBinding('class.open') openDropdown = false;
//
//   @HostListener('click') toggleOpen(eventData: Event) {
//     this.openDropdown = !this.openDropdown;
//   }
//
// }
