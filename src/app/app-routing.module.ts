import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './pages/welcome/welcome.module#WelcomePageModule' },
  { path: 'user-settings', loadChildren: './pages/user-settings/user-settings.module#UserSettingsPageModule' },
  { path: 'notifications', loadChildren: './pages/notifications/notifications.module#NotificationsPageModule' },
  { path: 'comments', loadChildren: './pages/comments/comments.module#CommentsPageModule' },
  { path: 'view-photo', loadChildren: './pages/view-photo/view-photo.module#ViewPhotoPageModule' },
  { path: 'view-post', loadChildren: './pages/view-post/view-post.module#ViewPostPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'friends', loadChildren: './pages/friends/friends.module#FriendsPageModule' },
  { path: 'photos', loadChildren: './pages/photos/photos.module#PhotosPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'edit-details', loadChildren: './pages/edit-details/edit-details.module#EditDetailsPageModule' },
  { path: 'activity', loadChildren: './pages/activity/activity.module#ActivityPageModule' },
  { path: 'view-message', loadChildren: './pages/view-message/view-message.module#ViewMessagePageModule' },
  { path: 'terms', loadChildren: './pages/terms/terms.module#TermsPageModule' },
  { path: 'account-settings', loadChildren: './pages/account-settings/account-settings.module#AccountSettingsPageModule' },
  { path: 'privacy-settings', loadChildren: './pages/privacy-settings/privacy-settings.module#PrivacySettingsPageModule' },
  { path: 'security-settings', loadChildren: './pages/security-settings/security-settings.module#SecuritySettingsPageModule' },
  { path: 'block-settings', loadChildren: './pages/block-settings/block-settings.module#BlockSettingsPageModule' },
  { path: 'vaults', loadChildren: './pages/vaults/vaults.module#VaultsPageModule' },
  { path: 'events', loadChildren: './pages/events/events.module#EventsPageModule' },
  { path: 'groups', loadChildren: './pages/groups/groups.module#GroupsPageModule' },
  { path: 'group-create', loadChildren: './pages/group-create/group-create.module#GroupCreatePageModule' },
  { path: 'vault-create', loadChildren: './pages/vault-create/vault-create.module#VaultCreatePageModule' },
  { path: 'view-vault', loadChildren: './pages/view-vault/view-vault.module#ViewVaultPageModule' },
  { path: 'event-create', loadChildren: './pages/event-create/event-create.module#EventCreatePageModule' },
  { path: 'messages', loadChildren: './pages/messages/messages.module#MessagesPageModule' },
  { path: 'message-create', loadChildren: './pages/message-create/message-create.module#MessageCreatePageModule' },
  { path: 'add-story', loadChildren: './pages/add-story/add-story.module#AddStoryPageModule' },
  { path: 'whats-on-mind', loadChildren: './pages/whats-on-mind/whats-on-mind.module#WhatsOnMindPageModule' },
  { path: 'album', loadChildren: './pages/album/album.module#AlbumPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
