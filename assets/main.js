'use strict';

// Components in Knockout are heavily inspired by web components,
// but are designed to work with Knockout and all of the browsers
// that it supports (all the way back to IE6).

// http://knockoutjs.com/documentation/component-overview.html
// http://knockoutjs.com/documentation/component-binding.html
// http://knockoutjs.com/documentation/component-custom-elements.html
// http://knockoutjs.com/documentation/component-registration.html
// http://knockoutjs.com/documentation/component-custom-elements.html#passing-markup-into-components

const componentsPath = './05-Objects';

import ko from 'knockout';
//import likeVM from (componentsPath + '/LikeWidget/likeWidgetVM'); // this won't work.
import likeVM from './05-Objects/LikeWidget/likeWidgetVM';


ko.components.register('like-widget', {
    viewModel: likeVM,
    //template: require(componentsPath + '/LikeWidget/likeWidget.html') // this doesn't work.
    template: require('./05-Objects/LikeWidget/likeWidget.html')
});

function Product(name, rating) {
  this.name = name;
  this.userRating = ko.observable(rating || null);
}

function MyViewModel() {
  this.products = [
    new Product("Garlic bread"),
    new Product("Chocalot"),
    new Product("Seagull food", 'like')
  ];
}

ko.applyBindings(new MyViewModel());

//if the resulting object supplies a dispose function, then KO will call it whenever tearing down the component.

// A component could choose to only specify a template,
// in cases where a view model is not necessary. The supplied params will be used as the data context in that case.

// can be a function. If so, then it is used as a constructor (called with new).
// can pass an instance property to use an object directly.
// can pass a createViewModel property to call a function that can act as a factory
// and return an object to use as the view model (has access to the DOM element as well for special cases).
// can pass a require key to call the require function with the supplied value.
// This will work with whatever provides a global require function (like require.js).
// The result will again go through this resolution process.


// <div data-bind="component: 'my-component'"></div>
// <div data-bind="component: { name: 'my-component', params: { name: 'ryan' } }"></div>
// <!-- ko component: 'my-component' --><!-- /ko -->

// //CUSTOM ELEMENTS (MUST LOAD JS FILE AT THE TOP OF THE PAGE - IF HTML SEE THIS BEFORE KO PAGE WILL BLOW UP)
// <my-component params="name: userName, type: userType"></my-component>
