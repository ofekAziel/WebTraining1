describe('query selector', function () {

    beforeEach(function () {
        document.body.innerHTML = __html__['index.html'];
    });

    it('Should get all of the elements of the same tag', function () {

        var liAmount = $('li').count();
        expect(liAmount).toBe(10);
    });

    it('should be able find nested elements', function () {

        var eleAmount = $('div li p').count();
        expect(eleAmount).toBe(1);
    });

    it('should get all the elements with the class name specified', function () {

        var classAmount = $('.david-likes').count();
        expect(classAmount).toBe(1);
    });

    it('should get all the elements with the id specified', function () {

        var idAmount = $('#davids-div').count();
        expect(idAmount).toBe(1);
    });
});

describe('ofekQuery prototype functions', function () {

    it('add class', function () {

        var classBeforeAmount = $('.ofeks-div').count();

        var idElement = $('#davids-div');
        idElement.addClass('ofeks-div');

        var classAmount = $('.ofeks-div').count();

        expect(classAmount).toBe(classBeforeAmount + 1);
    });

    it('remove class', function () {

        var classElement = $('.ofeks-div');
        classElement.removeClass('ofeks-div');
        var classAmount = $('.ofeks-div').count();
        expect(classAmount).toBe(0);
    });

    it('css', function () {

        var idElement = $('#davids-div');
        idElement.css('color', 'red');
        expect(idElement.elements[0].style['color'].includes('red')).toBe(true);
    });

    it('count', function () {

        var idAmount = $('#davids-div').count();
        expect(idAmount).toBe(1);
    });

    it('get', function () {

        var idElement = $('#davids-div').elements[0];
        expect($('#davids-div').get(0)).toBe(idElement);
    });

    it('set attribute', function () {

        var idElement = $('#davids-div');
        idElement.setAttribute("hidden", "hidden");
        var attribute = idElement.getAttribute("hidden")[0];
        expect(attribute).toBe("hidden");
    });

    it('get attribute', function () {

        var idElement = $('#davids-div');
        var attribute = idElement.getAttribute("id")[0];
        expect(attribute).toBe("davids-div");
    });

    it('append child', function () {

        var classElement = $('.david-dislikes');
        var li = document.createElement("li");
        classElement.appendChild(li);
        expect($('.david-dislikes li')).not.toBe(undefined);
    });

    describe('Testing any function', function () {
        it('any return true', function () {

            var fn = function (element) {

                if (element.className === 'david-dislikes') {
                    return true;
                }

                return false;
            };

            var classElement = $('.david-dislikes');

            expect(classElement.any(fn)).toBe(true);
        });

        it('any return false', function () {

            var fn = function (element) {

                if (element.className === 'ofek') {
                    return true;
                }

                return false;
            };

            var classElement = $('.david-dislikes');
            expect(classElement.any(fn)).toBe(false);
        });
    });

    it('all return true', function () {

        var fn = function (element) {

            if (element.className === 'david-dislikes') {
                return true;
            }

            return false;
        };

        var classElement = $('.david-dislikes');
        expect(classElement.all(fn)).toBe(true);
    });

    it('all return false', function () {

        var fn = function (element) {

            if (element.className === 'ofek') {
                return true;
            }

            return false;
        };

        var classElement = $('.david-dislikes');
        expect(classElement.all(fn)).toBe(false);
    });

    it('filter object passed check', function () {

        var fn = function (element) {

            if (element.className === 'david-dislikes') {
                return true;
            }

            return false;
        };

        var classElement = $('.david-dislikes');
        expect(classElement.filter(fn).elements[0]).toBe(classElement.elements[0]);
    });

    it('filter object not passed check', function () {

        var fn = function (element) {

            if (element.className === 'ofek') {
                return true;
            }

            return false;
        };

        var classElement = $('.david-dislikes');
        expect(classElement.filter(fn)).not.toBe(classElement);
    });

    it('map', function () {

        var fn = function (element) {

            element.className = "newCheck";
        };

        var classElement = $('.david-dislikes');
        var check = classElement.map(fn)[0];
        expect(check.className).toBe("newCheck");
    });

    it('each', function () {

        var fn = function (element) {

            element.className = "newCheck";
        };

        var classElement = $('.david-dislikes')
        classElement.each(fn);
        expect(classElement.elements[0].className).toBe("newCheck");
    });
});