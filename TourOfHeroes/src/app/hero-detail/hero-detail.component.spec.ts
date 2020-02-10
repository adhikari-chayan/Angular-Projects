import { TestBed, ComponentFixture, fakeAsync,tick, flush } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from '@angular/common';
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";


describe('HeroDetailComponent',()=>{
    let fixture:ComponentFixture<HeroDetailComponent>;
    let mockActivatedRoute, mockHeroService, mockLocation;

    beforeEach(()=>{
        mockHeroService=jasmine.createSpyObj(['getHero','updateHero']);
        mockLocation=jasmine.createSpyObj(['back']);

        mockActivatedRoute={
            snapshot:{ paramMap:{get:()=>{return '3';}}}
        }
        
        TestBed.configureTestingModule({
            imports:[FormsModule],
            declarations:[HeroDetailComponent],
            providers:[
                {provide:ActivatedRoute,useValue:mockActivatedRoute},
                {provide:HeroService,useValue:mockHeroService},
                {provide:Location,useValue:mockLocation}
            ]

        });
        fixture=TestBed.createComponent(HeroDetailComponent);

    });

    it('should render hero name in a h2 tag', ()=>{
        mockHeroService.getHero.and.returnValue(of({id:3,name:'SuperDude',strength:100}));
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
    });

    //We will use Angular's fakeAsync instead of this 
    
    // it('should call updateHero when save is called',(done)=>{
    //     mockHeroService.getHero.and.returnValue(of({id:3,name:'SuperDude',strength:100}));
    //     mockHeroService.updateHero.and.returnValue(of({}));
    //     fixture.detectChanges();

    //     fixture.componentInstance.save();

    //     setTimeout(()=>{
    //         expect(mockHeroService.updateHero).toHaveBeenCalled();
    //         done();
    //     },300);
    // });

     it('should call updateHero when save is called',fakeAsync(()=>{
            mockHeroService.getHero.and.returnValue(of({id:3,name:'SuperDude',strength:100}));
            mockHeroService.updateHero.and.returnValue(of({}));
            fixture.detectChanges();

            fixture.componentInstance.save();
            
            //tick forward 250 ms and call any code that should be called inside of that timeframe
            /*The reason we can do this is because Angular itself runs inside of zone. js, and the fakeAsync function makes this code run in a special kind of zone, that zone. js will create, that allows us to essentially control the clock inside of that zone. So we can tell it to tick forward 250 ms. */
            
            //tick(250);
            
            /*There's another utility for same, and that's called flush. Flush, again, comes from the same place, we have to import it. And the flush call basically says, look at the zone and see if there are any tasks that are waiting. If there are waiting tasks go ahead and fast forward the clock until those waiting tasks have been executed. So by changing from tick 250 to flush, and saving that test, go back to Karma, and the test is still passing.  */
            flush();
            expect(mockHeroService.updateHero).toHaveBeenCalled();
            
     
       }));
});