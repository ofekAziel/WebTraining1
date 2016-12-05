const selectorFilters = {
    id: filterById,
    class: filterByClass,
    tag: filterByTag
};

function findSelectorType(selector){
    if(selector.startsWith("#")){
        return 'id';
    } else if(selector.startsWith(".")){
        return 'class';
    } else {
        return 'tag';
    }
}

function filterByTag(elements, selector){
    return elements.filter(function(elem){
        return elem.tagName === selector.toUpperCase();
    });
}

function filterById(elements, selector){
    return elements.filter(function(elem){
        return elem.id === selector.substring(1);
    });
}

function filterByClass(elements, selector){
    return elements.filter(function(elem){
        return elem.classList.contains(selector.substring(1));
    });
}

function expandTree(elements){
    let expandTree = [];
    elements.forEach(function(element){
        if(element.children.length){
            Array.from(element.getElementsByTagName('*')).forEach(function(childElement){
                expandTree.push(childElement);
            });
        } else {
            expandTree.push(element);
        }
    });
    return expandTree;
}

function $(selector){
    var elements = Array.from(document.all);
    var selectors = selector.split(" ");

    selectors.forEach(function(selector){
        elements = selectorFilters[findSelectorType(selector)](elements, selector);
        if(selectors.indexOf(selector) != selectors.length - 1){
            elements = Array.from(new Set(expandTree(elements)));
        }
    });

    return new OfekQuery(elements);
}

function OfekQuery(elements){
    this.elements = elements;

    OfekQuery.prototype.addClass = function (class_name){
        elements.forEach(function(element){
            element.classList.add(class_name);
        })
    };

    OfekQuery.prototype.removeClass = function (class_name){
        elements.forEach(function(element){
            element.classList.remove(class_name);
        })
    };

    OfekQuery.prototype.css = function (property, value){
        elements.forEach(function(element){
            element.style[property] = value;
        })
    };

    OfekQuery.prototype.count = function(){
        return elements.length;
    };

    OfekQuery.prototype.get = function(index){
        return elements[index];
    };

    OfekQuery.prototype.setAttribute = function(attributeName, attributeValue){
        elements.forEach(function(element){
            element.setAttribute(attributeName,attributeValue);
        })
    };

    OfekQuery.prototype.getAttribute = function(attributeName){
        var attributes = [];
        elements.forEach(function(element){
            if(element.getAttribute(attributeName)){
                attributes.push(element.getAttribute(attributeName));
            }
        });
        return attributes;
    };

    OfekQuery.prototype.appendChild = function(childElement){
        var docFrag = document.createDocumentFragment();
        docFrag.appendChild(childElement);
        elements.forEach(function(element){
            element.appendChild(docFrag.cloneNode(true));
        });
    };

    OfekQuery.prototype.each = function (fn) {
        elements.forEach(function(element){
            fn(element);
        });
    };

    OfekQuery.prototype.map = function(fn){
        var cloneElements = [];
        elements.forEach(function (element){
            var clonedElement = element.cloneNode(true);
            fn(clonedElement);
            cloneElements.push(clonedElement);

        });

        return cloneElements;
    };

    OfekQuery.prototype.filter = function(){
        let checkFunctions = Array.from(arguments);
        let suitableElements = [];
        elements.forEach(function(element){
            let suitable = true;
            checkFunctions.forEach(function(argument){
                suitable = suitable && argument(element);
            });
            if(suitable){
                suitableElements.push(element);
            }
        });
        return new OfekQuery(suitableElements);
    };

    OfekQuery.prototype.all = function(){
        let checkFunctions = Array.from(arguments);
        for (element of elements){
            for(arguments of checkFunctions){
                if(!arguments(element)){
                    return false;
                }
            }
        }

        return true;
    };

    OfekQuery.prototype.any = function(){
        let checkFunctions = Array.from(arguments);
        for(element of elements){
            for(argument of checkFunctions){
                if(argument(element) &&
                    checkFunctions.indexOf(argument) + 1 == checkFunctions.length){
                    return true;
                }
                else if(!argument(element)) {
                    break;
                }
            }
        }
        return false;
    }
}