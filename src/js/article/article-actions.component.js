class ArticleActionsCtrl {
  constructor(User, Articles, $state) {
    'ngInject';

    this._$state = $state;
    this._Articles = Articles;
    this.canModify = false;

    // The user can only edit/delete this comment if they are the author
    this.$onInit = () => {
      if (User.current) {
        this.canModify = (User.current.username === this.article.author.username);
      }
    }
  }

  deleteArticle () {
    this.isDeleting = true;
    this._Articles
      .destroy(this.article.slug)
      .then(
        success => this._$state.go('app.home'),
        err => this._$state.go('app.home')
      );
  }
}

let ArticleActions = {
  bindings: {
    article: '='
  },
  controller: ArticleActionsCtrl,
  templateUrl: 'article/article-actions.html'
}

export default ArticleActions;
