import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PostPage } from './post.page';
import { ComponentsModule } from '../../components/components.module';
import { WhatsOnMindComponent } from '../../components/whats-on-mind/whats-on-mind.component';
import { CommentsPage } from '../comments/comments.page';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: PostPage }])
  ], 
  entryComponents: [
    CommentsPage
  ],
  exports: [
    WhatsOnMindComponent
 ],
  declarations: [PostPage,WhatsOnMindComponent,CommentsPage],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PostPageModule {}
