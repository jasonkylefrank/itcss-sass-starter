'use strict';
import ko from 'knockout';

//const likeWidgetViewModel = (params) => {
const likeWidgetViewModel = function(params) {
    this.name = params.name;
    this.chosenValue = ko.observable(params.value);
    // Behaviors
    this.like = () => { this.chosenValue('like'); }
    this.dislike = () => { this.chosenValue('dislike'); }
}
export default likeWidgetViewModel;
