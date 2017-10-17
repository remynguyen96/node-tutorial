import { Directive } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Directive({
    selector: "input[type=file]",
    host : {
        "(change)" : "onChange($event.target.files)",
        "(blur)": "onTouched()"
    },
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: FileValueAccessor, multi: true }
    ]
})
export class FileValueAccessor {
    value: any;
    onChange : (_: any) => {}
    onTouched : () => {}

    writeValue(value: any) : void {}

    registerOnChange(fn: any) : void {
      this.onChange = fn;
    }
    registerOnTouched(fn: any) : void {
       this.onTouched = fn ;
    }
}



