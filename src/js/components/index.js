import angular from 'angular';

let componentsModule = angular.module('app.components', []);

// Components
import ListErrors from './list-errors.component';
componentsModule.component('listErrors', ListErrors);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import FavouriteBtn from './buttons/favourite-btn.component';
componentsModule.component('favouriteBtn', FavouriteBtn);

import ArticleMeta from './article-helpers/article-meta.component';
componentsModule.component('articleMeta', ArticleMeta);

import ArticlePreview from './article-helpers/article-preview.component';
componentsModule.component('articlePreview', ArticlePreview);

import ArticleList from './article-helpers/article-list.component';
componentsModule.component('articleList', ArticleList);

import ListPagination from './article-helpers/list-pagination.component';
componentsModule.component('listPagination', ListPagination);


// Directives
import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

export default componentsModule;
