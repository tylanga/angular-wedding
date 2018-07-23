import { Component, Input, OnInit, ElementRef, HostListener } from '@angular/core';
import Debounce from 'debounce-decorator';
import { scrollTo } from '../../common/utils/scrollTo';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('collapse', [
      state('open', style({
        opacity: '1',
        display: 'block',
        transform: 'translate3d(0, 0, 0)'
      })),
      state('closed',   style({
        opacity: '0',
        display: 'none',
        transform: 'translate3d(0, -100%, 0)'
      })),
      transition('closed => open', animate('200ms ease-in')),
      transition('open => closed', animate('100ms ease-out'))
    ])
  ]
})
export class HeaderComponent {

  @Input() names;
  @Input() links;

  public visibilityStatus = true;
  public showLinks: true;
  public headerClass: string = '';
  private sections: any;
  private rect: any;
  private active: string;
  private element: HTMLElement;
  private menuBar = <HTMLElement>document.getElementsByClassName("col-md-8")[0];

  collapse:string = "closed";
  toggleCollapse() {
  // this.show = !this.show
    this.collapse = this.collapse == "open" ? 'closed' : 'open';
  }

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnInit(){

    this.checkPosition();

    console.log(this.links);

    this.rect = this.element.getBoundingClientRect();
    
        const sections = document.getElementsByClassName('content-section');
        this.sections = Array.from(sections).map(s => { return { 
          id: s.id,
          rect: s.getBoundingClientRect()
        };
      });

      console.log(sections);
    
        window.addEventListener('scroll', this.scroll.bind(this));
      }
      
      @Debounce(5)
      scroll(ev){
        // alert(this.visibilityStatus);
        // alert("scrolling");
        var ulElement = <HTMLElement>document.getElementsByTagName('ul')[0];
        ulElement.classList.remove('notscrolled');
        ulElement.classList.add('scrolled');

        const yOffset = window.window.pageYOffset;
        this.headerClass = yOffset > this.rect.height ? 'scrolled' : '';
        this.headerClass = yOffset > this.rect.height ? 'scrolled' : '';
    
        if(yOffset === 0) { 
          this.active = '';
          var ulElement = <HTMLElement>document.getElementsByTagName('ul')[0];
          ulElement.classList.remove('scrolled');
          ulElement.classList.add('notscrolled');
          return;
        }
        
        for(let section of this.sections){
          if(yOffset >= section.rect.top && 
             yOffset <= (section.rect.top + section.rect.height)){
            this.active = section.id;
            // alert(this.active);
          }
        }
      }
    
      isActive(i){
        if(this.active === ('section-' + i)) return 'active';
        return '';
      }

      showMobile() {
        var menuBar = <HTMLElement>document.getElementsByClassName("col-md-8")[0];
        var visibilityStatus = menuBar.style.visibility;
        // window.scrollTo(500, 0);
        // var view = document.getElementById('section-2');
        // console.log(view);
        // view.scrollIntoView();
        // document.getElementsByClassName("col-md-8")[0].style.visibility = "visible";
        // console.log(document.getElementsByClassName("col-md-8")[0].style);
        if (menuBar.style.visibility === 'visible') {
          // console.log(this.active);
          // var view = document.getElementById("section-2");
          // console.log(view);
          // view.scrollIntoView();
          menuBar.style.visibility = 'hidden';
          
      } else {
        menuBar.style.visibility = 'visible';
      }
    }
      
      scrollTo(ev, i){
        ev.preventDefault();
        let dest = document.getElementById(`section-${i}`);
        console.log(i);
        console.log(dest);
        dest.scrollIntoView({behavior: "smooth"});
      }

      checkPosition() {
        if (window.matchMedia('(max-width: 1190px)').matches || window.matchMedia('(max-width: 1023px)').matches) {
            console.log("mobile ready");
            this.visibilityStatus = false;
        } else {
            console.log("not a mobile device");
            this.visibilityStatus = true;
        }
      }
      
      @HostListener('window:resize', ['$event'])
      onResize(event) {
        this.checkPosition();
      }
  }
