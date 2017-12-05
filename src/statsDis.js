import Mustache from 'mustache';
import * as pubsub from './pubsub';

var people = 0;

//cache DOM
var $stats = $('#statsModule');
var template = $('#stats-template').html();

//bind events
pubsub.on('peopleChanged', setPeople);
_render();

function _render() {
    $stats.html(Mustache.render(template, {people: people}));
};

function setPeople(newPeople) {
    people = newPeople;
    _render();
};

function destroy() {
    $stats.remove();
    pubsub.off('peopleChanged', setPeople)
}

export {destroy};