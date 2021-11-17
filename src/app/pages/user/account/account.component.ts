import {Component, OnInit} from '@angular/core';
// import {UserDataService} from '../../../services/user-data.service';
import {User} from '../../../interfaces/user';
import {UserService} from '../../../services/user.service';
// import {ReloadService} from '../../../services/reload.service';
import {MatDialog} from '@angular/material/dialog';
// import {FileUploadService} from '../../../services/file-upload.service';
// import {ImageCropComponent} from './image-crop/image-crop.component';
import {UiService} from '../../../services/ui.service';
import {FileData} from '../../../interfaces/file-data';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user !: User;

  // Image Upload
  imageChangedEvent: any = null;
  staticImage = '/assets/svg/user.svg';
  imgPlaceHolder = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/1200px-User_font_awesome.svg.png';

  pickedImage?: any;
  file: any = null;
  newFileName !: string;

  imgBlob: any = null;

  // BREAKPOINTS
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 599px)'])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    // protected userDataService: UserDataService,
    private userService: UserService,
    // private reloadService: ReloadService,
    private dialog: MatDialog,
    // private fileUploadService: FileUploadService,
    private uiService: UiService,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
  }


  onLogout() {
    this.userService.userLogOut();
  }
  
  onLinkChange() {
    this.isHandset$.subscribe((isHandset) => {
      if (isHandset) {
        const element = document.getElementById('main-sidebar-container-area');
        if(element != null){
          setTimeout(() => {
            window.scrollTo({
              left: 0,
              top: element.scrollHeight,
              behavior: 'smooth'
            });
          }, 150);
        }
      }
    });
  }

}
