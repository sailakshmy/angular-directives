import { Directive, ElementRef, inject, input } from "@angular/core";

@Directive({
  selector: "a[appSafeLink]",
  standalone: true,
  host: {
    "(click)": "onConfirmLeavePage($event)",
  },
})
export class SafeLinkDirective {
  queryParam = input("myapp", { alias: "appSafeLink" });
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log("Safe Link Directive is active!");
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm("Do you want to leave this app?");
    if (wantsToLeave) {
      const address = this.hostElementRef.nativeElement.href;
      //   (
      //   //(event.target as HTMLAnchorElement).href;
      //   event.target as HTMLAnchorElement
      // ).href
      this.hostElementRef.nativeElement.href = `${address}?from=${this.queryParam()}`;
      return;
    }
    event?.preventDefault();
  }
}
