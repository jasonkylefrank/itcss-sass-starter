'use strict';
import ko from 'knockout';

const likeWidgetViewModel = (params) => {        
    this.chosenValue = ko.observable(params.value);     
    // Behaviors
    this.like = () => { this.chosenValue('like'); }
    this.dislike = () => { this.chosenValue('dislike'); }
}
export default likeWidgetViewModel; 