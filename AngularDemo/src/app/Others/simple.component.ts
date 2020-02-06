import { Component, OnChanges, Input, SimpleChanges } from "@angular/core";
import { JsonPipe } from "@angular/common";
import { clearScreenDown } from "readline";

@Component({
    selector:'simple',
    template:`You entered:{{simpleInput}}`
})
export class SimpleComponent implements OnChanges{
    @Input()
    simpleInput:string;

    ngOnChanges(changes:SimpleChanges){
        for(let propertyName in changes){
            let change=changes[propertyName];
            let current=JSON.stringify(change.currentValue);
            let previous=JSON.stringify(change.previousValue);
            console.log(propertyName+': currentValue ='+current+', previousValue='+previous);
        }
    }
}