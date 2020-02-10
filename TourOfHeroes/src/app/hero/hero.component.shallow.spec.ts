import { TestBed, ComponentFixture } from "@angular/core/testing"
import { HeroComponent } from "./hero.component"
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('HeroComponent (shallow tests)',()=>{
    let fixture:ComponentFixture<HeroComponent>;
    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
            schemas:[NO_ERRORS_SCHEMA]
        });
        fixture=TestBed.createComponent(HeroComponent);
    })

    it('should have the correct hero',()=>{
        fixture.componentInstance.hero={id:1,name:'SuperDude',strength:3};

        expect(fixture.componentInstance.hero.name).toEqual('SuperDude');
    })

    it('should render the hero name in an anchor tag',()=>{
        fixture.componentInstance.hero={id:1,name:'SuperDude',strength:3};
        fixture.detectChanges();    

        //A debugElement is a wrapper around the actual DOM node. Similar to the way that the fixture is a wrapper around a component, a debugElement is a wrapper around a DOM node. 
        let deA=fixture.debugElement.query(By.css('a'));

        //debugElement vs nativeElement--> debugElement has additional methods that help in testing. It can also link back to the component instance that created it as well
        expect(deA.nativeElement.textContent).toContain('SuperDude');
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');
    })
})