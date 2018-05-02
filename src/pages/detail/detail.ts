import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  user = {};
  id:any;
  loading:any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public loadingCtrl: LoadingController,
    private sanitizer: DomSanitizer) {
    this.id = navParams.get("id");
  }

  ionViewDidLoad() {
    this.getUser(this.id);
  }

  getUser(id) {
    this.showLoader("Loading...");
    this.api.getUser(id)
      .subscribe(data => {
        this.user = {
          email: data.email,
          fullname: data.fullname,
          avatar: this.sanitizer.bypassSecurityTrustResourceUrl(data.avatar)
        };
        this.loading.dismiss();
      }, err => {
        console.log(err);
        this.loading.dismiss();
      });
  }

  showLoader(msg){
    this.loading = this.loadingCtrl.create({
        content: msg
    });

    this.loading.present();
  }

}
