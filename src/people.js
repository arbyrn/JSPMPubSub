
import Mustache from 'mustache';
import {on,off,emit} from './pubsub';


var people = ['Will', 'Steve'];

//cache DOM
var $el = $('#peopleModule');
var $button = $el.find('button');
var $input = $el.find('input');
var $ul = $el.find('ul');
var template = $el.find('#people-template').html();

//bind events
$button.on('click', addPerson);
$ul.delegate('i.del', 'click', deletePerson);

_render();

function _render() {
    $ul.html(Mustache.render(template, {people: people}));
    emit('peopleChanged', people.length);
}

function addPerson(value) {
    var name = (typeof value === "string") ? value : $input.val();
    people.push(name);
    _render();
    $input.val('');
}

function deletePerson(event) {
    var i;
    if (typeof event === "number") {
        i = event;
    } else {
        var $remove = $(event.target).closest('li');
        i = $ul.find('li').index($remove);
    }
    people.splice(i, 1);
    _render();
}

export {addPerson, deletePerson};


//export default function people() {
//   ...
//}
// or
//var people = function(){
// ...    
//}
//export {people}