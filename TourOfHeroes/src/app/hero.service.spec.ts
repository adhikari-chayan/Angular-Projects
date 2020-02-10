import { TestBed,inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe('HeroService',()=>{
    let mockMessageService;
    let httpTestingController:HttpTestingController;
    let service:HeroService;

    beforeEach(()=>{
        mockMessageService=jasmine.createSpyObj(['add']);

        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[
               HeroService,
               {provide:MessageService,useValue:mockMessageService}
           ] 
        });

        /*This is a special method on the TestBed that basically accesses the dependency injection registry. So if I give it a type, in this case, HttpTestingController, it's going to look inside of the dependency injection registry for this TestBed's module, and find the service that correlates to that type and give us a handle to it. */
        
        httpTestingController= TestBed.get(HttpTestingController);
        service=TestBed.get(HeroService);
    });

    describe('getHero',()=>{

        //One way of injecting an instance of Heroervice and HttpTestingController is o use angular's inject method as shown below. Alternative is to use the TestBed.get method.

        // it('should call get with the correct URL', 
        //     inject([
        //         HeroService,
        //         HttpTestingController
        //     ],
        //     (
        //         service:HeroService,
        //         controller:HttpTestingController
        //     )=>{
        
        //     service.getHero(4).subscribe();
        
        //    const req=httpTestingController.expectOne('api/heroes/4');
        //    req.flush({id:4,name:'superDude',strength:100});

        //    httpTestingController.verify();
        
        // }));

        it('should call get with the correct URL',()=>{

            service.getHero(4).subscribe(()=>{
                console.log('fulfilled');
            });
            
            const req=httpTestingController.expectOne('api/heroes/4');
            req.flush({id:4,name:'superDude',strength:100});

            httpTestingController.verify();
        });
    });
})