import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { NO_ERRORS_SCHEMA, Component, Input } from "@angular/core";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe('HeroesComponent (shallow tests)',()=>{
    let fixture:ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;


    @Component({
        selector: 'app-hero',
        template: '<div></div>',
        
    })
    class FakeHeroComponent {
        @Input() hero: Hero;
        //@Output() delete = new EventEmitter();
    
        
    }
  


    beforeEach(()=>{
        mockHeroService=jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);

        HEROES=[
            {id:1,name:'SpiderDude',strength:8},
            {id:2,name:'Wonderful Woman',strength:24},
            {id:3,name:'SuperDude',strength:55}
        ]

        TestBed.configureTestingModule({
            declarations:[
                HeroesComponent,
                FakeHeroComponent
            ],
            
            /*
            This is the longhand way to do with a provider.  

            We want to use a mockHeroService. So we can use the longhand method, which is providing an object. And that object has a provide property, where we set that to HeroService, which says hey, when somebody asks for HeroService, I'll tell you what to do. And in our case we want to use a mock, so we add in a second property, useValue, and we can tell Angular use this object when somebody asks for a HeroService inside this testing module. 
            */
            providers:[
                {provide:HeroService,useValue:mockHeroService}
            ],
            
            //schemas:[NO_ERRORS_SCHEMA]
        })
        fixture=TestBed.createComponent(HeroesComponent);
    });

    it('should set heroes correctly from the service',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.componentInstance.heroes.length).toBe(3);

    });

    it('should create one li for each hero',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);

    })


})