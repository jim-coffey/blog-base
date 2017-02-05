class CommentCtrl {
  constructor (User) {
    'ngInject';

    this.canModify = false;

    // The user can only delete this comment if they are the author
    this.$onInit = () => {
      if (User.current) {
        this.canModify = (User.current.username === this.comment.author.username);
      }
    }
  }
}

let Comment = {
  bindings: {
    comment: '=',
    deleteCb: '&'
  },
  controller: CommentCtrl,
  templateUrl: 'article/comment.html'
};

export default Comment;
